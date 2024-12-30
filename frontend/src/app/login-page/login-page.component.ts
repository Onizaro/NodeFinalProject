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
            console.log('Connexion réussie !', user);
            alert('Connexion réussie !');
            const username = user.name; // Assurez-vous que 'name' est bien la propriété du nom de l'utilisateur
            console.log(username)

            // Stocker le nom de l'utilisateur dans le localStorage (si nécessaire)
            localStorage.setItem('username', username);

            // Mettre à jour la navbar avec le nom de l'utilisateur (exemple de redirection ou d'affichage)
            this.router.navigate(['']);
          } else {
            console.error('Mot de passe incorrect');
            alert('Mot de passe incorrect.');
          }
        } else {
          console.error('Utilisateur non trouvé');
          alert('Utilisateur non trouvé.');
        }
      },
      (error) => {
        console.error('Erreur de récupération des utilisateurs :', error);
        alert('Une erreur est survenue lors de la récupération des utilisateurs.');
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

  logout() {
    localStorage.removeItem('username'); // Supprimer l'utilisateur du localStorage
    this.username = null; // Réinitialiser la variable username
    console.log('Déconnexion effectuée');
  }
}
