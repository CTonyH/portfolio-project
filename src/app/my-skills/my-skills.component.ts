import { Component, HostListener } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-my-skills',
  imports: [TranslateModule],
  standalone: true,
  templateUrl: './my-skills.component.html',
  styleUrl: './my-skills.component.scss',
})
export class MySkillsComponent {
  isDesktop: boolean = false;

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isDesktop = window.innerWidth > 768;
  }

  get isMobile() {
    return !this.isDesktop;
  }
}
