import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title='shortify'  
  loading: boolean = true;
  showHeader: boolean = true;
  showHome: boolean = true;

  constructor(private router: Router) {
   
  }
  ngOnInit(): void {
    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.loading = false;
        }, 1000); 
        this.showHeader = this.router.url === '/home'; 
        this.showHome = this.router.url === '/home';
      }
    });
    
  }
  
 
  onActivate(event: any): void {
    if (event.constructor.name === "RouterOutlet") {
      this.showHeader = false;
      this.showHome = false;
    }
  }

}
