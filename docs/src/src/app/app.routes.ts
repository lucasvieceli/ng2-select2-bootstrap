import { Routes } from '@angular/router';
import { SimplesComponent } from './simples/simples.component';
import {InstalacaoComponent} from "./instalacao/instalacao.component";
import {MultipleComponent} from "./multiple/multiple.component";
import {RequestComponent} from "./request/request.component";
import {RequestMultipleComponent} from "./request-multiple/request-multiple.component";

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'instalacao', pathMatch: 'full' },
  { path: 'instalacao', component: InstalacaoComponent },
  { path: 'simples', component: SimplesComponent },
  { path: 'multiple', component: MultipleComponent },
  { path: 'request', component: RequestComponent},
  { path: 'request-multiple', component: RequestMultipleComponent},

];
