let canvas = document.querySelector('#canvas')
let cursor = document.querySelector('#canvas>img')
let toolbtn = document.querySelectorAll('.tool-btn')
let propertyPanel = document.querySelector('.right-sidebar')
let moveUpBtn = document.querySelector('#move-up-btn')
let moveDownBtn = document.querySelector('#move-down-btn')
let selectedTool = ""
let selectedShape = null
let Rectid = 1
let Circid = 1
let TextId = 1
let isDragging = false
let startX = 0
let startY = 0
let initialLeft = 0
let initialTop = 0
let isResizing = false
let isCreating = false
let activeCorner = null
let resizeStartX = 0
let resizeStartY = 0
let resizeStartWidth = 0
let resizeStartHeight = 0
let resizeStartLeft = 0
let resizeStartTop = 0
let ZInd = 1

const addCorners = (el) => {
    document.querySelectorAll('.handle').forEach(h => h.remove())
    const positions = [
        { class: 'tl', top: '-4px', left: '-4px', cursor: 'nw' },
        { class: 'tr', top: '-4px', right: '-4px', cursor: 'ne' },
        { class: 'bl', bottom: '-4px', left: '-4px', cursor: 'sw' },
        { class: 'br', bottom: '-4px', right: '-4px', cursor: 'se' }
    ];

    positions.forEach((pos) => {
        const corner = document.createElement('div')
        corner.classList.add('handle')
        Object.entries(pos).forEach(([prop, val]) => {
            corner.style[prop] = val
            corner.style.cursor = `${pos.cursor}-resize`
            corner.classList.add(pos.class)
        });
        el.appendChild(corner)
    })
}

const updateLayerList = () => {
    let layerList = document.querySelector('.layers-list')
    let shapes = document.querySelectorAll('.shape')
    let layerListContent = ""
    if (shapes.length === 0) {
        layerListContent = `<div class="layer-item">No layers yet</div>`
    }
    layerList.innerHTML = layerListContent
    shapes.forEach((shape, idx) => {
        const layerItem = document.createElement('div')
        layerItem.classList.add('layer-item')
        layerItem.innerHTML = `${shape.id}    (Index->${shape.style.zIndex})`
        layerItem.style.zIndex = idx


        if (shape === selectedShape) {
            layerItem.classList.add('active')
        }

        layerItem.addEventListener('click', () => {
            document.querySelectorAll('.shape').forEach((s) => {
                s.classList.remove('selected-Shape')
            })
            document.querySelectorAll('.handle').forEach((h) => {
                h.remove()
            })
            selectedShape = shape
            shape.classList.add('selected-Shape')
            if (!shape.classList.contains('base-text')) {
                addCorners(shape)
            }
            updateLayerList()
        })
        layerList.append(layerItem)
    })
}

const moveLayerUp = () => {
    if (!selectedShape) return
    const currentZ = parseInt(selectedShape.style.zIndex) || 0
    selectedShape.style.zIndex = currentZ + 1
    updateLayerList()
}

const moveLayerDown = () => {
    if (!selectedShape) return
    const currentZ = parseInt(selectedShape.style.zIndex) || 0
    if (currentZ > 0) {
        selectedShape.style.zIndex = currentZ - 1
    }
    updateLayerList()
}

const saveToLocalStorage = () => {
    const shapes = document.querySelectorAll('.shape')
    let data = []

    shapes.forEach(shape => {
        console.log(shape);

        const shapeData = {
            id: shape.id,
            type: shape.classList.contains('base-rect') ? 'rectangle' :
                shape.classList.contains('base-circ') ? 'circle' : 'text',
            left: parseInt(shape.style.left) || 0,
            top: parseInt(shape.style.top) || 0,
            width: shape.offsetWidth,
            height: shape.offsetHeight,
            backgroundColor: shape.style.backgroundColor || '',
            zIndex: parseInt(shape.style.zIndex) || 0,
            rotation: shape.style.transform || '',
            textContent: shape.textContent || '',
            fontSize: shape.style.fontSize || '',
            fontFamily: shape.style.fontFamily || '',
            fontWeight: shape.style.fontWeight || '',
            color: shape.style.color || ''
        }
        data.push(shapeData)
    })
    localStorage.setItem('Data', JSON.stringify(data))
}

