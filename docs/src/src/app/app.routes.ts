import { Routes } from '@angular/router';

import { SimplesComponent } from './simples/simples.component';

import {InstalacaoComponent} from "./instalacao/instalacao.component";

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'instalacao', pathMatch: 'full' },
  { path: 'instalacao', component: InstalacaoComponent },
  { path: 'simples', component: SimplesComponent },

];

