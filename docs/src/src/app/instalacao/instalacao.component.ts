import {Component} from '@angular/core'

@Component({
  templateUrl: './instalacao.component.html',
})
export class InstalacaoComponent  {
 
  codigoCss = `
      <link href="<CAMINHO>/select2.min.css" rel="stylesheet">
      <link href="<CAMINHO>/select2.bootstrap.min.css" rel="stylesheet">
  `;
  codigoModule = `
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';
    
    import { AppComponent } from './app.component';
    
    import { Ng2Select2Bootstrap } from 'ng2-select2-bootstrap';
    
    @NgModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        Ng2Select2Bootstrap
      ],
      providers: [],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
  `;
}
