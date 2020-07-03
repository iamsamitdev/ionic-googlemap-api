import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements  AfterViewInit {
  latitude: any;
  longitude: any;
  @ViewChild('mapElement', {static: true}) mapElement: ElementRef;
  constructor(private geolocation: Geolocation) { }

  ngAfterViewInit(): void {
 this.geolocation.watchPosition({ enableHighAccuracy : true, timeout: 10000 }).subscribe((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      const map = new google.maps.Map(this.mapElement.nativeElement, {
        center: {lat: 13.7538189, lng: 100.4996349},
        zoom: 16
      });
      /*location object*/
      const pos = {
        lat: this.latitude,
        lng: this.longitude
      };
      map.setCenter(pos);
      const icon = {
        url: 'assets/icon/u.png', // image url
        scaledSize: new google.maps.Size(50, 50), // scaled size
      };
      const marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: 'Hello World!',
        //icon: icon
      });
      const contentString = '<div id="content">' +
          '<div id="siteNotice">' +
          '</div>' +
          '<h1 id="firstHeading" class="firstHeading">ศาลาว่าการกรุงเทพ</h1>' +
          '<div id="bodyContent">' +
          '<img src="https://siamrath.co.th/files/styles/1140/public/img/20180607/3a02d87dbc2774693fbd16036a45e46ff8937bc90d86d35b0b61ae1eabbea769.JPG?itok=NaILk7jF" width="300">' +
          '<p><b>ศาลาว่าการกรุงเทพ</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
          'sandstone rock formation in the southern part of the ' +
          'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
          'south west of the</p>' +
          '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
          'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
          '(last visited June 22, 2009).</p>' +
          '</div>' +
          '</div>';

      const infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 400
      });

      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
   });
  }

}
