import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit, AfterViewInit {

  lat: number; // Latitud
  lng: number; // Longitud

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let geo: any = this.route.snapshot.paramMap.get('geo').substr(4).split(',');
    this.lat = Number(geo[0]);
    this.lng = Number(geo[1]);
    console.log(this.lat, this.lng);
  }

  ngAfterViewInit() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaXNhYWNiOTciLCJhIjoiY2tjcjJ0Y2I4MG1wMzJ5b3liamttMTVvbyJ9.D4rUjM1Xv0LkvSf2z_KWOA';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11'
    });
  }

}
