import { UserService } from "./services/user.service.js";

const userService = new UserService()

function renderData(): void {
userService.getAll()
.then(users => {
  const table = document.querySelector('table tbody');

  if (!table) {
    console.error('Table body not found');
    return;
  }

  // za svaku knjigu dodajemo po red u tabeli
  for (let i = 0; i < users.length; i++) {
    // kreiramo novi red
    const newRow = document.createElement('tr');

    // kreiramo ćeliju za Id
    const cell1 = document.createElement('td');
    cell1.textContent = users[i].id.toString();
    newRow.appendChild(cell1);

    // kreiramo ćeliju za korisnicko ime
    const cell2 = document.createElement('td');
    cell2.textContent = users[i].korisnickoIme;
    newRow.appendChild(cell2);

    // kreiramo ćeliju za Ime
    const cell3 = document.createElement('td');
    cell3.textContent = users[i].ime;
    newRow.appendChild(cell3);

    // kreiramo ćeliju za Prezime
    const cell4 = document.createElement('td');
    cell4.textContent = users[i].prezime;
    newRow.appendChild(cell4);

    // kreiramo ćeliju za Datum rodjenja
    const cell5 = document.createElement('td');
    cell5.textContent = users[i].datumRodjenja.toString();
    newRow.appendChild(cell5);

    // dodajemo red u tabelu
    table.appendChild(newRow);
  }
})
.catch(error => {
  console.error(error.status, error.message);
});
}

renderData();