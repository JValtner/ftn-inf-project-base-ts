import { User } from "../models/user.model.js";
import { UserResponse } from "../models/userResponse.model.js";
import { UserFormData } from "../models/userFormData.model.js";


export class UserService {
    private apiUrl: string;

    constructor() {
        this.apiUrl = 'http://localhost:20181/api/korisnik';
    }

getAll(): Promise<UserResponse> {
        return fetch(this.apiUrl)
            .then(response => {
                if (!response.ok) {
                    return response.text().then(errorMessage => {
                        throw { status: response.status, message: errorMessage }
                    })
                }
                return response.json()
            })
            .then((response: UserResponse) => {
                return response;
            })
            .catch(error => {
                console.error('Error:', error.status)
                throw error
            });
    }



addNew(formData: UserFormData): Promise<User> {
        return fetch(this.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(errorMessage => {
                        throw { status: response.status, message: errorMessage }
                    })
                }
                return response.json()
            })
            .then((user: User) => {
                return user;
            })
            .catch(error => {
                console.error('Error:', error.status)
                throw error
            });
    }


}

