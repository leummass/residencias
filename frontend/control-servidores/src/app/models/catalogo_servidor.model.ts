export class  Catalogo_Servidor {
    constructor(
        public Id: number,
        public Nombre: string,
        public Tipo: string,
        public Descripcion: string,
        public FechaModificacion: string,
        public NoColaborador: string,
    ) { }
    // retornaID(){
    //     return this.ID;
    // }
}