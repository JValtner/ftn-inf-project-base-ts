import { UserFormData } from "../models/userFormData.model.js";
import { UserService } from "../services/user.service.js";


const userService = new UserService()



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

    userService.addNew(formData)
        .then(() => {
            window.location.href = '../index.html';
        })
        .catch(error => {
            console.error(error.status, error.message);
            console.log(`Greška ${error.status}: ${error.message}`);
        });
}


    const button = document.querySelector("#form-submit-Btn");
    if (button) {
        button.addEventListener("click", submit)
    }

