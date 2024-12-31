import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../models/product'; // Importer l'interface Product
import { CommonModule} from '@angular/common';
import { NgModule} from '@angular/core';

@Component({
  selector: 'app-men-page',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './men-page.component.html',
  styleUrls: ['./men-page.component.css']
})
export class MenPageComponent implements OnInit {
  menProducts: Product[] = []; // Typage du tableau avec l'interface Product

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Récupérer tous les produits via l'API
    this.apiService.getProducts().subscribe(
      (products: Product[]) => {
        // Filtrer les produits dont le nom contient "men" (et pas "women")
        this.menProducts = products.filter((product: Product) =>
          product.name.toLowerCase().includes('men') &&
          !product.name.toLowerCase().includes('women')
        );

        // Ajouter l'URL de l'image pour chaque produit en remplaçant les espaces par des underscores
        this.menProducts = this.menProducts.map((product: Product) => {
          return {
            ...product,
            imageUrl: `assets/${product.name.toLowerCase().replace(/ /g, '_')}.png` // Remplacer les espaces et ajouter .png
          };
        });

        console.log(this.menProducts);
      },
      (error) => {
        console.error('Erreur lors de la récupération des produits :', error);
      }
    );
  }


  addToCart(productId: number, quantity: number): void {
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
