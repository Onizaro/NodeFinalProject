import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, ProductService } from '../product.service';

@Component({
  selector: 'app-men-page',
  imports: [CommonModule],
  templateUrl: './men-page.component.html',
  styleUrl: './men-page.component.css'
})
export class MenPageComponent {
  constructor(public productService: ProductService) {}
  products: Product[] = [
    {
      id: 1,
      name: 'Blouson en Cuir',
      price: 89.99,
      image: 'assets/men/jacket1.jpg'
    },
    // Ajoutez d'autres produits ici
  ];

}
