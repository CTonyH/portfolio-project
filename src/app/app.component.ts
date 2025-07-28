import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { WhyMeComponent } from './why-me/why-me.component';
import { MySkillsComponent } from './my-skills/my-skills.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { MyFeedbacksComponent } from './my-feedbacks/my-feedbacks.component';
import { ContactComponent } from './contact/contact.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    HeroSectionComponent,
    WhyMeComponent,
    MySkillsComponent,
    MyProjectsComponent,
    MyFeedbacksComponent,
    ContactComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'portfolio-project';

  constructor(private translate: TranslateService) {
    // Standard-Sprache setzen
    translate.setDefaultLang('en');
    translate.use('en');

    // CSS-Klasse für Sprache setzen
    document.body.className = 'lang-en';

    // Auf Sprachwechsel hören
    translate.onLangChange.subscribe((event) => {
      document.body.className = `lang-${event.lang}`;
    });
  }
}
