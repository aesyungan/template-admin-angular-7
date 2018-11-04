let port: number = 3000;
let host: string = 'http://localhost';
export let config = {
    port: port,
    host: host,
    url: `${host}:${port}`
}
export let security = {
    AUTH_USUARIO: 'key_user_auth',
    AUTH_USUARIO_ROL: 'key_user_rol_auth'
}

//others config
//config for alert
export var Alerts = {
    timeSuccess: 2000,
    timeError: 60000,
    timeErrorInput: 2000,
    titleDeleteQuestion: 'Eliminar',
    titleRed: 'Red',
    titleErrorAutentication: 'Autenticación.',
    textRedError: 'No se puede conectar al servidor!',

    textErrorAutenticationDetails: 'Error de usuario o contraseña',
    textRedErrorunknown: 'Ocurrio un error Inesperado al conectarse con el servidor',
    textDeleteQuestion: "¿Esta Seguro de Eliminar?",

    iconError: 'error',
    iconInfo: 'info',
    iconSuccess: 'success',
    IconWarning: 'warning'
}
//consiguracion de parametros para alertas
//el mensaje es cualquier mensaje que quiera mostrar en la alerta si manda en blanco o nulo ocupara valores por defecto
export function configAlertErrorRed(error: any) {

    return {
        title: error.status === 404 ? error.error.title : error.status == 401 || error.status == 400 ? error.error.error : Alerts.titleRed,
        text: error.status === 404 ? JSON.stringify(error.error.message) : error.status == 401 || error.status == 400 ? error.error.error_description : error.status == 0 ? Alerts.textRedError : Alerts.textRedErrorunknown,
        icon: Alerts.iconError,
        timer: Alerts.timeError,
        button: true
    }
}
export function configDatoExiste() {
    return {
        title: "Dato !",
        text: "Ya Existe",
        icon: "error",
        button: "OK!",
    }
}

export function configAlertErrorUserAndPassword(error: any) {
    return {
        title: error.status == 400 || error.status == 401 ? Alerts.titleErrorAutentication : Alerts.titleRed,
        text: error.status == 400 || error.status == 401 ? Alerts.textErrorAutenticationDetails : Alerts.textRedError,
        icon: Alerts.iconError,
        timer: Alerts.timeError,
        button: true
    }
}
export function configAlert(data: any) {
    return {
        title: data.title,
        text: data.message,
        icon: data.statusHttp == true ? Alerts.iconSuccess : Alerts.iconError,
        timer: data.statusHttp == true ? Alerts.timeSuccess : Alerts.timeError,
        button: data.statusHttp == true ? false : true
    }
}

export function configAlertDeleteQuestion() {
    return {
        title: Alerts.titleDeleteQuestion,
        text: Alerts.textDeleteQuestion,
        icon: Alerts.IconWarning,
        buttons: true,
        dangerMode: true,
    }
}
export function configAlertContinueQuestion(title: string, text: string) {
    return {
        title: title,
        text: text,
        icon: Alerts.IconWarning,
        buttons: true,
        dangerMode: true,
    }
}