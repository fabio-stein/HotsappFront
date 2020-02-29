import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Hotsapp &copy; 2020</span>
    
    <div class="socials">
      <a href="https://www.facebook.com/hotsappbrasil" target="_blank"><i class="fab fa-facebook"></i></a>
      <a href="https://www.instagram.com/hotsapp_br" target="_blank"><i class="fab fa-instagram"></i></a>
    </div>
  `,
})
export class FooterComponent {
}
