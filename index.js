var numColumns = 3;
var numRows = 2;
var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXZY';
document.getElementById("addRowButton").onclick = function (e) {
    numRows = numRows + 1;
    render();
};
document.getElementById("addColumnButton").onclick = function (e) {
    numColumns = numColumns + 1;
    render();
};
function render() {
    var spreadsheet = document.getElementById("spreadsheet");
    spreadsheet.style.gridTemplateColumns = Array(numColumns).fill('200px').join(' ');
    var html = Array(numColumns * numRows).fill('').map(function (_, idx) { return "<input class=\"box a\" id=cell_" + idx + "></input>"; }).join('');
    spreadsheet.innerHTML = html;
    Array(numColumns * numRows).fill(0).forEach(function (_, idx) {
        var cell = document.getElementById("cell_" + idx);
        cell.addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                if (cell.value.charAt(0) === "=") {
                    var calculationInput = cell.value.slice(1);
                    // de-reference A1, B1, C1 etc
                    calculationInput = calculationInput.split(' ').join('');
                    calculationInput = calculationInput.split('+').map(function (el) {
                        var letterIndex = letters.indexOf(el.charAt(0));
                        var row = parseInt(el.charAt(1));
                        if (letterIndex > -1) {
                            var cellIdx = (row - 1) * numColumns + letterIndex;
                            console.log(cellIdx);
                            return document.getElementById("cell_" + cellIdx).value;
                        }
                        return el;
                    }).join('+');
                    cell.value = eval(calculationInput);
                    cell.blur();
                }
            }
        });
    });
}
render();
