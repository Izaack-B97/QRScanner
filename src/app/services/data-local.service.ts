import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  registros: Registro[] = [];

  constructor() { }

  // Guardara los registros
  guardarRegistro(format: string, text: string){
    const nuevoRegistro = new Registro(format, text);
    this.registros.unshift(nuevoRegistro);
    console.log(this.registros);
  }

}
