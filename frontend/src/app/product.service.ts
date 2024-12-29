import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Chemise Classique',
      price: 29.99,
      image: 'assets/men/shirt1.jpg',
    },
    {
      id: 2,
      name: 'Chaussures Élégantes',
      price: 49.99,
      image: 'assets/men/shoes1.jpg',
    },
    {
      id: 3,
      name: 'Blouson en Cuir',
      price: 89.99,
      image: 'assets/men/jacket1.jpg',
    },
    // Ajoutez d'autres produits ici
  ];

  private cart: Product[] = []; // Panier

  private cartSubject = new BehaviorSubject<Product[]>(this.cart);
  public cart$ = this.cartSubject.asObservable(); // Observable pour suivre les changements du panier

  constructor() {}

  // Obtenir tous les produits
  getProducts(): Product[] {
    return this.products;
  }

  // Ajouter un produit au panier
  addToCart(product: Product): void {
    this.cart.push(product);
    this.cartSubject.next(this.cart); // Met à jour l'observable du panier
  }

  // Obtenir le nombre total d'articles dans le panier
  getCartCount(): number {
    return this.cart.length;
  }

  // Obtenir les produits dans le panier
  getCart(): Product[] {
    return this.cart;
  }

  // Supprimer un produit du panier
  removeFromCart(product: Product): void {
    const index = this.cart.indexOf(product);
    if (index !== -1) {
      this.cart.splice(index, 1);
      this.cartSubject.next(this.cart); // Met à jour l'observable du panier
    }
  }

  // Vider le panier
  clearCart(): void {
    this.cart = [];
    this.cartSubject.next(this.cart); // Met à jour l'observable du panier
  }
}
