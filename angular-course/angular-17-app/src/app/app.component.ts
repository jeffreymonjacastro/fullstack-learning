import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from './user/user.component';

// Decorator that describes the component 
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserComponent], // Components will be here 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-17-app';
}
