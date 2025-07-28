import { ViewportScroller } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [TranslateModule, RouterLink],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(
    private viewportScroller: ViewportScroller,
    private translate: TranslateService,
    private router: Router
  ) {
    this.viewportScroller.setOffset([0, 100]);
  }
  isMobileOpen: boolean = false;

  setAnchorTo(anchor: string): void {

    if (this.router.url === '/home' || this.router.url === '/') {

      this.viewportScroller.scrollToAnchor(anchor);
    } else {
      this.router.navigate(['/home']).then(() => {
        setTimeout(() => {
          this.viewportScroller.scrollToAnchor(anchor);
        }, 100);
      });
    }
  }

  switchLanguage(language: string): void {
    this.translate.use(language);
  }

  closeMobileMenu(): void {
    this.isMobileOpen = false;
  }

  openMobileMenu(): void {
    if (this.isMobileOpen === false) {
      this.isMobileOpen = true;
    } else {
      this.isMobileOpen = false;
    }
  }
}
