import { Component, ViewChild } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';
import { IonList } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild('lista_registros') listaRegistros: IonList;
  slidesOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  constructor(public dataLocal: DataLocalService) {}

  enviarCorreo(){
    console.log('Enviando a correo');
    this.dataLocal.enviarCorreo();
  }

  abrirRegistro(registro){
    console.log('Abriendo registro', registro);
    this.dataLocal.abrirRegistro(registro);
  }

  compartir(registro) {
    this.dataLocal.compartir(registro);
    this.listaRegistros.closeSlidingItems(); // Cierra los items cuando termina su evento
  }

  eliminar(registro) {
    this.dataLocal.eliminar(registro);
    this.listaRegistros.closeSlidingItems(); // Cierra los items cuando termina su evento
  }
}
