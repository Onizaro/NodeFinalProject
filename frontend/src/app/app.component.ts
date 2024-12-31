import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
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
  searchQuery: string = '';  // La requête de recherche

  constructor(private router: Router) {}

  onSearchQueryChanged(query: string): void {
    this.searchQuery = query;  // Mettre à jour la requête de recherche

    // Naviguer vers la page de recherche avec la query
    this.router.navigate(['/search'], { queryParams: { q: query } });
  }
}
