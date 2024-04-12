class SudokuSolver {

    validate(puzzleString) {
      let regex = /^[1-9.]+$/g;
      return regex.test(puzzleString);
    }
  
    validatePuzzleLen(puzzleString) {
      return puzzleString.length === 81 
    }
  
    checkRowPlacement(puzzleString, row, column, value) {
      let board = this.generateBoard(puzzleString);
      if(board[row][column] == value) {
        board[row][column] = '.';
      }
      for(let i=0; i < 9; i++) {
        if(board[row][i] == value) {
          return false
        }
      }
      return true
    }
  
    checkColPlacement(puzzleString, row, column, value) {
      let board = this.generateBoard(puzzleString);
      if(board[row][column] == value) {
        board[row][column] = '.';
      }
      for(let i=0; i < 9; i++){
        if(board[i][column] == value) {
          return false
        }
      }
      return true
    }
  
    checkRegionPlacement(puzzleString, row, column, value) {
      let board = this.generateBoard(puzzleString);
      if(board[row][column] == value) {
        board[row][column] = '.';
      }
  
      let boxTopRow = parseInt(row / 3) * 3; //Returns index of top row of box (0, 3, or 6)
      let boxLeftColumn = parseInt(column / 3) * 3; //Returns index of left column of box (0, 3, or 6)
  
      let x; //Look through Rows
      let y; //Look through Columns
      for(x = boxTopRow; x < boxTopRow + 3; x++){
        for(y = boxLeftColumn; y < boxLeftColumn + 3; y++ ){
          if (board[x][y] == value) {
            return false
          }
        }
      }
      return true
    }
  
    solve(puzzleString) {
      let originalBoard = this.generateBoard(puzzleString.split(''));
      let solution = this.solveFromCell(originalBoard, 0, 0);
      if (solution != false) {
        let flatSolution = solution.flat().join('');
        return flatSolution;
      } else {
        return false
      }
    }
  
    generateBoard(values) {
      let board = [ [], [], [], [], [], [], [], [], [] ];
      let boardRow = -1;
      for( let i = 0; i < values.length; i++ ){
        if(i % 9 === 0) {
          boardRow += 1;
        }
        board[boardRow].push(values[i]);
      }
      return board
    }
  
    canPlace(board, row, col, value) {
      /* Check Column Placement */
      for(let i=0; i < 9; i++){
        if(board[i][col] == value) {
          //Value already exists in column
          return false
        }
      }
  
      /* Check Row Placement */
      for(let i=0; i < 9; i++) {
        if(board[row][i] == value) {
          //Value already exists in row
          return false
        }
      }
  
      /* Check Region placement */
      let boxTopRow = parseInt(row / 3) * 3; //Returns index of top row of box (0, 3, or 6)
      let boxLeftColumn = parseInt(col / 3) * 3; //Returns index of left column of box (0, 3, or 6)
  
      let x; //Look through Rows
      let y; //Look through Columns
  
      for(x = boxTopRow; x < boxTopRow + 3; x++){
        for(y = boxLeftColumn; y < boxLeftColumn + 3; y++ ){
          if (board[x][y] == value) {
            return false
          }
        }
      }
  
      return true
    }
  
    solveFromCell(board, row, col){
  
      //console.log('Attempting to solve Row: ' + (row +1) + ', Column: ' + (col + 1) + '.');
      
      //Check column before increasing row 
      if(col === 9) {
        col = 0;
        row++;
      }
      
      //If on row 9, Solution is complete
      if(row === 9) {
        return board
      }
  
      //If number is already filled in, move on to next column
      if (board[row][col] != '.'){
        return this.solveFromCell(board, row, col + 1);
      }
  
      //Try to place a value:
      for(let i = 1; i < 10; i++) {
        let valueToPlace = i.toString();
        if (this.canPlace(board, row, col, valueToPlace)) {
          board[row][col] = valueToPlace;
          if(this.solveFromCell(board, row, col + 1) != false){
            return this.solveFromCell(board, row, col +1);
          } else {
            //Current selected number did not work as a solution.
            //Replace selected number with a '.' and increment i to check for a solution
            board[row][col] = '.';
          }
        }
      }
  
      //Board was impossible to solve
      return false
    }
  
    getCoordinatePosition(string) {
      let coordValue = ["a","b","c","d","e","f","g","h","i"];
      let coords = string.toLowerCase().split('');
      let isChar = /^[a-i]$/;
      let isNum = /^[1-9]$/;
      let rowValue = coordValue.indexOf(coords[0]);
      let colValue = coords[1];
      let position = parseInt(rowValue) * 9 + parseInt(colValue);
      if (isChar.test(coords[0]) && isNum.test(coords[1]) && string.length === 2) {
        return {
          position: position - 1,
          coords: [parseInt(colValue), parseInt(rowValue)]
        }
      } else {
        return false
      } 
    }
  }
  
  module.exports = SudokuSolver;
  
  