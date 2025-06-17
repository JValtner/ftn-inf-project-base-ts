import { UserResponse } from "../models/userResponse.model.js";

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
}