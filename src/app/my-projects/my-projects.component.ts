import { Component } from '@angular/core';
import { ProjectComponent } from './project/project.component';
import { TranslateModule } from '@ngx-translate/core';

export interface Project {
  name: string;
  includedSkills: string;
  description: string;
  image: string;
  translationKey?: string;
}
@Component({
  selector: 'app-my-projects',
  standalone: true,
  imports: [ProjectComponent, TranslateModule],
  templateUrl: './my-projects.component.html',
  styleUrl: './my-projects.component.scss',
})
export class MyProjectsComponent {
  projects: Project[] = [
    {
      name: 'JOIN',
      includedSkills: 'Angular | TypeScript | HTML | CSS | Firebase',
      description:
        'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
      image: '../../assets/images/join-clear.png',
      translationKey: 'my-projects.projects.join.description',
    },
    {
      name: 'El-Pollo-Loco',
      includedSkills: 'JavaScript | HTML | CSS',
      description:
        'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.',
      image: '../../assets/images/pollo-loco.png',
      translationKey: 'my-projects.projects.el-pollo-loco.description',
    },
  ];
}
