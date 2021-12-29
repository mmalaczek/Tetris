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

    let timerId;
    const tileWidth = 20;
    const tileHeight = 20;
    const gridWidth = 10;
    const upNextGridWidth = 4;
    let nextRandom = 0;
    let score = 0;
    let tiles = Array.from(document.querySelectorAll(".gameGrid div"));
    let upNext = Array.from(document.querySelectorAll(".upNext div"));
    const scoreDisplay = document.querySelector("#scoreDisplay");
    const startButton = document.querySelector("#startStopButton");

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
    // const colors = [
    //     '#ff0000', '#00a8f1', '#ebff00', '#fc00ee', '#aaaaaa'
    // ];

    let currentPosition = 4;
    let randomTetrimino = Math.floor(Math.random() * theTetriminos.length);
    let currentRotation = 0;
    let currentBlock = theTetriminos[randomTetrimino][currentRotation];

    const draw = () => {
        currentBlock.forEach((el) => {
            tiles[currentPosition + el].classList.add('tetrimino');
            // tiles[currentPosition + el].style.backgroundColor = colors[randomTetrimino];
        })
    }

    const undraw = () => {
        currentBlock.forEach((el) => {
            tiles[currentPosition + el].classList.remove('tetrimino');
            // tiles[currentPosition + el].style.backgroundColor = '';
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
            // el.style.backgroundColor = '';
        });
        upNextTetriminos[nextRandom].forEach(el => {
            upNext[el].classList.add('tetrimino');
            // upNext[el].style.backgroundColor = colors[nextRandom];
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
            addScore();
            gameOver();
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

    const addScore = () => {
        for (let i = 0; i < 199; i += gridWidth) {
            const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];

            if (row.every(el => tiles[el].classList.contains('taken'))) {
                score += 10;
                scoreDisplay.textContent = score;

                row.forEach(el => {
                    tiles[el].classList.remove('taken');
                    tiles[el].classList.remove('tetrimino');
                    // tiles[el].style.backgroundColor = '';
                })

                const tilesRemoved = tiles.splice(i, gridWidth);
                tiles = tilesRemoved.concat(tiles);
                tiles.forEach(tile => {
                    document.querySelector(".gameGrid").appendChild(tile);
                })
            }
        }
    }

    const gameOver = () => {
        if (currentBlock.some(el => tiles[currentPosition + el].classList.contains('taken'))) {
            document.removeEventListener('keyup', control);
            timerId = null;
            document.querySelector("#endGameText").setAttribute("style", "visibility: visible");
        }
    }

    // GAME LOGIC BELOW
    document.querySelector("#endGameText").setAttribute("style", "visibility: hidden");
    startButton.addEventListener('click', (e) => {
        if (timerId) {
            clearInterval(timerId);
            document.removeEventListener('keyup', control);
            timerId = null;
        } else {
            tiles.forEach((el, i) => {
                if (i < 199) {
                    el.classList.remove('tetrimino');
                    el.classList.remove('taken');
                }
            });
            score = 0;
            document.querySelector("#endGameText").setAttribute("style", "visibility: hidden");
            document.addEventListener('keyup', control);
            draw();
            timerId = setInterval(moveDown, 1000);
            nextRandom = Math.floor(Math.random() * theTetriminos.length);
            upNextDisplay();
        }
    });

}