import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../models/product';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-children-page',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './children-page.component.html',
  styleUrls: ['./children-page.component.css']
})
export class ChildrenPageComponent implements OnInit {
  kidsProducts: Product[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Récupérer tous les produits via l'API
    this.apiService.getProducts().subscribe(
      (products: Product[]) => {
        // Filtrer les produits dont le nom contient "men" (et pas "women")
        this.kidsProducts = products.filter((product: Product) =>
          product.name.toLowerCase().includes('kids')
        );

        // Ajouter l'URL de l'image pour chaque produit en remplaçant les espaces par des underscores
        this.kidsProducts = this.kidsProducts.map((product: Product) => {
          return {
            ...product,
            imageUrl: `assets/${product.name.toLowerCase().replace(/ /g, '_')}.png` // Remplacer les espaces et ajouter .png
          };
        });

        console.log(this.kidsProducts);
      },
      (error) => {
        console.error('Erreur lors de la récupération des produits :', error);
      }
    );
  }

  addToCart(productId: number, quantity: number): void {
    // Vous pouvez récupérer l'ID de l'utilisateur depuis un service d'authentification, ici j'utilise un ID fictif (userId: 1)
    const userId = 1;

    const cartItem = {
      userId: userId,
      productId: productId,
      quantity: quantity
    };

    this.apiService.addToCart(cartItem).subscribe(
      (response) => {
        console.log('Item added to cart:', response);
        // Optionnellement, vous pouvez afficher un message ou mettre à jour l'interface utilisateur
      },
      (error) => {
        console.error('Error adding item to cart:', error);
      }
    );
  }

}
