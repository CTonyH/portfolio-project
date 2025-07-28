import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-why-me',
  imports: [TranslateModule],
  standalone: true,
  templateUrl: './why-me.component.html',
  styleUrl: './why-me.component.scss',
})
export class WhyMeComponent implements OnInit {
  hovered = false;
  mobileArrow = false;

  constructor(private viewportScroller: ViewportScroller) {}
  
  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.mobileArrow = window.innerWidth <= 1024;
  }

  get isMobile() {
    return this.mobileArrow;
  }

  setAnchorTo(anchor: string): void {
    this.viewportScroller.scrollToAnchor(anchor);
  }
}
