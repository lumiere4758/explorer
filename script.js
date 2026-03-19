const player = document.getElementById("player")

let x = 200
let y = 200
const speed = 5

const keys = {}

// imma make a score system that when user hits an image a point is added

let score = 0;
const scoreDisplay = document.getElementById("score")
const darknessCanvas = document.getElementById("darkness-overlay")
const ctx = darknessCanvas.getContext("2d")
let hasTorch = false
const TORCH_RADIUS = 160

const torchSprite = document.createElement("img")
torchSprite.src = "assets/torch.png"
torchSprite.id = "torch-sprite"
torchSprite.style.cssText = `
    position: absolute;
    width: 40px;
    height: auto;
    display: none;
    z-index: 45;
    pointer-events: none;
    filter: drop-shadow(0 0 8px orange)`

document.body.appendChild(torchSprite)

function resizeCanvas() {
    darknessCanvas.width = window.innerWidth
    darknessCanvas.height = window.innerHeight
}
resizeCanvas()
window.addEventListener("resize", resizeCanvas)

function drawDarkness(torchX, torchY) {
    ctx.clearRect(0, 0, darknessCanvas.width, darknessCanvas.height)

    ctx.fillStyle = "rgba(0,0,0,0.96)"
    ctx.fillRect(0, 0, darknessCanvas.width, darknessCanvas.height)

    if (hasTorch) {
        // warm circle around player
        const gradient = ctx.createRadialGradient(torchX, torchY, 0, torchX, torchY, TORCH_RADIUS)
        gradient.addColorStop(0, "rgba(0,0,0,1)")
        gradient.addColorStop(0.55, "rgba(0,0,0,0.9)")
        gradient.addColorStop(1, "rgba(0,0,0,0)")

        ctx.globalCompositeOperation = "destination-out"
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(torchX, torchY, TORCH_RADIUS, 0, Math.PI * 2)
        ctx.fill()

        ctx.globalCompositeOperation = "source-over"
        const warmGlow = ctx.createRadialGradient(torchX, torchY, 0, torchX, torchY, TORCH_RADIUS)
        warmGlow.addColorStop(0, "rgba(255,160,50,0.18)")
        warmGlow.addColorStop(0.6, "rgba(255,100,20,0.07)")
        warmGlow.addColorStop(1, "rgba(0,0,0,0)")
        ctx.fillStyle = warmGlow
        ctx.beginPath()
        ctx.arc(torchX, torchY, TORCH_RADIUS, 0, Math.PI * 2)
        ctx.fill()



    }

    ctx.globalCompositeOperation = "source-over"
}


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
            if (img.dataset.fileName === "torch.png") {
                hasTorch = true
            }
            img.remove()
            score += 1
            scoreDisplay.textContent = score
        }
    }

    )


    const torchOffsetX = 50
    const torchOffsetY = 10
    const torchPosX = x + torchOffsetX
    const torchPosY = y + torchOffsetY

    if (hasTorch) {
        torchSprite.style.display = "block"
        torchSprite.style.left = torchPosX + "px"
        torchSprite.style.top = torchPosY + "px"
    }

    const lightCX = torchPosX + 20
    const lightCY = torchPosY + 20
    drawDarkness(lightCX, lightCY)



    requestAnimationFrame(update_player)
}

//call the function noW
update_player()

//now put the images randomly evrywhere on the screen
//lets addd a lighting system

const imageFiles = ['boo.jpeg', 'torch.png', 'book.jpeg', 'brain.jpeg', "coke.jpeg", 'colors.jpeg', 'crown.jpeg', 'diamond.jpeg', 'fries.jpeg', 'ipods.jpeg', 'moon.jpeg', 'moon2.jpeg', 'pixel.jpeg', 'star.jpeg'];

const container = document.getElementById("stuff-container");

imageFiles.forEach(fileName => {
    const img = document.createElement('img');
    img.src = `assets/${fileName}`;
    img.className = `random-img`;
    img.dataset.fileName = fileName
    // random positions
    const randomTop = Math.floor(Math.random() * 80) + 10;
    const randomLeft = Math.floor(Math.random() * 80) + 10;

    img.style.top = `${randomTop}%`;
    img.style.left = `${randomLeft}%`;

    container.appendChild(img);
});

//tired byeee