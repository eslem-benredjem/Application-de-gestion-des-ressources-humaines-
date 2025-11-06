
export enum Role {
  ADMIN = "ADMIN",
  RESPONSABLE = "RESPONSABLE",
  EMPLOYE = "EMPLOYE",
}


export class UserList {
    id!: number;
    cin!: string;
    nom!: string;
    prenom!: string;
    adresseMail!: string;
    role!: Role;
   genre: any;

}
