// Draw stuff
// Time-stamp: <2019-04-06 20:08:33 Michael Perez>
//
//draw_cells author: Michael Perez
//Email: m_perez83@csu.fullerton.edu
//Description: This file contains functions to do the following two things:
//draw_cells: Draws all of the cells based on Wolfram Rule 150
//function at work in this application is draw_cells.
// ------------------------------------------------------------

var cells = [
  [],
  []
];

function draw_cells(rctx, scale) {

  let width = rctx.canvas.width / scale;
  let height = rctx.canvas.height / scale;

  //Create nodes
  for (let row = 0; row < height; row++) {
    if (!cells[row]) cells[row] = [];
    for (let col = 0; col < width; col++) {
      cells[row][col] = {
        state: 0,
        xPos: col,
        yPos: row
      };
    }
  }

  //Manually set the top center cell to state 1
  cells[0][Math.floor(width / 2)].state = 1;

  for (let row = 0; row < cells.length; row++) {
    for (let col = 0; col < cells[row].length; col++) {
      rctx.fillStyle = (cells[row][col].state == 0) ? "white" : "black";
      rctx.fillRect(col * scale, row * scale, scale, scale);
    }
  }

  //Create TM and set the head to the top center cell
  tm = {
    headRow: 0,
    headCol: 0,
    stateArray: cells,
    leftState: 0,
    centerState: 0,
    rightState: 0
  };

  //Perform all TM operations
  perform_all_operations(tm, rctx);

}

function perform_all_operations(tm, rctx) {

  writeSpeed = 1;

  if (tm.headCol == 0) {
    setTimeout(function() {
      tm.leftState = 0;
    }, writeSpeed);

    setTimeout(function() {
      tm.centerState = cells[tm.headRow][tm.headCol].state;
    }, writeSpeed * 2);

    setTimeout(function() {
      move_tm_right(tm, rctx);
      tm.rightState = cells[tm.headRow][tm.headCol].state;
    }, writeSpeed * 3);

    setTimeout(function() {
      move_tm_left(tm, rctx);
    }, writeSpeed * 4);

    setTimeout(function() {
      move_tm_down(tm, rctx);
    }, writeSpeed * 5);

    setTimeout(function() {
      set_cell_state(tm);
    }, writeSpeed * 6);

    setTimeout(function() {
      move_tm_up(tm, rctx);
    }, writeSpeed * 7);
  }

  else if (tm.headCol == tm.stateArray[0].length) {
    setTimeout(function() {
      move_tm_left(tm, rctx);
      tm.leftState = cells[tm.headRow][tm.headCol].state;
    }, writeSpeed);

    setTimeout(function() {
      move_tm_right(tm, rctx);
      tm.centerState = cells[tm.headRow][tm.headCol].state;
    }, writeSpeed * 2);

    setTimeout(function() {
      tm.rightState = 0;
    }, writeSpeed * 3);

    setTimeout(function() {
      //move_tm_left(tm, rctx);
    }, writeSpeed * 4);

    setTimeout(function() {
      move_tm_down(tm, rctx);
    }, writeSpeed * 5);

    setTimeout(function() {
      set_cell_state(tm);
    }, writeSpeed * 6);

    setTimeout(function() {
      move_tm_up(tm, rctx);
    }, writeSpeed * 7);
  }

  else {
    setTimeout(function() {
      move_tm_left(tm, rctx);
      tm.leftState = cells[tm.headRow][tm.headCol].state;
    }, writeSpeed);

    setTimeout(function() {
      move_tm_right(tm, rctx);
      tm.centerState = cells[tm.headRow][tm.headCol].state;
    }, writeSpeed * 2);

    setTimeout(function() {
      move_tm_right(tm, rctx);
      tm.rightState = cells[tm.headRow][tm.headCol].state;
    }, writeSpeed * 3);

    setTimeout(function() {
      move_tm_left(tm, rctx);
    }, writeSpeed * 4);

    setTimeout(function() {
      move_tm_down(tm, rctx);
    }, writeSpeed * 5);

    setTimeout(function() {
      set_cell_state(tm);
    }, writeSpeed * 6);

    setTimeout(function() {
      move_tm_up(tm, rctx);
    }, writeSpeed * 7);
  }

  setTimeout(function() {
    reset_tm_head_to_state_color(tm, rctx);

    move_tm_right(tm, rctx);

    //Determine if we should go to the next row
    if (tm.headCol >= tm.stateArray[0].length - 1) {
      while (tm.headCol != 0) {
        move_tm_left(tm, rctx);
      }
      move_tm_down(tm, rctx);
    }

    //Determine if we went off the bottom of the grid
    if (tm.headRow < tm.stateArray.length - 1) {
      perform_all_operations(tm, rctx);
    }
  }, writeSpeed * 8);

}

function move_tm_up(tm, rctx) {
  reset_tm_head_to_state_color(tm, rctx);
  tm.headRow--;
  rctx.fillStyle = "purple";
  rctx.fillRect(tm.headCol * scale, tm.headRow * scale, scale, scale);
}

function move_tm_down(tm, rctx) {
  reset_tm_head_to_state_color(tm, rctx);
  tm.headRow++;
  rctx.fillStyle = "purple";
  rctx.fillRect(tm.headCol * scale, tm.headRow * scale, scale, scale);
}

function move_tm_left(tm, rctx) {
  reset_tm_head_to_state_color(tm, rctx);
  tm.headCol--;
  rctx.fillStyle = "purple";
  rctx.fillRect(tm.headCol * scale, tm.headRow * scale, scale, scale);
}

function move_tm_right(tm, rctx) {
  reset_tm_head_to_state_color(tm, rctx);
  tm.headCol++;
  rctx.fillStyle = "purple";
  rctx.fillRect(tm.headCol * scale, tm.headRow * scale, scale, scale);
}

function reset_tm_head_to_state_color(tm, rctx) {
  rctx.fillStyle = (cells[tm.headRow][tm.headCol].state == 0) ? "white" : "black";
  rctx.fillRect(tm.headCol * scale, tm.headRow * scale, scale, scale);
}

function set_cell_state(tm) {
  if (tm.leftState == 1 && tm.centerState == 1 && tm.rightState == 1) {
    cells[tm.headRow][tm.headCol].state = 1;
  }
  else if (tm.leftState == 1 && tm.centerState == 1 && tm.rightState == 0) {
    cells[tm.headRow][tm.headCol].state = 0;
  }
  else if (tm.leftState == 1 && tm.centerState == 0 && tm.rightState == 1) {
    cells[tm.headRow][tm.headCol].state = 0;
  }
  else if (tm.leftState == 1 && tm.centerState == 0 && tm.rightState == 0) {
    cells[tm.headRow][tm.headCol].state = 1;
  }
  else if (tm.leftState == 0 && tm.centerState == 1 && tm.rightState == 1) {
    cells[tm.headRow][tm.headCol].state = 0;
  }
  else if (tm.leftState == 0 && tm.centerState == 1 && tm.rightState == 0) {
    cells[tm.headRow][tm.headCol].state = 1;
  }
  else if (tm.leftState == 0 && tm.centerState == 0 && tm.rightState == 1) {
    cells[tm.headRow][tm.headCol].state = 1;
  }
  else if (tm.leftState == 0 && tm.centerState == 0 && tm.rightState == 0) {
    cells[tm.headRow][tm.headCol].state = 0;
  }
}
