let w = 20;
let columns;
let rows;
let grid;
let nextGenGrid;

let width = 720;
let height = 400;

let value;
let pause = false;

function setup() {
    createCanvas(width, height);
    createGrid();
    initializeGrid(); 
    frameRate(18);
}

function draw() {
    drawGrid();
    if (!pause) updateGeneration();
}

function createGrid() {
    columns = floor(width/w);
    rows = floor(height/w);

    grid = new Array(columns);
    for(let i = 0; i < columns; i++) {
        grid[i] = new Array(rows);
    }

    nextGenGrid = new Array(columns);
    for (let i = 0; i < columns; i++) {
        nextGenGrid[i] = new Array(rows);       
    } 
}

function initializeGrid() {
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (i == 0 || j == 0 || i == columns-1 || j == rows-1) grid[i][j] = 0;
            else grid[i][j] = floor(random(2));
            nextGenGrid[i][j] = 0;            
        }        
    }
}

function drawGrid() {
    background(255);

    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if ((grid[i][j] == 1)) fill(0);
            else fill(255); 
            stroke(0);
            rect(i * w, j * w, w - 1, w -1);
        }        
    }
}

function updateGeneration() {
    for (let x = 1; x < columns - 1; x++) {
        for (let y = 1; y < rows - 1; y++) {
            
            let neighbors = 0;
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    neighbors += grid[x+i][y+j];                                        
                }                
            }
            
            neighbors -= grid[x][y];
        
            if      ((grid[x][y] == 1) && (neighbors <  2)) nextGenGrid[x][y] = 0;           
            else if ((grid[x][y] == 1) && (neighbors >  3)) nextGenGrid[x][y] = 0;          
            else if ((grid[x][y] == 0) && (neighbors == 3)) nextGenGrid[x][y] = 1;           
            else                                             nextGenGrid[x][y] = grid[x][y];
        }
    }
    let temp = grid;
    grid = nextGenGrid;
    nextGenGrid = temp;        
}

function mousePressed() {
    let found = false;
    for (let x = 0; x < columns ; x++) {
        for (let y = 0; y < rows; y++) {
            if(!found && (mouseX > 0 && mouseX < x*w) && (mouseY > 0 && mouseY < y*w)) {
                grid[x -1 ][y - 1] = 1;
                found = true;
                drawGrid();
                break; 
            }
        }
    }
}

function togglePause() {
    pause = true;
}

function toggleRun() {
    pause = false;
}

function toggleClear() {
    createGrid();
}

function randomize() {
    createGrid();
    initializeGrid();
}

function setCanvasSize(canvasWidht, canvasHeight, cellSize) {
    width = canvasWidht;
    height = canvasHeight;
    w = cellSize;
    setup();
}