const LoadFromLocalStorage = () => {
    const saved = localStorage.getItem('Data')
    if (!saved) return

    const data = JSON.parse(saved)
    data.forEach((shapeKaData) => {
        let element
        if (shapeKaData.type === 'rectangle') {
            element = document.createElement('div')
            element.classList.add('base-rect', 'shape')
            element.id = shapeKaData.id
        } else if (shapeKaData.type === 'circle') {
            element = document.createElement('div')
            element.classList.add('base-circ', 'shape')
            element.id = shapeKaData.id
        } else if (shapeKaData.type === 'text') {
            element = document.createElement('div')
            element.classList.add('base-text', 'shape')
            element.id = shapeKaData.id
            element.contentEditable = true
            element.textContent = shapeKaData.textContent
            element.style.fontSize = shapeKaData.fontSize
            element.style.fontFamily = shapeKaData.fontFamily
            element.style.fontWeight = shapeKaData.fontWeight
            element.style.color = shapeKaData.color
        }

        element.style.left = shapeKaData.left + 'px'
        element.style.top = shapeKaData.top + 'px'
        element.style.width = shapeKaData.width + 'px'
        element.style.height = shapeKaData.height + 'px'
        element.style.backgroundColor = shapeKaData.backgroundColor
        element.style.zIndex = shapeKaData.zIndex
        element.style.transform = shapeKaData.rotation
        canvas.appendChild(element)
    })
    updateLayerList()
}


moveUpBtn.addEventListener('click', moveLayerUp)
moveDownBtn.addEventListener('click', moveLayerDown)
window.addEventListener('DOMContentLoaded', () => {
    updateLayerList()
    LoadFromLocalStorage()
})

