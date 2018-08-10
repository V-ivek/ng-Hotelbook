import { Component, OnInit, Renderer2 } from '@angular/core';
import { Hotel } from '../hotel';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  selectedHotel: Hotel;
  id: number;
  showrm = false;

  constructor(private renderer: Renderer2) { }

  getSelectedHotel(): void {
    this.selectedHotel = JSON.parse(sessionStorage.getItem('currentHotel'));
  }

  room(id: number, rid: string, err): void {
    if (err) {
      throw err;
    } else {
      this.id = id;
      if (id === 1) {
        const room: HTMLElement = document.getElementById('roomdetails');
        const select: HTMLElement = document.getElementById(rid);
        this.renderer.setStyle(room, 'background-image', 'url("../../assets/images/single.jpg")');

      } else if (id === 2) {
        const room: HTMLElement = document.getElementById('roomdetails');
        const select: HTMLElement = document.getElementById('rid');
        this.renderer.setStyle(room, 'background-image', 'url("../../assets/images/double.jpg")');
      } else if (id === 3) {
        const room: HTMLElement = document.getElementById('roomdetails');
        const select: HTMLElement = document.getElementById('rid');
        this.renderer.setStyle(room, 'background-image', 'url("../../assets/images/suite.jpg")');
      }
      const detail: HTMLElement = document.getElementById('detail');
      this.renderer.setStyle(detail, 'background-color', 'black');
    }
  }

  show(): void {
    this.showrm = true;
  }

  ngOnInit() {
    this.getSelectedHotel();
  }

}
