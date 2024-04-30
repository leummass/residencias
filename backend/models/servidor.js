class Servidor {
    constructor(
        Id,
        Nombre,
        Descripcion,
        Tipo,
        FechaModificacion,
        NoColaborador
    ) {
        this.Id = Id;
        this.Nombre = Nombre;
        this.Descripcion = Descripcion;
        this.Tipo = Tipo;
        this.FechaModificacion = FechaModificacion;
        this.NoColaborador = NoColaborador;
    }
}

module.exports = Servidor;