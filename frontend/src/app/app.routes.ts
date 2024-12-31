import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MenPageComponent } from './men-page/men-page.component';
import { WomenPageComponent } from './women-page/women-page.component';
import { ChildrenPageComponent } from './children-page/children-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { UpdatePageComponent } from './update-page/update-page.component';
import { SearchPageComponent} from './search-page/search-page.component';


export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'men', component: MenPageComponent },
  { path: 'women', component: WomenPageComponent },
  { path: 'kids', component: ChildrenPageComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'update', component: UpdatePageComponent },
  { path: 'search', component: SearchPageComponent },
];

