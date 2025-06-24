import { UserResponse } from "./models/userResponse.model.js";
import { UserService } from "./services/user.service.js";

const userService = new UserService()

function renderData(): void {
userService.getAll()
.then((response: UserResponse) => {
  const table = document.querySelector('table tbody');

  if (!table) {
    console.error('Table body not found');
    return;
  }


  for (let i = 0; i < response.data.length; i++) {
    
    const newRow = document.createElement('tr');

    const cell1 = document.createElement('td');
    cell1.textContent = response.data[i].id.toString();
    newRow.appendChild(cell1);

    const cell2 = document.createElement('td');
    cell2.textContent = response.data[i].korisnickoIme;
    newRow.appendChild(cell2);

    const cell3 = document.createElement('td');
    cell3.textContent = response.data[i].ime;
    newRow.appendChild(cell3);

    const cell4 = document.createElement('td');
    cell4.textContent = response.data[i].prezime;
    newRow.appendChild(cell4);

    const cell5 = document.createElement('td');
    cell5.textContent = formattedDate(response.data[i].datumRodjenja.toString());
    newRow.appendChild(cell5);

    const cell6 = document.createElement('td');
    cell6.textContent = response.data[i].grupeKorisnika.map(g => g.ime).join(', ');
    newRow.appendChild(cell6);

    //Edit Button
   const cell7 = document.createElement('td');

    const tooltipDivEdit = document.createElement('div');
    tooltipDivEdit.className = 'tooltip left';

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.style.width = 'auto';

    const userId = response.data[i].id;
    editButton.onclick = () => {
      window.location.href = `./userForm/userForm.html?id=${userId}`;
    };

    const tooltipSpanEdit = document.createElement('span');
    tooltipSpanEdit.className = 'tooltiptext';
    tooltipSpanEdit.textContent = 'Dodaj novog korisnika';

    tooltipDivEdit.appendChild(editButton);
    tooltipDivEdit.appendChild(tooltipSpanEdit);

    cell7.appendChild(tooltipDivEdit);
    newRow.appendChild(cell7);

    //Delete Button
    const cell8 = document.createElement('td');

    const tooltipDivDel = document.createElement('div');
    tooltipDivDel.className = 'tooltip right';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.style.width = 'auto';

    deleteButton.onclick = () => {
      userService.delete(userId.toString())
        .then(() => {
          newRow.remove();
        })
        .catch(error => {
          console.error(error.status, error.text);
        });
    };

    const tooltipSpanDel = document.createElement('span');
    tooltipSpanDel.className = 'tooltiptext';
    tooltipSpanDel.textContent = 'Obriši korisnika';

    tooltipDivDel.appendChild(deleteButton);
    tooltipDivDel.appendChild(tooltipSpanDel);

    cell8.appendChild(tooltipDivDel);
    newRow.appendChild(cell8);

    
    table.appendChild(newRow);
    userService.attachTooltipTimeouts();
  }
})
.catch(error => {
  console.error(error.status, error.message);
});
}

function formattedDate(dateString: string): string {
  const rawDate = new Date(dateString);
  return rawDate.toLocaleDateString('sr-RS', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}



window.addEventListener('DOMContentLoaded', () => {
  renderData();
});