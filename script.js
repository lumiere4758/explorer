const player = document.getElementById("player")

let x = 200
let y = 200
const speed = 5

const keys = {}

document.addEventListener("keydown", (e) => { keys[e.key.toLowerCase()] = true })

document.addEventListener("keyup", (e) => { keys[e.key.toLowerCase()] = false })

function update_player() {
    if (keys["w"]) y -= speed
    if (keys["s"]) y += speed
    if (keys["a"]) x -= speed
    if (keys["d"]) x += speed
    player.style.left = x + "px"
    player.style.top = y + "px"
    requestAnimationFrame(update_player)
}

//call the function noW
update_player()

//now put the images randomly evrywhere on the screen

const imageFiles = ['boo.jpeg', 'book.jpeg', 'brain.jpeg', "coke.jpeg", 'colors.jpeg', 'crown.jpeg', 'diamond.jpeg', 'fries.jpeg', 'ipods.jpeg', 'moon.jpeg', 'moon2.jpeg', 'pixel.jpeg', 'star.jpeg'];

const container = document.getElementById("stuff-container");

imageFiles.forEach(fileName => {
    const img = document.createElement('img');
    img.src = `assets/${fileName}`;
    img.className = `random-img`;
    // random positions
    const randomTop = Math.floor(Math.random() * 80) + 10;
    const randomLeft = Math.floor(Math.random() * 80) + 10;

    img.style.top = `${randomTop}%`;
    img.style.left = `${randomLeft}%`;

    container.appendChild(img);
});

//tired byeee