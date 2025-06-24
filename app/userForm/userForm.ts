import { UserFormData } from "../models/userFormData.model.js";
import { UserService } from "../services/user.service.js";


const userService = new UserService()

function initializeForm(): void {
    const queryString = window.location.search;
    const urlparams = new URLSearchParams(queryString);
    const id = urlparams.get('id');

    if (id) {
        userService.getById(id)
            .then(user => {
                (document.querySelector('#korisnickoIme') as HTMLInputElement).value = user.korisnickoIme;
                (document.querySelector('#ime') as HTMLInputElement).value = user.ime;
                (document.querySelector('#prezime') as HTMLInputElement).value = user.prezime;
                (document.querySelector('#datumRodjenja') as HTMLInputElement).value = formatDate(user.datumRodjenja);
                 //validate prefilled data on Edit option
        fieldArray.forEach(id => validate(id));
            }).catch(error => {
                console.error(error.status, error.text);
            })
    }
}

function submit(event:Event): void {
    event.preventDefault(); 
    
    const userName = (document.querySelector('#korisnickoIme') as HTMLInputElement).value;
    const name = (document.querySelector('#ime') as HTMLInputElement).value;
    const surname = (document.querySelector('#prezime') as HTMLInputElement).value;
    const dateOfBirth = (document.querySelector('#datumRodjenja') as HTMLInputElement).value;

    if (!userName || !name || !surname || !dateOfBirth) {
        alert("All fields are required!");
        return;
    }

    const formData: UserFormData = {
    korisnickoIme: userName,
    ime: name,
    prezime: surname,
    datumRodjenja: new Date(dateOfBirth).toISOString()
    };

    const queryString = window.location.search;
    const urlparams = new URLSearchParams(queryString);
    const id = urlparams.get('id');

     if (id) {
      userService.update(id, formData)
        .then(() => {
          statusMsg('edit');
          setTimeout(() => {
            window.location.href = '../index.html';
          }, 4000); // delay must be longer than statusMsg update
        })
        .catch(error => {
          console.error(error.status, error.text);
        });
    } else {
      userService.addNew(formData)
        .then(() => {
          statusMsg("new");
          setTimeout(() => {
            window.location.href = '../index.html';
          }, 4000);
        })
        .catch(error => {
          console.error(error.status, error.message);
        });
}

}

function formatDate(isoDateString: string): string {
  const date = new Date(isoDateString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}   

function disableSubmit(): void {
  const btn = document.getElementById('form-submit-Btn') as HTMLButtonElement;
  if (btn) {
    btn.disabled = true;
  }
}

//validacija forme
const fieldArray: string[] = ['korisnickoIme', 'ime', 'prezime', 'datumRodjenja'];
const fieldValid: { [key: string]: boolean } = {
  korisnickoIme: false,
  ime: false,
  prezime: false,
  datumRodjenja: false
};

function validate(id: string): void {
  const input = document.getElementById(id) as HTMLInputElement;
  const errSpan = document.getElementById(`${id}-err`) as HTMLElement;
  if (!input || !errSpan) return;

  let errorMsg = '';
  const val = input.value.trim();

  if (id === 'korisnickoIme' || id === 'ime' || id === 'prezime') {
    if (val.length < 3) {
      errorMsg = 'Polje mora sadržati bar 3 karaktera.';
    }
  } else if (id === 'datumRodjenja') {
    const inputDate = new Date(val);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    if (!(inputDate < now)) {
      errorMsg = 'Datum mora biti u proslosti.';
    }
  }

  if (errorMsg) {
  fieldValid[id] = false;
  input.style.border = '2px solid red';
  errSpan.textContent = errorMsg;
  errSpan.classList.add('visible');
} else {
  fieldValid[id] = true;
  input.style.border = '';
  errSpan.textContent = '';
  errSpan.classList.remove('visible');
}

  validateForm();
}

function validateForm(): void {
  const btn = document.getElementById('form-submit-Btn') as HTMLButtonElement;
  const allValid = fieldArray.every(fieldId => {
    const input = document.getElementById(fieldId) as HTMLInputElement;
    return input && input.value.trim() !== '' && fieldValid[fieldId];
  });

  btn.disabled = !allValid;
}
function statusMsg(action: string): void {
  const status = document.getElementById('status-msg') as HTMLParagraphElement;
  const text = document.getElementById('status-text') as HTMLSpanElement;
  const bar = status.querySelector('.status-bar') as HTMLDivElement;

  status.style.display = 'block';
  text.textContent = 'Postupak u toku...';

  bar.classList.remove('status-bar');
  void bar.offsetWidth;
  bar.classList.add('status-bar');

  setTimeout(() => {
    text.textContent = action === "new"
      ? "Korisnik je uspešno kreiran."
      : "Korisnik je uspešno izmenjen.";
  }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  initializeForm();
  userService.attachTooltipTimeouts();

  // Attach onblur and on input validation for each input field
  fieldArray.forEach(id => {
  const input = document.getElementById(id) as HTMLInputElement;
  if (input) {
    input.addEventListener('blur', () => validate(id));// after leaving the field
    input.addEventListener('input', () => validate(id)); // live validation
  }
});

  const form = document.getElementById('form-data') as HTMLFormElement;
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      disableSubmit();
      fieldArray.forEach(id => validate(id));
      submit(event);
    });
  }
});

