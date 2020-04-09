let buttons = []

buttons.push(document.querySelector("#direction-up"))
buttons.push(document.querySelector("#direction-right"))
buttons.push(document.querySelector("#direction-down"))
buttons.push(document.querySelector("#direction-left"))
buttons.push(document.querySelector("#action-button-b"))
buttons.push(document.querySelector("#action-button-a"))




const pressButton = (button) =>  button.style.filter = "brightness(10)"

const releaseButton = (button) => button.style.filter = "brightness(1)"
