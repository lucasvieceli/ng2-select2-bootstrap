## Instalação ##
```bash
    npm install ng2-select2-bootstrap --save
```

Adicione Ng2Select2Bootstrap no seu `AppModule`:

```typescript
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
```

**Select simples**
```typescript
    //Caso queira mudar a exibição dos resultados
    <template #templateResultado let-valor>
        nome: {{valor.primeiroNome}}
    </template

    <select2-select>
        [valores]="[{id:1, primeiroNome: 'Lucas'}, {id:2, primeiroNome: 'João'}]"
        [(ngModel)]="valorSelecionado"
        [templateResultado]="templateResultado"
        indiceId="id"
        indiceNome="primeiroNome"
    </select2-select>
```
**Parametros**

 - **name** (string): valor para atribuir na tag 'name'
 - **placeholder** (string): placeholder quando não houver item selecionado
 - **templateResultado** (TemplateRef): template da lista de itens exibidos
 - **templateSelecionado** (TemplateRef): template quando selecionar um item
 - **templateSemResultado**(TemplateRef) : template quando não houver item na busca
 - **resultadoCompleto** (boolean) padrão false : caso esteja falso, quando usuario selecionar item, irá retornar somente o id, caso esteja true, irá retornar o objeto completo
 - **indiceId** (string) padrão 'id': o valor da posição que se encontra o id primario
 - **indiceNome** (string) padrão 'nome': o valor da posição que se encontra o nome a ser exibido
 - **valores** (array): o array com itens a ser exibido