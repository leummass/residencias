export class Catalogo_DetalleServidor {
    constructor(
        public Id: number,
        public IdServidor: number,
        public IpDireccion: string,
        public Dns: string,
        public Tipo: string,
        public NoVersion: string,
        public Estatus: string,
        public Hostname: string,
        public SistemaOperativo: string,
        public VersionSO: string,
        public VersionBD: string,
        public FechaModificacion: string,
        public NoColaborador: string
    ) { }
}