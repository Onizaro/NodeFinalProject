import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.service';  // Assurez-vous d'importer le modèle Product

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>(this.cartItems);

  constructor() {}

  // Ajouter un produit au panier
  addToCart(product: Product): void {
    this.cartItems.push(product);
    this.cartSubject.next(this.cartItems);
  }

  // Supprimer un produit du panier
  removeFromCart(product: Product): void {
    this.cartItems = this.cartItems.filter(item => item.id !== product.id);
    this.cartSubject.next(this.cartItems);
  }

  // Obtenir les produits du panier
  getCartItems() {
    return this.cartSubject.asObservable();
  }

  // Calculer le total du panier
  getTotal(): number {
    return this.cartItems.reduce((total, product) => total + product.price, 0);
  }
}
