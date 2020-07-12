import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Plister &copy; 2020</span>
    
    <div class="socials">
      <a href="https://www.facebook.com/plister.official" target="_blank"><i class="fab fa-facebook"></i></a>
      <a href="https://www.instagram.com/plister.app" target="_blank"><i class="fab fa-instagram"></i></a>
    </div>
  `,
})
export class FooterComponent {
}
