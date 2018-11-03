export class Usuario {
    id: number;
    username: String;
    password: String;
    nombres: String;
    apellidos: String;
    telefono: String;
    celular: String;
    correo: String;
    direccion: String;
    fecha_facimiento: Date = new Date();
    genero: String;
    estado: Boolean;
    rol_id: number;//deberia ser rol:Rol;
    constructor() { }
}