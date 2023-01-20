import { Component } from '@angular/core';

@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.scss']
})
export class NotifierComponent {

  public static visible = false;
  static text = "Hello";

  public static show(text: string, duration=3000) {
    this.text = text;
    this.visible = true;
    setTimeout( () => {
      this.visible = false;
    }, duration);
  }

  getText() {
    return NotifierComponent.text;
  }

  getVisible(): boolean {
    return NotifierComponent.visible;
  }
}
