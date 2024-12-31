import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule} from '@angular/common';
import { NgModule} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, FormsModule],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  username: string | null = null;
  userID: number = 0;
  searchTerm: string = '';

  ngOnInit() {
    // Récupérez le nom d'utilisateur depuis le localStorage
    const storedUsername = localStorage.getItem('username');
    const storedId = Number(localStorage.getItem('userId'));
    if (storedUsername) {
      this.username = storedUsername;
    }
    if (storedId) {
      this.userID = storedId;
    }
  }
  @Output() searchQueryChanged = new EventEmitter<string>();

  searchQuery: string = '';
  onSearchChange(): void {
    this.searchQueryChanged.emit(this.searchQuery);
  }
}
