import { Component, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { NgModule} from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-page',
  imports: [CommonModule],
  templateUrl: './update-page.component.html',
  styleUrl: './update-page.component.css'
})
export class UpdatePageComponent implements OnInit {
  productId: number = 0;
  productName: string = '';
  productPrice: number = 0;
  productDescription: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    // Vérifier si l'utilisateur est admin
    const username = localStorage.getItem('username');
    if (username !== 'admin') {
      this.router.navigate(['/']); // Rediriger si l'utilisateur n'est pas admin
    }
  }

  onSubmit(): void {
    const newProduct = {
      id: this.productId,
      name: this.productName,
      price: this.productPrice,
      description: this.productDescription
    };

    this.apiService.addProduct(newProduct).subscribe(
      (response) => {
        console.log('Produit ajouté avec succès !', response);
        alert('Produit ajouté avec succès !');
        this.router.navigate(['/']); // Redirige vers la page d'accueil après l'ajout
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du produit :', error);
        alert('Erreur lors de l\'ajout du produit.');
      }
    );
  }
}
