const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

const SudokuSolver = require('../controllers/sudoku-solver.js');
let solver = new SudokuSolver;

suite('Unit Tests', () => {

    //Logic handles a valid puzzle string of 81 characters
    test('Return a valid response from valid string', function(done){
        let string1='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        let string2='769235418851496372432178956174569283395842761628713549283657194516924837947381625';
        assert.equal(solver.solve(string1),string2);
        done();
    })
    //Logic handles a puzzle string with invalid characters (not 1-9 or .)
    test('Handle puzzle string with invalid characters', function(done){
        let string1='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        assert.equal(solver.validate(string1), true);
        assert.equal(solver.validate('aAaaaa'), false);
        done();
    })
    //Logic handles a puzzle string that is not 81 characters in length
    test('Handle puzzle string with invalid characters', function(done){
        let string1='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        assert.equal(solver.validatePuzzleLen(string1), true);
        assert.equal(solver.validatePuzzleLen('aAaaaa'), false);
        done();
    })
    //Logic handles a valid row placement
    test('Handle valid row placement', function(done){
        let string1='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        assert.equal(solver.checkRowPlacement(string1, 0, 2, 9), true);
        assert.equal(solver.checkRowPlacement(string1, 0, 0, 6), true);
        done();
    })
    //Logic handles an invalid row placement
    test('Handle invalid row placement', function(done){
        let string1='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        assert.equal(solver.checkRowPlacement(string1, 0, 1, 9), false);
        done();
    })
    //Logic handles a valid column placement
    test('Handle valid column placement', function(done){
        let string1='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        assert.equal(solver.checkColPlacement(string1, 0, 2, 9), true);
        assert.equal(solver.checkColPlacement(string1, 0, 0, 7), true);
        done();
    })
    //Logic handles an invalid column placement
    test('Handle invalid column placement', function(done){
        let string1='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        assert.equal(solver.checkColPlacement(string1, 0, 0, 6), false);
        done();
    })
    //Logic handles a valid region (3x3 grid) placement
    test('Handle valid region placement', function(done){
        let string1='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        assert.equal(solver.checkRegionPlacement(string1, 0, 2, 9), true);
        done();
    })
    //Logic handles an invalid region (3x3 grid) placement
    test('Handle invalid region placement', function(done){
        let string1='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        assert.equal(solver.checkRegionPlacement(string1, 0, 1, 9), false);
        done();
    })
    //Valid puzzle strings pass the solver
    test('Valid puzzle strings pass', function(done){
        let string1='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        let string2='769235418851496372432178956174569283395842761628713549283657194516924837947381625';
        assert.equal(solver.solve(string1),string2);
        done();
    })
    //Invalid puzzle strings fail the solver
    test('Invalid puzzle strings fail', function(done){
        let string1='999..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        assert.equal(solver.solve(string1),false);
        done();
    })
    //Solver returns the expected solution for an incomplete puzzle
    test('Valid puzzle string returns expected solution', function(done){
        let string1='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
        let string2='769235418851496372432178956174569283395842761628713549283657194516924837947381625';
        assert.equal(solver.solve(string1),string2);
        done();
    })
});
