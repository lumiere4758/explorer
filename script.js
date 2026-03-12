const player = document.getElementById("player")

let x = 200
let y = 200
const speed = 5

const keys = {}

document.addEventListener("keydown", (e) => { keys[e.key.toLowerCase()] = true })

document.addEventListener("keyup", (e) => { keys[e.key.toLowerCase()] = false })

function update_player() {
    if (keys["w"]) {
        `if(keys["w"]) y -= speed
        if(keys["s"]) y += speed
        if(keys["a"]) x -= speed
        if(keys["d"]) x += speed
        player.style.left = x + "px"
        player.style.top = y + "px"
        requestAnimationFrame(update)`

    }
}

//call the function now

update_player()