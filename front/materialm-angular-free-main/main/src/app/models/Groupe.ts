export class Group{
    id!: number;
    name!: string;
    supervisorId!:number;

    constructor (id : number ,name: string, supervisorId: number){
        this.id = id ;
        this.name = name;
        this.supervisorId = supervisorId;
    }

}