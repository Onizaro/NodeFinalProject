import { Routes } from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component'
import {MenPageComponent} from './men-page/men-page.component'
import {WomenPageComponent} from './women-page/women-page.component'
import {ChildrenPageComponent} from './children-page/children-page.component'
import {CartPageComponent} from './cart-page/cart-page.component'

export const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'homme', component: MenPageComponent},
  {path: 'femme', component: WomenPageComponent},
  {path: 'enfants', component: ChildrenPageComponent},
  {path: 'panier', component: CartPageComponent},
];
