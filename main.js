
window.onload = () => {
    for (let i = 0; i < 200; i++) {
        let tile = document.createElement('div');
        tile.setAttribute('class', 'tile');
        document.querySelector(".gameGrid").appendChild(tile);
    }
}