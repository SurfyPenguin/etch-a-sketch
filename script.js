const MAX_CANVAS_SIZE = 100

const btn = document.querySelector('.btn')
const clearBtn = document.querySelector('.clear-btn')

const container = document.getElementById('container')
const paletteContainer = document.getElementById('select-color')
const modesContainer = document.getElementById('modes-container')

const minGridSize = 8
const maxGridSize = 100

// define colors
const PALETTE = {
    BASE: {
        red: '#ff7272',
        orange: '#ffc75e',
        yellow: '#ffff7c',
        green: '#7eff7e',
        blue: '#6e6eff',
        purple: '#ff7eff',
        black: '#000000',
        white: '#FFFFFF',
    },

    MODES: {
        rainbow: false,
        shading: true,
    },
}

let canvasGridSize = 16
let activeColor = PALETTE.BASE.black
let activeSwatch = null

function createPalette() {
    const fragment = document.createDocumentFragment()

    for (const [color, hex] of Object.entries(PALETTE.BASE)) {
        const colorSwatch = document.createElement('div')
        colorSwatch.classList.add('palette-color')
        colorSwatch.style.backgroundColor = hex

        colorSwatch.classList.toggle('active-color', (hex == activeColor))

        colorSwatch.addEventListener('click', () => {
            document.querySelector('.palette-color.active-color')?.classList.remove('active-color')
            colorSwatch.classList.add('active-color')

            activeSwatch = colorSwatch
            activeColor = hex
        })

        fragment.appendChild(colorSwatch)
    }
    
    paletteContainer.appendChild(fragment)

    for (const [mode, isActive] of Object.entries(PALETTE.MODES)) {
        const modeButton = document.createElement('button')
        const text = mode.toString()

        modeButton.classList.add('mode-button')
        modeButton.innerText = text.charAt(0).toUpperCase() + text.slice(1)

        modeButton.classList.toggle('active-mode', PALETTE.MODES[mode])

        modeButton.addEventListener('click', () => {
            PALETTE.MODES[mode] = !PALETTE.MODES[mode]
            modeButton.classList.toggle('active-mode', PALETTE.MODES[mode])
        })
        fragment.appendChild(modeButton)
    }
    modesContainer.appendChild(fragment)

}

function getRandomColor() {
    return `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`   
}

function createCanvas() {
    // get rendered height and width
    const canvasHeight = container.clientHeight
    const canvasWidth = container.clientWidth

    const boxSideWidth = canvasHeight / canvasGridSize
    const fragment = document.createDocumentFragment()
    
    for (let i = 0; i < canvasGridSize * canvasGridSize; i++) {
        const box = document.createElement('div')

        box.style.height = boxSideWidth + 'px'
        box.style.width = boxSideWidth + 'px'
        box.style.opacity = 0

        box.addEventListener('mouseenter', () => {
            PALETTE.MODES.rainbow ? box.style.backgroundColor = getRandomColor() : box.style.backgroundColor = activeColor
            PALETTE.MODES.shading ? box.style.opacity = parseFloat(box.style.opacity) + 0.1 : box.style.opacity = 1
        })

        fragment.appendChild(box)
    }

    container.appendChild(fragment)

}

function getInputSize() {
    let input = parseInt(prompt('Size of canvas: ', canvasGridSize))
    if (isNaN(input) || input < minGridSize || input > maxGridSize) {
        alert(`Canvas size must be between ${minGridSize}-${maxGridSize}!`)
        return
    }
    return input
}

function clearCanvas() {
    container.replaceChildren()
    createCanvas()
}

btn.addEventListener('click', () => {
    let size = getInputSize()
    if (size) {
        canvasGridSize = size
        clearCanvas()
    }
})

clearBtn.addEventListener('click', clearCanvas)

createCanvas()
createPalette()