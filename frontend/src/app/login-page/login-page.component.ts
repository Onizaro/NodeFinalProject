import {Component, OnInit} from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { Router} from '@angular/router';
import { CommonModule} from '@angular/common';
import { NgModule} from '@angular/core';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit{
  loginEmail = '';
  loginPassword = '';
  registerName = '';
  registerEmail = '';
  registerPassword = '';
  username: string | null = null;


  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    // Vérifier si l'utilisateur est déjà connecté au chargement du composant
    this.username = localStorage.getItem('username');

  }

  // Connexion
  // Connexion
  onLogin(event: Event) {
    event.preventDefault();

    // Appel à l'API pour obtenir tous les utilisateurs
    this.apiService.getUsers().subscribe(
      (users) => {
        // Recherche de l'utilisateur avec l'email dans la liste des utilisateurs
        const user = users.find((user: any) => user.email === this.loginEmail);

        if (user) {
          // L'utilisateur existe, maintenant vérifier le mot de passe
          if (user.password === this.loginPassword) {
            alert('Login successful!');
            const username = user.name; // Assurez-vous que 'name' est bien la propriété du nom de l'utilisateur
            const userID = user.id;
            console.log(username)

            // Stocker le nom de l'utilisateur dans le localStorage (si nécessaire)
            localStorage.setItem('username', username);
            localStorage.setItem('userID', userID);

            // Mettre à jour la navbar avec le nom de l'utilisateur (exemple de redirection ou d'affichage)
            this.router.navigate(['']);
          } else {
            console.error('Incorrect password');
            alert('Incorrect password.');
          }
        } else {
          console.error('User not found');
          alert('User not found.');
        }
      },
      (error) => {
        console.error('Error retrieving users:', error);
        alert('An error occurred while retrieving users.');
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
        console.log('Account successfully created!', response);
        alert('Account successfully created!');
      },
      (error) => {
        console.error('Error creating account:', error);
        alert('Account creation failed.');
      }
    );
  }


  logout() {
    localStorage.removeItem('username'); // Supprimer l'utilisateur du localStorage
    this.username = null;
  }
}
