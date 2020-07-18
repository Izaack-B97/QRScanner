import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  registros: Registro[] = [];

  constructor(private storage: Storage, private navCtlr: NavController, private iab: InAppBrowser) {
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

    switch (registro.type) {
      case 'http':
        const url = registro.text;
        setTimeout(() => {
          this.iab.create( url, '_system'); // abre el navegador por default del disposito
        }, 1000);
        break;
    }
  }
}
