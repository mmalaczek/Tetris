window.onload = () => {
    for (let i = 0; i < 200; i++) {
        let tile = document.createElement('div');
        tile.setAttribute('class', 'tile');
        document.querySelector(".gameGrid").appendChild(tile);
    }

    for (let i = 0; i < 10; i++) {
        let tile = document.createElement('div');
        tile.classList.add('taken');
        document.querySelector(".gameGrid").appendChild(tile);
    }

    for (let i = 0; i < 16; i++) {
        let tile = document.createElement('div');
        tile.classList.add('nextTet');
        document.querySelector(".upNext").appendChild(tile);
    }

    const tileWidth = 20;
    const tileHeight = 20;
    const gridWidth = 10;
    const upNextGridWidth = 4;
    let nextRandom = 0;
    let tiles = Array.from(document.querySelectorAll(".gameGrid div"));
    let upNext = Array.from(document.querySelectorAll(".upNext div"));
    const scoreDisplay = document.querySelectorAll("#scoreDisplay");
    const startStopButton = document.querySelectorAll("#startStopButton");

    const lTetrimino = [
        [1, gridWidth + 1, gridWidth * 2 + 1, 2],
        [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth * 2 + 2],
        [gridWidth * 2, 1, gridWidth + 1, gridWidth * 2 + 1],
        [gridWidth, gridWidth * 2, gridWidth * 2 + 1, gridWidth * 2 + 2]
    ];

    const sTetrimino = [
        [gridWidth * 2, gridWidth + 1, gridWidth * 2 + 1, gridWidth + 2],
        [0, gridWidth, gridWidth + 1, gridWidth * 2 + 1],
        [gridWidth * 2, gridWidth + 1, gridWidth * 2 + 1, gridWidth + 2],
        [0, gridWidth, gridWidth + 1, gridWidth * 2 + 1],
    ];

    const tTetrimino = [
        [gridWidth, 1, gridWidth + 1, gridWidth + 2],
        [1, gridWidth + 1, gridWidth * 2 + 1, gridWidth + 2],
        [gridWidth, gridWidth + 1, gridWidth * 2 + 1, gridWidth + 2],
        [gridWidth, 1, gridWidth + 1, gridWidth * 2 + 1]
    ];

    const oTetrimino = [
        [0, gridWidth, 1, gridWidth + 1],
        [0, gridWidth, 1, gridWidth + 1],
        [0, gridWidth, 1, gridWidth + 1],
        [0, gridWidth, 1, gridWidth + 1]
    ];

    const iTetrimino = [
        [1, gridWidth + 1, gridWidth * 2 + 1, gridWidth * 3 + 1],
        [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth + 3],
        [1, gridWidth + 1, gridWidth * 2 + 1, gridWidth * 3 + 1],
        [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth + 3],
    ];

    const upNextTetriminos = [
        [1, upNextGridWidth + 1, upNextGridWidth * 2 + 1, 2],
        [upNextGridWidth * 2, upNextGridWidth + 1, upNextGridWidth * 2 + 1, upNextGridWidth + 2],
        [upNextGridWidth, 1, upNextGridWidth + 1, upNextGridWidth + 2],
        [0, upNextGridWidth, 1, upNextGridWidth + 1],
        [1, upNextGridWidth + 1, upNextGridWidth * 2 + 1, upNextGridWidth * 3 + 1]
    ];

    const theTetriminos = [lTetrimino, sTetrimino, tTetrimino, oTetrimino, iTetrimino];

    let currentPosition = 4;
    let randomTetrimino = Math.floor(Math.random() * theTetriminos.length);
    let currentRotation = 0;
    let currentBlock = theTetriminos[randomTetrimino][currentRotation];

    const draw = () => {
        currentBlock.forEach((el) => {
            tiles[currentPosition + el].classList.add('tetrimino');
        })
    }

    const undraw = () => {
        currentBlock.forEach((el) => {
            tiles[currentPosition + el].classList.remove('tetrimino');
        })
    }

    const moveDown = () => {
        undraw();
        currentPosition += gridWidth;
        draw();
        freeze();
    }

    const upNextDisplay = () => {
        upNext.forEach(el => {
            el.classList.remove('tetrimino');
        });
        upNextTetriminos[nextRandom].forEach(el => {
            upNext[el].classList.add('tetrimino');
        });
    }

    const freeze = () => {
        if (currentBlock.some(el => tiles[currentPosition + el + gridWidth].classList.contains('taken'))) {
            currentBlock.forEach((el) => {
                tiles[currentPosition + el].classList.add('taken');
            });
            randomTetrimino = nextRandom;
            nextRandom = Math.floor(Math.random() * theTetriminos.length);
            currentBlock = theTetriminos[randomTetrimino][currentRotation];
            currentPosition = 4;
            draw();
            upNextDisplay();
        }
    }

    const moveLeft = () => {
        undraw();
        const isAtLeftEdge = currentBlock.some(el => (currentPosition + el) % gridWidth === 0)
        if (!isAtLeftEdge) {
            currentPosition -= 1;
        }

        if (currentBlock.some(el => tiles[currentPosition + el].classList.contains('taken'))) {
            currentPosition += 1;
        }
        draw();
    }

    const moveRight = () => {
        undraw();
        const isAtLeftEdge = currentBlock.some(el => (currentPosition + el) % gridWidth === gridWidth - 1)
        if (!isAtLeftEdge) {
            currentPosition += 1;
        }

        if (currentBlock.some(el => tiles[currentPosition + el].classList.contains('taken'))) {
            currentPosition -= 1;
        }
        draw();
    }

    const rotate = () => {
        undraw();
        currentRotation++;
        if (currentRotation === currentBlock.length) {
            currentRotation = 0;
        }
        currentBlock = theTetriminos[randomTetrimino][currentRotation];
        draw();
    }

    const control = (e) => {
        if (e.keyCode === 37) {
            moveLeft();
        }

        if (e.keyCode === 38) {
            rotate();
        }

        if (e.keyCode === 39) {
            moveRight();
        }

        if (e.keyCode === 40) {
            moveDown();
        }
    }

    // GAME LOGIC BELOW
    document.addEventListener('keyup', control);
    draw();
    upNextDisplay();

    let timerId = setInterval(moveDown, 1000);

}