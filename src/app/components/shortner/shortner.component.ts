import { Component, Renderer2 } from '@angular/core';
import { Chart } from 'chart.js';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-shortner',
  templateUrl: './shortner.component.html',
  styleUrl: './shortner.component.css',
  providers: [DatePipe]
})
export class ShortnerComponent {
  
  isCollapsed = false;
  userInfo:any;
  userShortLink:any
  formattedLinks:any;
  loading:boolean = false;

  constructor(private renderer: Renderer2, private authservice:AuthService, private router : Router,private apiservice: ApiService,private datePipe: DatePipe) {}

  ngOnInit() {
    this.userInfo = this.authservice.getLoginUser()
    const uid = this.authservice.getAccessToken()
    this.loading = true;
    this.apiservice.getShortLink(uid).subscribe((result) => {
      console.log(result);
      this.loading = false;
      this.userShortLink = result.data;
      this.formattedLinks = this.userShortLink.map((link: { createdAt: string | number | Date; }) => {
        const formattedDate = this.datePipe.transform(link.createdAt, 'MMM d, y, h:mm a');
        return { ...link, formattedDate };
      });
      console.log(this.formattedLinks);
    })
    setTimeout(()=>{
      this.loading = false;
    },3000)
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    const sidebar = document.getElementById('sidebarMenu');
    const mainContent = document.querySelector('main');

    if (sidebar) {
      if (this.isCollapsed) {
        this.renderer.addClass(sidebar, 'collapsed');
        if (mainContent) {
          this.renderer.addClass(mainContent, 'expanded');
        }
      } else {
        this.renderer.removeClass(sidebar, 'collapsed');
        if (mainContent) {
          this.renderer.removeClass(mainContent, 'expanded');
        }
      }
    } else {
      console.error('Sidebar element not found');
    }
  }
  activeTab: string = 'dashboard';
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  logout(){
    localStorage.clear()
    this.authservice.setLoggedIn(false);
    this.router.navigate(['/home'])
  }
}
