/** TODO: Programar enviar solo un scaneo
 *
 *  @autor Isaac Bustamante
 *
 * Este modelo nos servira para el registro de los scaneos.
 *
 * Parametros
 * @param  {String} format [Es el formato del escaneo]
 * @param {String} text [El el resultado del scaneo]
 * @param {String} type [Determina si es una pagina o una ubicacion]
 * @param {String} icon [Icono que identificara al registro]
 * @param {Date} created [Es la fecha de creacion del scaneo]
 * @method [void] determinarTipo [Funcion que determina el type y el icon]
 */
export class Registro {

    public format: string;
    public text: string;
    public type: string;
    public icon: string;
    public created: Date;

    constructor(format: string, text: string){
        this.format = format;
        this.text = text;

        this.created = new Date();

        this.determinarTipo();
    }

    private determinarTipo(){
        const inicioTexto = this.text.substr(0, 4);
        console.log('Tipo', inicioTexto);

        switch (inicioTexto) {
            case 'http':
                this.type = 'http';
                this.icon = 'globe';
                break;
            case 'geo:':
                this.type = 'geo';
                this.icon = 'location';
                break;
            default:
                this.type = 'No reconocido';
                this.icon = 'create';
        }
    }
}
