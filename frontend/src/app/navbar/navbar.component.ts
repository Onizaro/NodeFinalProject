import { Component, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { NgModule} from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  username: string | null = null; // Déclarez une variable pour stocker le nom d'utilisateur

  ngOnInit() {
    // Récupérez le nom d'utilisateur depuis le localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.username = storedUsername; // Assignez la valeur à la variable username
    }
  }
}
