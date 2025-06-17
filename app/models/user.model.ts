import { Group } from "./group.model.js";

export interface User{
    id: number;
    korisnickoIme: string; 
    ime: string;
    prezime: string;
    datumRodjenja: string;
    grupeKorisnika?:Group[];
}
    
