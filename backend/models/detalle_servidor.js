class Detalle_Servidor {
    constructor(
        Id,
        IdServidor,
        IpDireccion,
        Dns,
        Tipo,
        NoVersion,
        Estatus,
        Hostname,
        SistemaOperativo,
        VersionSO,
        VersionBD,
        FechaModificacion,
        NoColaborador
    ) {
        this.Id = Id;
        this.IdServidor = IdServidor;
        this.IpDireccion = IpDireccion;
        this.Dns = Dns;
        this.Tipo = Tipo;
        this.NoVersion = NoVersion;
        this.Estatus = Estatus;
        this.Hostname = Hostname;
        this.SistemaOperativo = SistemaOperativo;
        this.VersionSO = VersionSO;
        this.VersionBD = VersionBD;
        this.FechaModificacion = FechaModificacion;
        this.NoColaborador = NoColaborador;
    }
}

module.exports = Detalle_Servidor