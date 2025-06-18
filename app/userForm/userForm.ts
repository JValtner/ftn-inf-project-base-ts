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
            }).catch(error => {
                console.error(error.status, error.text);
            })
    }
}

function submit(): void {
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
                window.location.href = '../index.html'
            }).catch(error => {
                console.error(error.status, error.text);
            })
    } else {
        userService.addNew(formData)
        .then(() => {
            window.location.href = '../index.html';
        })
        .catch(error => {
            console.error(error.status, error.message);
            console.log(`Greška ${error.status}: ${error.message}`);
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

document.addEventListener('DOMContentLoaded', ()=>{
    initializeForm();
    const button = document.querySelector("#form-submit-Btn");
    if (button) {
        button.addEventListener("click", submit)
    }
})
