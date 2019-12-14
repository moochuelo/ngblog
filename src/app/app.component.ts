import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngBlog';

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'user-shape',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/user-shape.svg'));
    iconRegistry.addSvgIcon(
      'user-inside',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/user-inside.svg'));
    iconRegistry.addSvgIcon(
      'exit-to-app',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/exit-to-app.svg'));
  }

}
