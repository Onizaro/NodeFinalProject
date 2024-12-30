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
    this.apiService.getProducts().subscribe(
      (products: Product[]) => {
        this.kidsProducts = products.filter((product: Product) =>
          product.name.toLowerCase().includes('kids') &&
          !product.name.toLowerCase().includes('men') &&
          !product.name.toLowerCase().includes('women')
        );
      },
      (error) => {
        console.error('Error fetching products:', error);
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
