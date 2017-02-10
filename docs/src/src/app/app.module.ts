import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { SimplesComponent } from './simples/simples.component';
import {LogComponent} from "./log/log.component";
import {Ng2Select2BootstrapModule} from "ng2-select2-bootstrap";
import {TabsModule} from "ng2-bootstrap";
import {InstalacaoComponent} from "./instalacao/instalacao.component";
import {MultipleComponent} from "./multiple/multiple.component";
import {RequestComponent} from "./request/request.component";
import {RequestMultipleComponent} from "./request-multiple/request-multiple.component";

@NgModule({
  declarations: [
    AppComponent,
    SimplesComponent,
    LogComponent,
    InstalacaoComponent,
    MultipleComponent,
    RequestComponent,
    RequestMultipleComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    Ng2Select2BootstrapModule,
    TabsModule.forRoot(),
    RouterModule.forRoot(rootRouterConfig, { useHash: true })
  ],
  providers: [
    
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
