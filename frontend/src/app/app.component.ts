import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent} from './navbar/navbar.component';
import { LoginPageComponent} from './login-page/login-page.component';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, LoginPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
