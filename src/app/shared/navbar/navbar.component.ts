import { ViewportScroller } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private viewportScroller: ViewportScroller) {
    this.viewportScroller.setOffset([0, 100]);
  }
  isMobileOpen: boolean = false;

  setAnchorTo(anchor: string): void {
    this.viewportScroller.scrollToAnchor(anchor);
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
