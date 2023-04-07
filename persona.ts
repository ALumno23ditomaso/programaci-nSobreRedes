
 export class persona{
    id: number;
    name: string;
    altura: number;
    peso: number;

    constructor(_id: number, _name: string, altura: number, peso: number){
       this.id=_id;
       this.name=_name;
       this.altura= altura;     
       this.peso= peso;
    }
}