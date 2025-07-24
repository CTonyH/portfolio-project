import { Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { MyFeedbacksComponent } from './my-feedbacks/my-feedbacks.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { MySkillsComponent } from './my-skills/my-skills.component';
import { WhyMeComponent } from './why-me/why-me.component';

export const routes: Routes = [
  { path: 'contact', component: ContactComponent },
  { path: 'hero-section', component: HeroSectionComponent },
  { path: 'my-feedback', component: MyFeedbacksComponent },
  { path: 'my-projects', component: MyProjectsComponent },
  { path: 'my-skills', component: MySkillsComponent },
  { path: 'why-me', component: WhyMeComponent },
];
