class Servicio {
    constructor(Id, Nombre, UrlProduccion, IpProduccion, UrlDesarrollo, IpDesarrollo, UrlTester, IpTester, Dns, Usuario, Password, FechaModificacion, NoColaborador) {
      this.Id = Id;
      this.Nombre = Nombre;
      this.UrlProduccion = UrlProduccion;
      this.IpProduccion = IpProduccion;
      this.UrlDesarrollo = UrlDesarrollo;
      this.IpDesarrollo = IpDesarrollo;
      this.UrlTester = UrlTester;
      this.IpTester = IpTester;
      this.Dns = Dns;
      this.Usuario = Usuario;
      this.Password = Password;
      this.FechaModificacion = FechaModificacion
      this.NoColaborador = NoColaborador;
    }
}

module.exports = Servicio;