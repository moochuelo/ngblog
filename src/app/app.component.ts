import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { LoginComponent } from 'src/app/components/auth/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @Input() loginComponent: LoginComponent;


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
