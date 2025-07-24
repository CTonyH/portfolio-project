import { NgIf, ViewportScroller } from '@angular/common';
import { Component} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

let email: string;
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  email = 'tony.hirschligau@googlemail.com';
  isFocused: {[key: string]: boolean} = {};
  privacyAccepted: boolean = false;

  constructor(private viewportScroller: ViewportScroller) {}

  setAnchorTo (anchor: string): void {
    this.viewportScroller.scrollToAnchor(anchor);
  }
}
