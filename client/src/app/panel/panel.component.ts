import { Component, OnInit, Renderer2, Input } from '@angular/core';
import { Hotel } from '../hotel';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  selectedHotel: Hotel;
  @Input() id: number;
  showrm = false;
  link: string;

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
        this.link = '../../assets/images/single.jpg';
      } else if (id === 2) {
        this.link = '../../assets/images/double.jpg';
      } else if (id === 3) {
        this.link = '../../assets/images/suite.jpg';
      }
    }
  }

  show(): void {
    this.showrm = true;
  }

  ngOnInit() {
    this.getSelectedHotel();
  }

}
