//функция getEmployees(),
//которая будет возвращать данные о сотрудниках из файла employees.json.
function getEmployees() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'employees.json', false);
  xhr.send();

  if (xhr.readyState === 4 && xhr.status === 200) {
    const employees = JSON.parse(xhr.responseText);
    return employees;
  } else {
    console.error(xhr.status);
  }
}

// функцию для заполнения таблицы сотрудников на странице.
function displayEmployees() {
  const employees = getEmployees();
  const tableBody = document.querySelector('#employees-table tbody');
  tableBody.innerHTML = '';

  employees.forEach(function(employee) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${employee.id}</td>
      <td>${employee.name}</td>
      <td>${employee.position}</td>
      <td>${employee.phone}</td>
      <td>
        <button class="btn btn-outline-primary btn-sm edit-employee-btn" data-id="${employee.id}">Edit</button>
        <button class="btn btn-outline-danger btn-sm delete-employee-btn" data-id="${employee.id}">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}
