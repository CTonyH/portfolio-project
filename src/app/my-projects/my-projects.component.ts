import { Component } from '@angular/core';
import { ProjectComponent } from './project/project.component';

export interface Project {
  name: string;
  includedSkills: string;
  description: string;
  image: string;
}
@Component({
  selector: 'app-my-projects',
  imports: [ProjectComponent],
  standalone: true,
  templateUrl: './my-projects.component.html',
  styleUrl: './my-projects.component.scss',
})
export class MyProjectsComponent {
  projects: Project[] = [
    {
      name: 'El-Pollo-Loco',
      includedSkills: 'JavaScript | HTML | CSS',
      description:
        'Jump, run and throw game based on object-oriented approach. Help Pepe to find coins and tabasco salsa to fight against the crazy hen.',
      image: '/assets/images/Pollo loco.png',
    },
    {
      name: 'JOIN',
      includedSkills: 'Angular | TypeScript | HTML | CSS | Firebase',
      description:
        'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories. ',
      image: '/assets/images/angular.png',
    },
  ];
}
