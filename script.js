// расписание на месяц
let schedule = {};

function loadSchedule() {
  const now = new Date();
  const fileName = `${now.getMonth()+1}-${now.getFullYear()}.json`;
  fetch(fileName)
    .then(response => response.json())
    .then(data => schedule = data)
    .catch(error => console.error(`Failed to load schedule from ${fileName}: ${error}`));
}

loadSchedule();
//добавления, редактирования и удаления сотрудников
function addEmployee(line, name) {
  if (!schedule[line]) {
    schedule[line] = [];
  }
  schedule[line].push(name);
}

function editEmployee(line, index, name) {
  if (schedule[line] && index < schedule[line].length) {
    schedule[line][index] = name;
  }
}

function deleteEmployee(line, index) {
  if (schedule[line] && index < schedule[line].length) {
    schedule[line].splice(index, 1);
  }
}

//сохраняет текущее расписание в файл JSON
function saveSchedule() {
  const now = new Date();
  const fileName = `${now.getMonth()+1}-${now.getFullYear()}.json`;
  const jsonData = JSON.stringify(schedule);
  const blob = new Blob([jsonData], {type: "application/json"});
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

//обработчики событий для кнопок добавления,
//редактирования и удаления сотрудников, а также для кнопки сохранения расписания
document.getElementById("add-employee-btn").addEventListener("click", function() {
  const line = document.getElementById("employee-line-select").value;
  const name = document.getElementById("employee-name-input").value;
  const date = document.getElementById("employee-date-input").value;
  
  // Проверяем, что все поля заполнены
  if (line && name && date) {
    // Получаем текущее расписание из localStorage
    let schedule = JSON.parse(localStorage.getItem(currentMonth));
    if (!schedule) {
      schedule = {};
    }
    
    // Создаем объект сотрудника и добавляем его в расписание
    const employee = {name: name, date: date};
    if (!schedule[line]) {
      schedule[line] = [employee];
    } else {
      schedule[line].push(employee);
    }
    
    // Обновляем расписание в localStorage
    localStorage.setItem(currentMonth, JSON.stringify(schedule));
    
    // Очищаем поля формы и обновляем расписание на странице
    document.getElementById("employee-name-input").value = "";
    document.getElementById("employee-date-input").value = "";
    updateSchedule();
  } else {
    alert("Пожалуйста, заполните все поля");
  }
});
displayEmployees();
//Если файл еще не существует,
// то нужно его создать вручную или с помощью скрипта, например
const now = new Date();
const fileName = `${now.getMonth()+1}-${now.getFullYear()}.json`;
const initialSchedule = { /* объект с данными о расписании на месяц */ };

fetch(fileName, {
  method: 'POST',
  body: JSON.stringify(initialSchedule),
  headers: {
    'Content-Type': 'application/json'
  }
}).then(response => console.log(`Schedule file ${fileName} created: ${response.status}`))
  .catch(error => console.error(`Failed to create schedule file ${fileName}: ${error}`));
//
const fs = require('fs');

// функция для записи в файл
function writeToFile(data) {
  const jsonString = JSON.stringify(data);
  fs.writeFile('employees.json', jsonString, (err) => {
    if (err) {
      console.log('Error writing to file:', err);
    } else {
      console.log('Data saved to file!');
    }
  });
}

// пример использования функции
const employees = [
  { name: 'John Doe', position: 'Manager' },
  { name: 'Jane Smith', position: 'Developer' }
];
writeToFile(employees);
