import { Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { MyFeedbacksComponent } from './my-feedbacks/my-feedbacks.component';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { MySkillsComponent } from './my-skills/my-skills.component';
import { WhyMeComponent } from './why-me/why-me.component';
import { PrivacyPolicyDeComponent } from './shared/privacy-policy-de/privacy-policy-de.component';
import { PrivacyPolicyEnComponent } from './shared/privacy-policy-en/privacy-policy-en.component';
import { HomeComponent } from './home/home.component';
import { LegalNoticeComponent } from './shared/legal-notice/legal-notice.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'contact', component: ContactComponent },
  { path: 'hero-section', component: HeroSectionComponent },
  { path: 'my-feedback', component: MyFeedbacksComponent },
  { path: 'my-projects', component: MyProjectsComponent },
  { path: 'my-skills', component: MySkillsComponent },
  { path: 'why-me', component: WhyMeComponent },
  { path: 'privacy-policy-de', component: PrivacyPolicyDeComponent },
  { path: 'privacy-policy-en', component: PrivacyPolicyEnComponent },
  {
    path: 'privacy-policy',
    redirectTo: 'privacy-policy-en',
    pathMatch: 'full',
  }, 
  { path: 'legal-notice', component: LegalNoticeComponent },
  { path: '**', redirectTo: '' },
];
