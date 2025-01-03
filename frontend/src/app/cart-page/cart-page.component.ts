import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Product } from '../models/product';
import { CartItem } from '../models/CartItem';

@Component({
  selector: 'app-cart-page',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;
  userId: number = Number(localStorage.getItem("userId"));

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.apiService.getCartItems().subscribe(
      (cartItems: CartItem[]) => {

        this.cartItems = cartItems
          .filter(item => item.User.id === this.userId)
          .map(item => ({
            ...item,
            product: item.Product
          }));
        console.log(cartItems);
        this.calculateTotal();
      },
      (error) => {
        console.error('Erreur lors de la récupération du panier:', error);
      }
    );
  }

  // Calculer le total du panier
  calculateTotal(): void {
    this.total = this.cartItems.reduce((sum, item) => sum + (item.Product.price * item.quantity), 0);
  }

  // Méthode pour supprimer un article du panier
  removeFromCart(itemId: number): void {
    this.apiService.removeCartItem(itemId).subscribe(
      () => {
        this.loadCart(); // Recharger le panier après suppression
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'article:', error);
      }
    );
  }

  // Méthode pour procéder à la commande
  checkout(): void {
    // Implémentation de la logique de checkout
    console.log('Proceeding to checkout...');
  }
}
