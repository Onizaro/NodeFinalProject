import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CommonModule} from '@angular/common';
import { NgModule} from '@angular/core';
import { Product } from '../models/product'; // Importer le modèle Product


@Component({
  selector: 'app-cart-page',
  imports: [CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartItems: Product[] = []; // Utiliser Product pour les éléments du panier
  total: number = 0; // Variable pour afficher le total du panier
  userId: number = 1; // L'ID de l'utilisateur actuel (à remplacer par l'ID réel de l'utilisateur dans la session)

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Appel API pour récupérer les éléments du panier et filtrer par userId
    this.loadCart();
  }

  // Récupérer les éléments du panier depuis l'API
  loadCart(): void {
    this.apiService.getCartItems().subscribe(
      (cartItems: any[]) => {
        // Filtrer les articles en fonction de l'ID de l'utilisateur actuel
        this.cartItems = cartItems
          .filter(item => item.userId === this.userId) // Filtre sur userId
          .map(item => item.product); // Nous extrayons seulement la propriété 'product' de chaque élément

        this.calculateTotal();
      },
      (error) => {
        console.error('Erreur lors de la récupération du panier:', error);
      }
    );
  }

  // Calculer le total du panier
  calculateTotal(): void {
    this.total = this.cartItems.reduce((sum, item) => sum + item.price, 0);
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
