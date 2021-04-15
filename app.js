document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid'); //looks for the class 'grid' in the html document
    let width = 10;
    let bombAmount = 20;  //number of bombs in the game - more bombs, higher level
    let flags = 0;
    let squares = [];
    let isGameOver = false;

    //CREATE BOARD
    function createBoard() {
        //get shuffled game array with random bombs
        const bombArray = Array(bombAmount).fill('bomb'); //create array of bombs(20) and give it a string of 'bomb'
        const emptyArray = Array(width*width - bombAmount).fill('mine'); //creates array of the mines(squares without bombs)
        //join the two arrays together and shuffle them randomly
        const gameArray = emptyArray.concat(bombArray); //the two arrays are being joined
        const shuffledArray = gameArray.sort(()=> Math.random() - 0.5); //shuffles the new gameArray
        
        for (let i = 0; i < width*width; i++) {
            const square = document.createElement('div'); //creates 100 divs in html doc
            square.setAttribute('id', i); //gives each square an id based on the square's index -[i]
            square.classList.add(shuffledArray[i]); //gives the squares class name of either 'bomb' or 'mine'
            grid.appendChild(square); //places each square on the grid
            squares.push(square);

            //add normal click event listener
            square.addEventListener('click', function(e) {
                click(square);
            });
            //ctrl and left click
            square.oncontextmenu = function(e) {
                e.preventDefault();
                addFlag(square);
            };
        }

    //ADD NUMBERS
    for(let i = 0; i < squares.length; i++) {
        let total = 0;
        const isLeftSide = (i % width === 0);
        const isRightSide = (i % width === width - 1);

        if (squares[i].classList.contains('mine')) {
            //we need to run 8 tests for bomb(s), in all the surrounding squares for a given square
            if(i > 0 && !isLeftSide && squares[i-1].classList.contains('bomb')) total ++; //checks left square for bomb
            if(i > 9 && !isRightSide && squares[i+1-width].classList.contains('bomb')) total ++; //checks north east sq. for bomb
            if(i > 10 && squares[i-width].classList.contains('bomb')) total++; //checks top square
            if(i > 11 && !isLeftSide && squares[i-1-width].classList.contains('bomb'))total++; // checks north west
            if(i < 98 && !isRightSide && squares[i+1].classList.contains('bomb'))total++; //checks right square
            if(i < 90 && !isLeftSide && squares[i-1+width].classList.contains('bomb'))total++; //checks square on south west
            if(i < 88 && !isRightSide && squares[i+1+width].classList.contains('bomb'))total++; //checks south east square for bomb
            if(i < 89 && squares[i+width].classList.contains('bomb'))total++; //checks bottom square for bomb

            squares[i].setAttribute('data', total);
        }
    }
}

    createBoard(); //invoke this -gets called 100 times

    //add flag on right clicking
    function addFlag(square) {
        if(isGameOver) return;
        if(!square.classList.contains('checked') &&  (flags < bombAmount)) {
            if(!square.classList.contains('flag')) {
                square.classList.add('flag');
                square.innerHTML = '🚩';
                flags++;
            } else {
                square.classList.remove('flag');
                square.innerHTML = '';
                flags--;
            }
        }
    }

    //click on square actions
    function click(square) { //pass 'square' as a parameter
        let currentId = square.id;
        if(isGameOver) return;
        if(square.classList.contains('checked') || square.classList.contains('flag')) return;
        if (square.classList.contains('bomb')) {
            gameOver(square);
        } else {
            let total = square.getAttribute('data'); //checks the total number of bombs surrounding a given square
            if( total !=0) { //if there are no bombs,
                square.classList.add('checked'); //it adds a class of checked
                square.innerHTML = total; //displays the total
                return;
            }
            checkSquare(square, currentId);
        }
        square.classList.add('checked'); //add class name 'checked' for the squares that don't have any bombs surrounding them. i.e with data = 0
    }

    //check surrounding/neighboring squares once a square is clicked
    function checkSquare(currentId) {
        const isLeftSide = (currentId % width === 0);
        const isRightSide = (currentId % width === width - 1);

        setTimeout(() => {
            if (currentId > 0 && isLeftSide) {
                const newId = squares[parseInt(currentId) -1].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if(currentId > 9 && isRightSide) {
                const newId = squares[parseInt(currentId) +1 - width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if(currentId > 10) {
                const newId = squares[parseInt(currentId) - width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if(currentId > 11 && isLeftSide) {
                const newId = squares[parseInt(currentId) -1 - width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if(currentId < 98 && isRightSide) {
                const newId = squares[parseInt(currentId) +1].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if(currentId < 90 && isLeftSide) {
                const newId = squares[parseInt(currentId) -1 + width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if(currentId < 88 && isRightSide) {
                const newId = squares[parseInt(currentId) +1 + width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
            if(currentId < 89) {
                const newId = squares[parseInt(currentId) + width].id;
                const newSquare = document.getElementById(newId);
                click(newSquare);
            }
        }, 10);
        
    }
    //game over function
    function gameOver (square) {
        result.innerHTML = 'Sorry...Game over!';
        isGameOver = true;

        //show all bombs when game is over
        squares.forEach(square => {
            if (squares.classList.contains('bomb')) {
                square.innerHTML = '💣';
            }
        });
    }

});
