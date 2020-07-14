import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  slidesOpt = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  constructor(private barcodeScanner: BarcodeScanner) {}

  // Se dispara cuando la vista es termina de cargar
  ionViewDidEnter(){
    console.log('viewDidEnter');
  }

  // Cuando la pagina ya salio de la vista del usuario
  ionViewDidLeave(){
    console.log('viewDidLeave');
  }

  // La pagina va a cargar
  ionViewWillEnter(){
    console.log('viewWillEnter');
    this.scan();
  }

  // Se dispara cuando abanadonas la pagina
  ionViewWillLeave(){
    console.log('viewWillLeave');
  }

  // Metodo para scanear
  scan(){
    /**
     * Abre la camara con el scanner y una vez que encuentre un codigo
     * va a ser toda su chamba con la data correspondiente dentro de la promesa
     */

    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });
  }
}
