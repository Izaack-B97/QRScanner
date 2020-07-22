import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';
import { Storage } from '@ionic/storage';
import { NavController, ToastController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File } from '@ionic-native/file/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

/**
 * FIXME: Corregir el formato del csv, esta mal formateado al enviarse en un archivo csv  
 */

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  fileName = 'registros.csv';
  registros: Registro[] = [];

  constructor(
    private storage: Storage,
    private navCtlr: NavController,
    private iab: InAppBrowser,
    private file: File,
    private emailComposer: EmailComposer,
    private  socialSharing: SocialSharing,
    private toastCtrl: ToastController) {

    this.cargarStorage();

  }

  // Guardara los registros
  async guardarRegistro(format: string, text: string){

    await this.cargarStorage();

    const nuevoRegistro = new Registro(format, text);
    this.registros.unshift(nuevoRegistro);
    console.log(this.registros);

    // Guardamos en el storage
    this.storage.set('guardados', this.registros);

    this.abrirRegistro(nuevoRegistro);
  }

  // Cargamos el storage
  async cargarStorage(){
    this.registros = await this.storage.get('guardados') || [];
  }

  // Abrir el registro
  abrirRegistro(registro: Registro){
    // El navController nos permite navegar entre paginas
    this.navCtlr.navigateForward('/tabs/tab2');
    let ruta = '';
    switch (registro.type) {
      case 'http':
        ruta = registro.text;
        this.iab.create( ruta, '_system'); // abre el navegador por default del disposito
        break;
      case 'geo':
        ruta = registro.text;
        this.navCtlr.navigateForward(`/tabs/tab2/mapa/${ruta}`);
        break;
    }
  }

  // Enviaremos los registros
  enviarCorreo(){
    const arrTemp = [];
    const titulos = 'Tipo, Formato, Creado en, Texto';

    if (this.registros) {
      this.presentToast('No hay registros en el historia', 'danger');
    }

    arrTemp.push(titulos);
    this.registros.forEach(registro => {
      const linea = `${registro.type}, ${registro.format}, ${registro.created}, ${registro.text.replace(',', ' ')}`;
      arrTemp.push(linea);
    });
    // console.log(arrTemp.join(','));
    // console.log(arrTemp);

    this.crearArchivoFisico(arrTemp.join());
  }

  crearArchivoFisico(text: string) {
    // Checamos si existe el archv
    this.file.checkFile( this.file.dataDirectory, this.fileName)
      .then(existe => {
        console.log('Existe el archivo', true);
        return this.escribirArchivo(text); // Actualizamos el archivo
      })
      .catch(err => {
        return this.file.createFile(this.file.dataDirectory, this.fileName, false) // Creamos el archivo si no existe
          .then(creado => this.escribirArchivo(text))
          .catch(err2 => console.log('Error al crear el archivo', err2));
      });
  }

  async escribirArchivo(text: string){
    await this.file.writeExistingFile(this.file.dataDirectory, this.fileName, text);
    const archivo = `${this.file.dataDirectory}${this.fileName}`;
    // console.log('Archivo creado');
    // console.log(this.file.dataDirectory + this.fileName);

    const email = {
      to: 'izaack.97@gmail.com',
      // cc: 'erika@mustermann.de',
      // bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
        archivo
        // 'file://img/logo.png',
        // 'res://icon.png',
        // 'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
        // 'file://README.pdf'
      ],
      subject: 'Backup de Scans',
      body: 'Aqui tienen sus backups los scans - <strong>ScanApp</strong>',
      isHtml: true
    };

    // Send a text message using default options
    this.emailComposer.open(email);
  }

  // Compartir en redes sociales
  compartir(registro: Registro){
    let url: string;
    if (registro.type === 'http') {
      url = registro.text;
    }
    if (registro.type === 'geo') {
      const coordenadas = registro.text.substr(4).split(',');
      const lat = coordenadas[0];
      const lng = coordenadas[1];
      url = `https://maps.google.com/?q=${lat},${lng}`;
    }

    // Compartimos en cualquier red social
    this.socialSharing.share(
      `Formato: ${registro.format}`,
      `Tipo de scaneo ${registro.type}`,
      '',
      url
    );
  }

  // Elimina del Storage
  eliminar(registro: Registro) {
    this.registros = this.registros.filter(registrado => registrado.text !== registro.text);
    this.storage.set('guardados', this.registros);
    this.presentToast('Eliminado Satisfactoriamete', 'primary');
  }

  // Funcion que servira para notificar
  async presentToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      color,
      position: 'bottom'
    });
    toast.present();
  }
}
