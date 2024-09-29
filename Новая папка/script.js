const dataForm = document.getElementById('dataForm');
const inputField = document.getElementById('inputField');
const savedDataList = document.getElementById('savedDataList');
const addSelectedButton = document.getElementById('addSelectedButton');
const dataTable = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
let savedData = JSON.parse(localStorage.getItem('savedData')) || [];
let tableData = JSON.parse(localStorage.getItem('tableData')) || [];

updateSavedDataList();
updateTable();

dataForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputValue = inputField.value.trim();
    savedData.push(inputValue);
    localStorage.setItem('savedData', JSON.stringify(savedData));
    updateSavedDataList();
    inputField.value = '';
});

savedDataList.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('selected');
    }
});

addSelectedButton.addEventListener('click', () => {
    const selectedItems = savedDataList.querySelectorAll('.selected');
    selectedItems.forEach(item => {
        const newRow = dataTable.insertRow();
        const newCell1 = newRow.insertCell(0);
        const newCell2 = newRow.insertCell(1);

        newCell1.textContent = item.textContent;
        newCell2.textContent = item.textContent;

        tableData.push({ cell1: item.textContent, cell2: item.textContent });
        localStorage.setItem('tableData', JSON.stringify(tableData));
        localStorage.setItem('savedData', JSON.stringify(savedData));
    });
});

function updateSavedDataList() {
    savedDataList.innerHTML = '';
    savedData.forEach(data => {
        const li = document.createElement('li');
        li.textContent = data;
        savedDataList.appendChild(li);
    });
}

function updateTable() {
    dataTable.innerHTML = '';
    tableData.forEach(data => {
        const newRow = dataTable.insertRow();
        const newCell1 = newRow.insertCell(0);
        const newCell2 = newRow.insertCell(1);
        newCell1.textContent = data.cell1;
        newCell2.textContent = data.cell2;
    });
}