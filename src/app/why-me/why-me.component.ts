import { ViewportScroller } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-why-me',
  imports: [],
  standalone: true,
  templateUrl: './why-me.component.html',
  styleUrl: './why-me.component.scss',
})
export class WhyMeComponent implements OnInit {
  hovered = false;
  mobileArrow = false;

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
}
