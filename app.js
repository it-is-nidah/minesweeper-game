document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let width = 10;
    let squares = [];
    let bombAmount = 20;

    //CREATE BOARD
    function createBoard() {
        //get shuffled array with random mines
        const bombArray = Array(bombAmount).fill('bomb');
        const emptyArray = Array(width*width - bombAmount).fill('mine!');
        const gamesArray = emptyArray.concat(bombArray);
        const shuffleArray = gamesArray.sort(()=> Math.random() - 0.5);
        for (let i = 0; i < width*width; i++) {
            const square = document.createElement('div');
            square.setAttribute('id', i);
            square.classList.add(shuffleArray[i]);
            grid.appendChild(square);
            squares.push(square);
        }
    }
    createBoard();
});
