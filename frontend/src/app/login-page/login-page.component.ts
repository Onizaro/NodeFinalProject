import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],  // Ajouter HttpClientModule ici
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  loginEmail = '';
  loginPassword = '';
  registerName = '';
  registerEmail = '';
  registerPassword = '';

  constructor(private apiService: ApiService) {}

  // Connexion
  onLogin(event: Event) {
    event.preventDefault();
    this.apiService.login(this.loginEmail, this.loginPassword).subscribe(
      (response) => {
        console.log('Connexion réussie !', response);
        alert('Connexion réussie !');
      },
      (error) => {
        console.error('Erreur de connexion :', error);
        alert('Échec de la connexion.');
      }
    );
  }

  // Création d'un compte
  onCreateAccount(event: Event) {
    event.preventDefault();
    const newUser = {
      name: this.registerName,
      email: this.registerEmail,
      password: this.registerPassword,
    };

    this.apiService.createUser(newUser).subscribe(
      (response) => {
        console.log('Compte créé avec succès !', response);
        alert('Compte créé avec succès !');
      },
      (error) => {
        console.error('Erreur lors de la création du compte :', error);
        alert('Échec de la création du compte.');
      }
    );
  }
}
