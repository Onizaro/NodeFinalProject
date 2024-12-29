import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../product.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartItems: Product[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Abonnement aux produits du panier
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();  // Calcul du total
    });
  }

  // Supprimer un produit du panier
  removeItem(product: Product): void {
    this.cartService.removeFromCart(product);
  }
}
