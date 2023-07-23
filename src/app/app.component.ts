import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'aldova';
  navbg: any = {
    'background-color': '#fbfbfb88',
  }


  @HostListener('document:scroll') scrollover() {
    console.log(document.body.scrollTop, 'scrolllength#');

    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      this.navbg = {
        'background-color': '#33333333',
        'box-shadow': 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        'color': '#fbfbfb'
      }
    } else {
      this.navbg = {
        'background-color': '#fbfbfb88',
      }
    }
  }
}
