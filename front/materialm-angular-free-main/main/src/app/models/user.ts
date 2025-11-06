
export  enum Role{
    ADMIN = "ADMIN",
    RESPONSABLE = "RESPONSABLE",
    EMPLOYEES = "EMPLOYE",
}

export class User{
     id!: number;
     cin!: string;
     nom!: string;
     prenom!: string;
     dateNaissance!: Date;
     genre!: String;
     adresse!: string;
     numeroTelephone!: string;
     adresseMail!: string;
     motDePasse!: string;
     dateEmbauche!: string;
     role!: Role;
     groupId!: number;


    get _id(): number {
        return this.id;
    }

    set _id(value: number) {
        this.id = value;
    }

    constructor() {
    }


    get _groupId(): number {
        return this.groupId;
    }

    set _groupId(value: number) {
        this.groupId = value;
    }

    get _cin(): string {
        return this.cin;
    }

    set _cin(value: string) {
        this.cin = value;
    }

    get _nom(): string {
        return this.nom;
    }

    set _nom(value: string) {
        this.nom = value;
    }

    get _prenom(): string {
        return this.prenom;
    }

    set _prenom(value: string) {
        this.prenom = value;
    }

    get _dateNaissance(): Date {
        return this.dateNaissance;
    }

    set _dateNaissance(value: Date) {
        this.dateNaissance = value;
    }

    get _genre(): String {
        return this.genre;
    }

    set _genre(value: String) {
        this.genre = value;
    }

    get _adresse(): string {
        return this.adresse;
    }

    set _adresse(value: string) {
        this.adresse = value;
    }

    get _numeroTelephone(): string {
        return this.numeroTelephone;
    }

    set _numeroTelephone(value: string) {
        this.numeroTelephone = value;
    }

    get _adresseMail(): string {
        return this.adresseMail;
    }

    set _adresseMail(value: string) {
        this.adresseMail = value;
    }

    get _motDePasse(): string {
        return this.motDePasse;
    }

    set _motDePasse(value: string) {
        this.motDePasse = value;
    }

    get _dateEmbauche(): string {
        return this.dateEmbauche;
    }

    set _dateEmbauche(value: string) {
        this.dateEmbauche = value;
    }

    get _role(): Role {
        return this.role;
    }

    set _role(value: Role) {
        this.role = value;
    }
}
