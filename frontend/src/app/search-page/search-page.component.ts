import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  searchQuery: string = '';  // Requête de recherche
  products: Product[] = [];
  filteredProducts: Product[] = [];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute  // Injection d'ActivatedRoute pour accéder aux paramètres de la route
  ) {}

  ngOnInit(): void {
    // Récupérer la requête de recherche à partir des paramètres de la route
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';  // Récupérer la query "search" de l'URL
      this.filterProducts();  // Filtrer immédiatement après avoir récupéré les queryParams
    });

    // Récupérer tous les produits via l'API
    this.apiService.getProducts().subscribe(
      (products: Product[]) => {
        this.products = products;

        // Ajouter l'URL de l'image pour chaque produit
        this.products = this.products.map((product: Product) => {
          return {
            ...product,
            imageUrl: `assets/${product.name.toLowerCase().replace(/ /g, '_')}.png`
          };
        });

        // Appliquer le filtre après avoir récupéré les produits
        this.filterProducts();
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  // Filtrer les produits en fonction de la recherche
  private filterProducts(): void {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
