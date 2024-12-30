import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-update-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],  // Déclare les imports ici
  templateUrl: './update-page.component.html',
  styleUrls: ['./update-page.component.css']
})
export class UpdatePageComponent implements OnInit {
  productForm: FormGroup;
  products: any[] = []; // Tableau des produits récupérés
  editForm: FormGroup[] = []; // Tableau pour stocker les formulaires de modification

  constructor(
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Initialisation du formulaire pour l'ajout de produit
    this.productForm = this.fb.group({
      productName: ['', [Validators.required]],
      productPrice: ['', [Validators.required, Validators.min(0)]],
      productDescription: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Vérification si l'utilisateur est admin
    const username = localStorage.getItem('username');
    if (username !== 'admin') {
      this.router.navigate(['/']);
    } else {
      this.apiService.getProducts().subscribe(
        (products) => {
          this.products = products;

          // Initialisation des formulaires pour chaque produit existant
          this.products.forEach((product, index) => {
            this.editForm[index] = this.fb.group({
              productName: [product.name, [Validators.required]],
              productPrice: [product.price, [Validators.required, Validators.min(0)]],
              productDescription: [product.description, [Validators.required]]
            });
          });
        },
        (error) => {
          console.error('Erreur lors de la récupération des produits :', error);
          alert('Une erreur est survenue lors de la récupération des produits.');
        }
      );
    }
  }

  // Soumission du formulaire pour ajouter un produit
  onSubmit(): void {
    if (this.productForm.valid) {
      const newProduct = {
        name: this.productForm.value.productName,
        description: this.productForm.value.productDescription,
        price: this.productForm.value.productPrice,
        stock: 0  // Vous pouvez ajuster cela si nécessaire
      };

      this.apiService.addProduct(newProduct).subscribe(
        (response) => {
          console.log('Produit créé avec succès !', response);
          alert('Produit créé avec succès !');
        },
        (error) => {
          console.error('Erreur lors de la création du produit :', error);
          alert('Erreur lors de la création du produit.');
        }
      );
    } else {
      alert('Veuillez remplir tous les champs correctement.');
    }
  }

  // Soumission du formulaire pour modifier un produit
  onEditSubmit(productId: number, index: number): void {
    if (this.editForm[index].valid) {
      const updatedProduct = {
        name: this.editForm[index].value.productName,
        description: this.editForm[index].value.productDescription,
        price: this.editForm[index].value.productPrice,
        stock: 0  // Vous pouvez ajuster cela si nécessaire
      };

      this.apiService.updateProduct(productId, updatedProduct).subscribe(
        (response) => {
          console.log('Produit mis à jour avec succès !', response);
          alert('Produit mis à jour avec succès !');
          this.products[index] = { ...this.products[index], ...updatedProduct }; // Mise à jour du produit dans la liste locale
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du produit :', error);
          alert('Erreur lors de la mise à jour du produit.');
        }
      );
    } else {
      alert('Veuillez remplir tous les champs correctement.');
    }
  }
}
