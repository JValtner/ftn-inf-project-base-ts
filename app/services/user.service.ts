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

    getById(id: string): Promise<User> {
            return fetch(`${this.apiUrl}/${id}`)
                .then(response => {
                    if (!response.ok) {
                        return response.text().then(errorMessage => {
                            throw { status: response.status, message: errorMessage }
                        })
                    }
                    return response.json();
                }).then((user: User) => {
                    return user;
                }).catch(error => {
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

    update(id: string, formData: UserFormData): Promise<User> {
            return fetch(`${this.apiUrl}/${id}`, {
                method: 'PUT',
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
    delete(id :string): Promise<User>{
        return fetch(`${this.apiUrl}/${id}`, {method: 'DELETE'})
            .then(response => {
                if (!response.ok) {
                    return response.text().then(errorMessage => {
                        throw { status: response.status, message: errorMessage }
                    })
                }
                const contentLength = response.headers.get('content-length');
                if (response.status === 204 || contentLength === '0') {
                    return; // nothing to return
                }
                return response.json()
                })
            .catch(error => {
                    const status = error.status ?? 'Network';
                    const message = error.message ?? error.toString();
                    console.error(`Error [${status}]: ${message}`);
                    throw { status, message }; // rethrow for UI to catch
            });   
    }
    attachTooltipTimeouts() {
    document.querySelectorAll('.tooltip').forEach(tooltip => {
        const tooltipText = tooltip.querySelector('.tooltiptext') as HTMLElement;
        if (!tooltipText) return;

        let timeoutId: number | null = null;

        tooltip.addEventListener('mouseenter', () => {
        timeoutId = window.setTimeout(() => {
            tooltipText.style.visibility = 'visible';
            tooltipText.style.opacity = '1';
        }, 500); // show tooltip after 500ms
        });

        tooltip.addEventListener('mouseleave', () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        tooltipText.style.visibility = 'hidden';
        tooltipText.style.opacity = '0';
        });
    });
    }
}

