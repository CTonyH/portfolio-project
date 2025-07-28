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
    // Prüfe ob wir bereits auf der Home-Seite sind
    if (this.router.url === '/home' || this.router.url === '/') {
      // Direkt zur Sektion scrollen
      this.viewportScroller.scrollToAnchor(anchor);
    } else {
      // Erst zur Home-Seite navigieren, dann zur Sektion scrollen
      this.router.navigate(['/home']).then(() => {
        // Kurz warten, damit die Seite geladen ist
        setTimeout(() => {
          this.viewportScroller.scrollToAnchor(anchor);
        }, 100);
      });
    }
  }

  switchLanguage(language: string): void {
    this.translate.use(language);
    console.log('Sprache gewechselt zu:', language); // Debug-Ausgabe
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
