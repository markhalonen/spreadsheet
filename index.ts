let numColumns = 3
let numRows = 2
let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXZY'

document.getElementById("addRowButton").onclick = e => {
    numRows = numRows + 1
    render()
}

document.getElementById("addColumnButton").onclick = e => {
    numColumns = numColumns + 1
    render()
}

function render() {

    let spreadsheet = document.getElementById("spreadsheet")

    spreadsheet.style.gridTemplateColumns = Array(numColumns).fill('200px').join(' ')

    let html = Array<String>(numColumns * numRows).fill('').map((_, idx) => `<input class="box a" id=cell_${idx}></input>`).join('')
    spreadsheet.innerHTML = html

    Array(numColumns * numRows).fill(0).forEach((_, idx) => {
        let cell = document.getElementById(`cell_${idx}`) as HTMLInputElement

        cell.addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                if (cell.value.charAt(0) === "=") {
                    let calculationInput = cell.value.slice(1)

                    // de-reference A1, B1, C1 etc
                    calculationInput = calculationInput.split(' ').join('')
                    calculationInput = calculationInput.split('+').map(el => {
                        let letterIndex = letters.indexOf(el.charAt(0))
                        let row = parseInt(el.charAt(1))
                        if (letterIndex > -1) {
                            let cellIdx = (row - 1) * numColumns + letterIndex
                            console.log(cellIdx)
                            return (document.getElementById(`cell_${cellIdx}`) as HTMLInputElement).value
                        }
                        return el
                    }).join('+')
                    cell.value = eval(calculationInput)
                    cell.blur()
                }
            }
        });
    })
}

render()