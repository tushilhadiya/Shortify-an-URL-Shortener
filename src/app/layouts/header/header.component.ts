import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isScrolled: boolean = false;
  isAuthenticated:any =false
  logout(){

  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Detect if scrolled down more than 5px
    this.isScrolled = window.scrollY > 5;
  }
}
