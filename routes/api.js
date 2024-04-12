'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let {puzzle, coordinate, value} = req.body;
      if (!puzzle || !coordinate || !value) {
        return res.json({ error: 'Required field(s) missing' })
      } else if(!solver.validate(puzzle)) {
        return res.json({ error: 'Invalid characters in puzzle' });
      } else if(!(/^[1-9]$/.test(value))) {
        return res.json({ error: 'Invalid value' });
      } else if(!solver.validatePuzzleLen(puzzle)) {
        return res.json({ error: 'Expected puzzle to be 81 characters long' });
      } else {
        let coords = solver.getCoordinatePosition(coordinate);
        if(coords != false) {
          let validRow = solver.checkRowPlacement(puzzle,coords.coords[1] ,coords.coords[0] -1,value);
          let validCol = solver.checkColPlacement(puzzle,coords.coords[1] ,coords.coords[0] - 1,value);
          let validRegion = solver.checkRegionPlacement(puzzle,coords.coords[1],coords.coords[0] - 1,value);
          if (validRow && validCol && validRegion) {
            return res.json({ valid: true });
          } else {
            let returnObj = {
              valid: false,
              conflict: []
            }
            if (!validRow) returnObj.conflict.push("row");
            if (!validCol) returnObj.conflict.push("column");
            if (!validRegion) returnObj.conflict.push("region");
            return res.json(returnObj)
          }
        } else {
          return res.json({ error: 'Invalid coordinate'});
        }
      }
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      if (!req.body.puzzle) {
        return res.json({ error: 'Required field missing' });
      } else if(!solver.validate(req.body.puzzle)) {
        return res.json({ error: 'Invalid characters in puzzle' });
      } else if(!solver.validatePuzzleLen(req.body.puzzle)) {
        return res.json({ error: 'Expected puzzle to be 81 characters long' })
      } else {
        let solution = solver.solve(req.body.puzzle);
        if(solution) {
          return res.json({solution: solution});
        } else {
          return res.json({ error: 'Puzzle cannot be solved' });
        }
      }
    });
};
