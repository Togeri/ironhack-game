let buttons = []

buttons.push(document.querySelector("#direction-up"))
buttons.push(document.querySelector("#direction-right"))
buttons.push(document.querySelector("#direction-down"))
buttons.push(document.querySelector("#direction-left"))
buttons.push(document.querySelector("#action-button-b"))
buttons.push(document.querySelector("#action-button-a"))

let startButton = document.querySelector("#startButton")

let coinSound = new Audio("./sounds/sfx/coin.wav")
let marioSound = new Audio("./sounds/sfx/its-a-me-mario-super-mario-64.mp3")

const pressButton = (button) =>  button.style.filter = "brightness(10)"
const releaseButton = (button) => button.style.filter = "brightness(1)"

startButton.addEventListener('click', event => { 


    startButton.style.display = "none"
    coinSound.play()
    startButton.parentNode.remove()
    startButton.remove()
    document.querySelector("#canvas").style.display = "flex"
    setTimeout(() => marioSound.play(), 1000)
    setTimeout(() => game.init(), 3000)

})