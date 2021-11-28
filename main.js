
window.onload = () => {
    for (let i = 0; i < 200; i++) {
        let tile = document.createElement('div');
        tile.setAttribute('class', 'tile');
        document.querySelector(".gameGrid").appendChild(tile);
    }

    const tileWidth = 20;
    const tileHeight = 20;
    let tiles = Array.from(document.querySelectorAll(".tile"));
    const scoreDisplay = document.querySelectorAll("#scoreDisplay");
    const startStopButton = document.querySelectorAll("#startStopButton");

}