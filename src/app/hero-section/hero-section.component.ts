import { CommonModule, ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent {
  constructor(private viewportScroller: ViewportScroller) {}

  setAnchorTo(anchor: string): void {
    this.viewportScroller.scrollToAnchor(anchor);
  }
}
