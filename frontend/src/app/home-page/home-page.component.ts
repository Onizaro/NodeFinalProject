import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-home-page',
  imports: [
    NavbarComponent
  ],
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
