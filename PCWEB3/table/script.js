//alert("Hi");

function generateTable() {
    var rows = 20;
    var cols = 40;

    // Step 1: get the <table id="newTable">
    var table = document.getElementById('newTable');

    // 2: make a for loop through either rows or cols
    for (var i = 0; i < rows; i++) {
        // 3: Create a new row
        var row = document.createElement('tr');
        // 4: Append that row to the table
        table.appendChild(row);

        // 5: Now loop through either rows or cols to add the cells
        for (var j = 0; j < cols; j++) {
            // Create a cell element, that's a <td>, and append it to the row
            var cell = document.createElement("td");

            // 6: Append to the row
            row.appendChild(cell);

            // Give the cell some text
            cell.innerText = "potato";
        }
    }
}
