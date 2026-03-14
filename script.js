const player = document.getElementById("player")

let x = 200
let y = 200
const speed = 5

const keys = {}

// imma make a score system that when user hits an image a point is added

let score = 0;
const scoreDisplay = document.getElementById("score")

document.addEventListener("keydown", (e) => { keys[e.key.toLowerCase()] = true })

document.addEventListener("keyup", (e) => { keys[e.key.toLowerCase()] = false })

function getRect(el) {
    return el.getBoundingClientRect()
}

function isColliding(rectA, rectB) {
    return (
        rectA.left < rectB.right &&
        rectA.right > rectB.left &&
        rectA.top < rectB.bottom &&
        rectA.bottom > rectB.top
    )
}


function update_player() {
    if (keys["w"]) y -= speed
    if (keys["s"]) y += speed
    if (keys["a"]) x -= speed
    if (keys["d"]) x += speed

    const playerSize = 80
    const maxX = window.innerWidth - playerSize
    const maxY = window.innerHeight - playerSize
    if (x < 0) x = 0
    if (y < 0) y = 0
    if (x > maxX) x = maxX
    if (y > maxY) y = maxY


    player.style.left = x + "px"
    player.style.top = y + "px"

    const playerRect = getRect(player)
    const randomImgs = document.querySelectorAll(".random-img")

    randomImgs.forEach(img => {
        const imgRect = getRect(img)
        if (isColliding(playerRect, imgRect)) {
            img.remove()
            score += 1
            scoreDisplay.textContent = score
        }
    }

    )

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