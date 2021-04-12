document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let width = 10;
    let squares = [];
    let bombAmount = 20;

    //CREATE BOARD
    function createBoard() {
        //get shuffled array with random mines
        const bombArray = Array(bombAmount).fill('bomb');
        const emptyArray = Array(width*width - bombAmount).fill('mine');
        const gamesArray = emptyArray.concat(bombArray);
        const shuffleArray = gamesArray.sort(()=> Math.random() - 0.5);
        for (let i = 0; i < width*width; i++) {
            const square = document.createElement('div');
            square.setAttribute('id', i);
            square.classList.add(shuffleArray[i]);
            grid.appendChild(square);
            squares.push(square);

            //add normal click event listener
            square.addEventListener('click', function(e) {
                click(square);
            });
        }

    //ADD NUMBERS
    for(let i = 0; i < squares.length; i++) {
        let total = 0;
        const isLeftSide = (i % width === 0);
        const isRightSide = (i % width === width - 1);

        if (squares[i].classList.contains('mine')) {
            if(i > 0 && !isLeftSide && squares[i-1].classList.contains('bomb')) total ++;
            if(i > 9 && !isRightSide && squares[i+1-width].classList.contains('bomb')) total ++;
            if(i > 10 && squares[i-width].classList.contains('bomb')) total++;
            if(i > 11 && !isLeftSide && squares[i-1-width].classList.contains('bomb'))total++;
            if(i < 98 && !isRightSide && squares[i+1].classList.contains('bomb'))total++;
            if(i < 90 && !isLeftSide && squares[i-1+width].classList.contains('bomb'))total++;
            if(i < 88 && !isRightSide && squares[i+1+width].classList.contains('bomb'))total++;
            if(i < 89 && squares[i+width].classList.contains('bomb'))total++;

            squares[i].setAttribute('leo', total);
            
        }
    }
}

    createBoard();
    //click on square actions
    function click(square) {
        if (square.classList.contains('bomb')) {
            alert ('Game Over')
        }
    }
});
