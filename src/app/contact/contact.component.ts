import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

let email: string;
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  email = 'tony.hirschligau@googlemail.com';

  privacyAccepted: boolean = false;
  @ViewChild('invalid-name') containerRef!: ElementRef;
  nameInput: string = '';

constructor(private renderer: Renderer2){

}

  getInputData() {
    if (this.nameInput.length < 3) {
      this.renderer.setStyle(this.containerRef.nativeElement, 'display', 'block');
    } else {
    }
  }
}
