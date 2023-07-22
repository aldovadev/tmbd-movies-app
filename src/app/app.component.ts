import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'showtime';
  navbg: any = {
    'background-color': '#ffffff33',
    'box-shadow': 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  }

  @HostListener('document:scroll') scrollover() {
    console.log(document.body.scrollTop, 'scrolllength#');

    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.navbg = {
        'background-color': '#fbfbfb33',
        'box-shadow': 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
      }
    } else {
      this.navbg = {
        'background-color': '#33333333',
      }
    }
  }
}
