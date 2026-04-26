const height = 600
const width = 600
const maxCanvasSide = 100
const clearBtn = document.querySelector('.clear-btn')
const btn = document.querySelector('.btn')
const container = document.getElementById('container')
const paletteContainer = document.getElementById('select-color')
const primaryPalette = {
  Red: "#ff7272",
  Orange: "#ffc75e",
  Yellow: "#ffff7c",
  Green: "#7eff7e",
  Blue: "#6e6eff",
  Purple: "#ff7eff",
  Black: "#000000",
  White: "#FFFFFF"
}
const RANDOM = 'random'
let selectedColor = RANDOM

let side = 16

function generatePalette() {
    for (color in primaryPalette) {
        const div = document.createElement('div')
        div.setAttribute('class', 'palette-color')
        div.style.backgroundColor = primaryPalette[color]
        div.onclick = () => {
            selectedColor = div.style.backgroundColor
        }
        paletteContainer.appendChild(div)
    }
}

generatePalette()

function randomColor() {
    const maxRgbValue = 255
    const red = Math.floor(Math.random() * (maxRgbValue + 1))
    const green = Math.floor(Math.random() * (maxRgbValue + 1))
    const blue = Math.floor(Math.random() * (maxRgbValue + 1))
    return [red, green, blue]
}

function drawCanvas() {
    container.style.height = height + 'px'
    container.style.width = width + 'px'
    divSize = container.clientHeight / side
    
    for (let i = 0; i < side * side; i++) {
        const div = document.createElement('div')
        div.style.height = divSize + 'px'
        div.style.width = divSize + 'px'
        div.style.opacity = 0
        div.addEventListener('mouseenter', () => {
            let divColor = div.style.backgroundColor
            if (!divColor) {
                if (selectedColor == RANDOM) {
                    [ red, green, blue ] = randomColor()
                    div.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`
                } else {
                    div.style.backgroundColor = selectedColor
                }
            }
            let currentOpacity = parseFloat(div.style.opacity)
            if (currentOpacity < 1) div.style.opacity = currentOpacity + 0.1
        })
        container.appendChild(div)
    }

}


btn.onclick = () => {
    newSide = parseInt(prompt('Sides: '))
    if (isNaN(newSide) || newSide > 100) return
    side = newSide
    container.replaceChildren()
    drawCanvas()
}

clearBtn.onclick = () => {
    container.replaceChildren()
    drawCanvas()
}

drawCanvas()