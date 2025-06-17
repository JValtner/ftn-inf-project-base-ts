import { Group } from "./group.model";

export interface User{
    id: number;
    korisnickoIme: string; 
    ime: string;
    prezime: string;
    datumRodjenja: string;
    datumOsnivanja:string;
    grupeKorisnika:Group[];
}
    