toolbtn.forEach(btn => {
    btn.addEventListener('click', function () {
        toolbtn.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
    btn.addEventListener("click", (e) => {
        selectedTool = ""
        selectedTool += e.currentTarget.title
        canvas.style.cursor = 'crosshair'
    })
});

const showPropertyPanel = (shape) => {
    let context = ""
    if (shape.classList.contains('base-rect') || shape.classList.contains('base-circ')) {
        context = `<div class="panel-header">
        <span class="layer-name">Rectangle</span>
        <div class="panel-icons">
        <button>⛶</button>
        <button>◐</button>
        <button>⧉</button>
        <button>⋮</button>
        </div>
        </div>
        <div class="panel-section">
        <div class="section-title">Position</div>
        <div class="xy-row">
        <label>X <input id="input-x" type="text" value="${parseInt(shape.style.left)}"></label>
        <label>Y <input id="input-y" type="text" value="${parseInt(shape.style.top)}"></label>
        </div>
        
        <div class="rotate-row">
        <label>⟲ <input id='rotator' type="number" value="0" ></label>
        <div class="rotate-icons">
        <button></button>
        <button></button>
        <button></button>
        </div>
        </div>
        </div>
        
        <div class="panel-section">
        <div class="section-title">Layout</div>
        <div class="xy-row">
        <label>W <input id='input-width' type="number" value="${shape.offsetWidth}"></label>
        <label>H <input id='input-height' type="number" value="${shape.offsetHeight}"></label>
        </div>
        </div>
        
        <div class="panel-section">
        <div class="section-title">Appearance</div>
        <div class="xy-row">
        <label>Opacity <input type="text" value="${shape.style.transform ? shape.style.transform : 0}"></label>
        <label>Radius <input type="number" value="0"></label>
        </div>
        </div>
        <div class="panel-section">
        <div class="section-title">Fill</div>
        <div class="fill-row">
        <div class="color-box"></div>
        <input type="color" id='input-color' value="${shape.style.backgroundColor || '#000000'}">
        <input type="number" value="100">
        <span>%</span>
        </div>
        </div>
        `
    } else if (shape.classList.contains('base-text')) {
        context = `<div class="panel-header">
        <span class="layer-name">Text</span>
        <div class="panel-icons">
        <button>⛶</button>
        <button>◐</button>
        <button>⧉</button>
        <button>⋮</button>
        </div>
        </div>
        
        <div class="panel-section">
        <div class="section-title">Position</div>
        <div class="xy-row">
        <label>X <input id="input-x" type="text" value="${parseInt(shape.style.left)}"></label>
        <label>Y <input id="input-y" type="text" value="${parseInt(shape.style.top)}"></label>
        </div>
        </div>
        
        <div class="panel-section">
        <div class="section-title">Typography</div>
        <div class="xy-row">
        <label>Font Size <input id='input-font-size' type="number" value="${parseInt(shape.style.fontSize) || 16}"></label>
        </div>
        <div class="xy-row">
        <label>Font Family 
        <select id='input-font-family'>
        <option value="Arial">Arial</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
        <option value="Verdana">Verdana</option>
        </select>
        </label>
        </div>
        <div class="xy-row">
        <label>Font Weight 
        <select id='input-font-weight'>
        <option value="normal">Normal</option>
        <option value="bold">Bold</option>
        <option value="lighter">Lighter</option>
        </select>
        </label>
        </div>
        </div>
        
        <div class="panel-section">
        <div class="section-title">Color</div>
        <div class="fill-row">
        <div class="color-box"></div>
        <input type="color" id='input-text-color' value="${shape.style.color || '#000000'}">
        </div>
        </div>
        `
    }

    propertyPanel.innerHTML = context
    attachPropertyListeners(shape)
}

canvas.addEventListener("click", (e) => {
    canvas.style.cursor = ""
    if (e.target === canvas) {
        document.querySelectorAll('.shape').forEach(s => {
            s.classList.remove('selected-Shape');
        });
        document.querySelectorAll('.handle').forEach(h => h.remove());
        selectedShape = null;
    }

    if (e.target.classList.contains('shape')) {
        selectedShape = e.target
        updateLayerList()
    }

    if (selectedTool === 'Rectangle') {
        isCreating = true
        let rectId = "Rect" + (Rectid++)
        const rect = document.createElement('div')
        rect.classList.add('base-rect')
        rect.classList.add('shape')
        rect.id = rectId
        rect.style.left = `${e.offsetX}px`
        rect.style.top = `${e.offsetY}px`
        rect.style.width = '100px'
        rect.style.height = '100px'
        rect.style.zIndex = ZInd++
        canvas.appendChild(rect)
        selectedTool = ""
        selectedShape = document.getElementById(rectId)
        resizeStartX = e.clientX
        resizeStartY = e.clientY
        resizeStartLeft = e.offsetX
        resizeStartTop = e.offsetY
        addCorners(selectedShape)
        updateLayerList()
        showPropertyPanel(selectedShape)
        saveToLocalStorage()
    }

    if (selectedTool === 'Circle') {
        let CircID = "Circ" + (Circid++)
        const rect = document.createElement('div')
        rect.classList.add('base-circ')
        rect.classList.add('shape')
        rect.id = CircID
        rect.style.left = `${e.offsetX}px`
        rect.style.top = `${e.offsetY}px`
        rect.style.zIndex = ZInd++
        canvas.appendChild(rect)
        selectedTool = ""
        selectedShape = document.getElementById(CircID)
        updateLayerList()
        showPropertyPanel(selectedShape)
        saveToLocalStorage()
    }

    if (selectedTool === 'Text') {
        let textId = "Text" + (TextId++)
        const textBox = document.createElement('div')
        textBox.classList.add('base-text')
        textBox.classList.add('shape')
        textBox.id = textId
        textBox.contentEditable = true
        textBox.style.left = `${e.offsetX}px`
        textBox.style.top = `${e.offsetY}px`
        textBox.style.zIndex = ZInd++
        canvas.appendChild(textBox)
        textBox.focus()
        textBox.spellcheck = false
        selectedTool = ""
        selectedShape = document.getElementById(textId)
        updateLayerList()
        showPropertyPanel(selectedShape)
        textBox.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        saveToLocalStorage()
    }

    if (selectedShape) {
        document.querySelectorAll('.shape').forEach(s => {
            s.classList.remove('selected-Shape');
        });
        document.querySelectorAll('.handle').forEach(h => h.remove());
        selectedShape.classList.add('selected-Shape')
        if (!selectedShape.classList.contains('base-text')) {
            addCorners(selectedShape)
        }
        selectedShape.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('handle')) {
                return
            }
            e.stopPropagation()
            isDragging = true
            startX = e.clientX
            startY = e.clientY
            initialLeft = parseInt(selectedShape?.style.left) || 0
            initialTop = parseInt(selectedShape?.style.top) || 0
            showPropertyPanel(selectedShape)
        })
        Array.from(selectedShape.children).forEach((e) => {
            e.addEventListener('mousedown', (elem) => {
                elem.stopPropagation();
                isResizing = true
                isDragging = false
                resizeStartX = elem.clientX
                resizeStartY = elem.clientY
                resizeStartHeight = selectedShape.offsetHeight
                resizeStartWidth = selectedShape.offsetWidth
                resizeStartLeft = selectedShape.offsetLeft
                resizeStartTop = selectedShape.offsetTop
                activeCorner = elem.target.classList[1];
                document.addEventListener('mousemove', onMouseResize)
                document.addEventListener('mouseup', () => {
                    document.removeEventListener('mousemove', onMouseResize)
                    if (isResizing) {
                        saveToLocalStorage()
                    }
                    isResizing = false
                })
            })
        })

    }
})

