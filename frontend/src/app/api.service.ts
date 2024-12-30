import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Connexion utilisateur
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/login`, { email, password });
  }

  // Création d'un utilisateur
  createUser(user: { name: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, user);
  }

  // Obtenir tous les produits
  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`);
  }

  // Ajouter un produit
  addProduct(product: { name: string; price: number; stock: number }): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`, product);
  }

  // Mettre à jour un produit
  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/products/${id}`, product);
  }

  // Supprimer un produit
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/${id}`);
  }

  // Récupérer tous les utilisateurs
  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  addToCart(cartItem: { userId: number, productId: number, quantity: number }): Observable<any> {
    return this.http.post(`${this.baseUrl}/cart`, cartItem);
  }

  getCartItems(): Observable<any> {
    return this.http.get(`${this.baseUrl}/cart`);
  }

  removeCartItem(itemId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cart/${itemId}`);
  }

}