const onMouseResize = (e) => {
    if (!isResizing && !activeCorner) return
    const dx = e.clientX - resizeStartX
    const dy = e.clientY - resizeStartY

    if (activeCorner === 'tl') {
        selectedShape.style.width = `${resizeStartWidth - dx}px`
        selectedShape.style.height = `${resizeStartHeight - dy}px`
    }

    if (activeCorner === 'tr') {
        selectedShape.style.width = `${resizeStartWidth + dx}px`
        selectedShape.style.height = `${resizeStartHeight - dy}px`
    }
    if (activeCorner === 'bl') {
        selectedShape.style.width = `${resizeStartWidth - dx}px`
        selectedShape.style.height = `${resizeStartHeight + dy}px`
    }
    if (activeCorner === 'br') {
        selectedShape.style.width = `${resizeStartWidth + dx}px`
        selectedShape.style.height = `${resizeStartHeight + dy}px`
    }
}

const attachPropertyListeners = (element) => {
    const inputX = document.getElementById('input-x')
    const inputY = document.getElementById('input-y')
    const inputWidth = document.getElementById('input-width')
    const inputHeight = document.getElementById('input-height')
    const inputColor = document.getElementById('input-color')
    const rotation = document.getElementById('rotator')
    const inputFontSize = document.getElementById('input-font-size')
    const inputFontFamily = document.getElementById('input-font-family')
    const inputFontWeight = document.getElementById('input-font-weight')
    const inputTextColor = document.getElementById('input-text-color')

    inputX?.addEventListener('input', (e) => {
        element.style.left = e.target.value + 'px'
    })

    inputY?.addEventListener('input', (e) => {
        element.style.top = e.target.value + 'px'
    })

    inputWidth?.addEventListener('input', (e) => {
        element.style.width = e.target.value + 'px'
    })

    inputHeight?.addEventListener('input', (e) => {
        element.style.height = e.target.value + 'px'
    })

    inputColor?.addEventListener('input', (e) => {
        element.style.backgroundColor = e.target.value
    })

    rotation?.addEventListener('input', (e) => {
        element.style.transform = `rotate(${e.target.value}deg)`
    })

    inputFontSize?.addEventListener('input', (e) => {
        element.style.fontSize = e.target.value + 'px'
    })

    inputFontFamily?.addEventListener('change', (e) => {
        element.style.fontFamily = e.target.value
    })

    inputFontWeight?.addEventListener('change', (e) => {
        element.style.fontWeight = e.target.value
    })

    inputTextColor?.addEventListener('input', (e) => {
        element.style.color = e.target.value
    })
}

canvas.addEventListener('mousemove', (e) => {
    if (isDragging && selectedShape && !isResizing) {
        let newX = e.clientX - startX
        let newY = e.clientY - startY
        let newleft = initialLeft + newX
        let newtop = initialTop + newY
        selectedShape.style.left = `${newleft}px`
        selectedShape.style.top = `${newtop}px`
    }
})

document.addEventListener('mouseup', () => {
    if (isDragging) {
        saveToLocalStorage()
    }
    isDragging = false
})

document.addEventListener('keydown', (e) => {
    if (!selectedShape) return
    let currenttop = parseInt(getComputedStyle(selectedShape).top)
    let currentleft = parseInt(getComputedStyle(selectedShape).left)

    if (selectedShape && e.key === 'Delete') {
        selectedShape.remove()
        selectedShape = null
        updateLayerList()
        saveToLocalStorage()
    }
    if (selectedShape && e.key === 'ArrowUp') {
        selectedShape.style.top = `${currenttop - 5}px`
    }
    if (selectedShape && e.key === 'ArrowLeft') {
        selectedShape.style.left = `${currentleft - 5}px`
    }
    if (selectedShape && e.key === 'ArrowRight') {
        selectedShape.style.left = `${currentleft + 5}px`
    }
    if (selectedShape && e.key === 'ArrowDown') {
        selectedShape.style.top = `${currenttop + 5}px`
    }
})

const controlsToggle = document.getElementById('controls-toggle');
const controlsInfo = document.getElementById('controls-info');
let controlsVisible = false;

controlsToggle.addEventListener('click', () => {
    controlsVisible = !controlsVisible;
    if (controlsVisible) {
        controlsInfo.style.display = 'block';
        controlsToggle.style.display = 'none';
    } else {
        controlsInfo.style.display = 'none';
        controlsToggle.style.display = 'block';
    }
});

document.getElementById('canvas').addEventListener('click', () => {
    if (controlsVisible) {
        controlsInfo.style.display = 'none';
        controlsToggle.style.display = 'block';
        controlsVisible = false;
    }
});

