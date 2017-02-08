## Instalação ##
```bash
    npm install ng2-select2-bootstrap --save
```

> Adicione os arquivos de css ao html: "select2min.css",
> "select2.bootstrap.min.css" que estão na pasta
> "node_modules/ng2-select2-bootstrap"

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


----------


**Select simples**
```typescript
    //Caso queira mudar a exibição dos resultados
    <template #templateResultado let-valor>
        nome: {{valor.primeiroNome}}
    </template>

    <select2-select
        [valores]="[{id:1, primeiroNome: 'Lucas'}, {id:2, primeiroNome: 'João'}]"
        [(ngModel)]="valorSelecionado"
        [templateResultado]="templateResultado"
        indiceId="id"
        indiceNome="primeiroNome"
    >
    </select2-select>
```
- **Inputs**
 - **placeholder** (string): placeholder quando não houver item selecionado
 - **templateResultado** (TemplateRef): template da lista de itens exibidos
 - **templateSelecionado** (TemplateRef): template quando selecionar um item
 - **templateSemResultado**(TemplateRef) : template quando não houver item na busca
 - **indiceId** (string) padrão 'id': o valor da posição que se encontra o id primario
 - **indiceNome** (string) padrão 'nome': o valor da posição que se encontra o nome a ser exibido
 - **valores** (array): o array com itens a ser exibido
- **Outputs**
	 - **onAbrir** (boolean) true: dispara quando abre o elemento
	 - **onBuscar** (string): dispara quando faz alguma busca informando o que foi digitado
	 - **onSelecionarItem** (object): dispara quando seleciona um item passando o item selecionado
	 - **onLimpar** (boolean) true: dispara quando limpa o elemento
	 - **onFechar** (boolean) true: dispara quando fecha o elemento


----------


**Select Multiple**
```typescript
    //Caso queira mudar a exibição dos resultados
    <template #templateSelecionadoMultiple let-valor>
        <span *ngIf="valor">
            <li *ngFor="let item of valor.data" class="select2-selection__choice">
                <span class="select2-selection__choice__remove" role="presentation" (click)="valor.remove(item, $event)">×</span>
                {{item.nome}}
            </li>
        </span>
    </template>

    <select2-multiple
        [valores]="[{id:1, primeiroNome: 'Lucas'}, {id:2, primeiroNome: 'João'}]"
        [(ngModel)]="valorSelecionado"
        [templateSelecionado]="templateResultado"
        indiceId="id"
        indiceNome="primeiroNome"
    >
    </select2-multiple>
```
 - **Inputs**
	 - **placeholder** (string): placeholder quando não houver item selecionado
	 - **templateResultado** (TemplateRef): template da lista de itens exibidos
	 - **templateSelecionado** (TemplateRef): template quando selecionar um item
	 - **templateSemResultado**(TemplateRef) : template quando não houver item na busca
	 - **indiceId** (string) padrão 'id': o valor da posição que se encontra o id primario
	 - **indiceNome** (string) padrão 'nome': o valor da posição que se encontra o nome a ser exibido
	 - **valores** (array): o array com itens a ser exibido
 - **Outputs**
	 - **onAbrir** (boolean) true: dispara quando abre o elemento
	 - **onBuscar** (string): dispara quando faz alguma busca informando o que foi digitado
	 - **onSelecionarItem** (object): dispara quando seleciona um item passando o item selecionado
	 - **onRemoverItem** (object): dispara quando remove um item selecionado, passando o item por parametro
	 - **onFechar** (boolean) true: dispara quando fecha o elemento


----------


**Select Resquest**
```typescript
    <select2-request
        [(ngModel)]="valorSelecionado"
        [url]="url"
        [processaParametros]="processaParametros"
        [processaResultado]="processaResultado"
    >
    </select2-request>
```
 - **Inputs**
	 - **processaParametro** (function): é chamado quando vai fazer a pesquisa no servidor, o retorno desta função irá junto com a url para buscar
	 - **processaResultado** (function): é chamado quando termina de executar a busca, passando o resultado da busca por parametro. pegando o retorno desta função para usar como valores a ser exibido
	 - **placeholder** (string): placeholder quando não houver item selecionado
	 - **templateResultado** (TemplateRef): template da lista de itens exibidos
	 - **templateSelecionado** (TemplateRef): template quando selecionar um item
	 - **templateSemResultado**(TemplateRef) : template quando não houver item na busca
	 - **templateBuscando**(TemplateRef) : template estiver buscando no servdor
	 - **indiceId** (string) padrão 'id': o valor da posição que se encontra o id primario
	 - **indiceNome** (string) padrão 'nome': o valor da posição que se encontra o nome a ser exibido
 - **Outputs**
	 - **onAbrir** (boolean) true: dispara quando abre o elemento
	 - **onBuscar** (string): dispara quando faz alguma busca informando o que foi digitado
	 - **onSelecionarItem** (object): dispara quando seleciona um item passando o item selecionado
	 - **onLimpar** (boolean) true: dispara quando limpa o elemento
	 - **onFechar** (boolean) true: dispara quando fecha o elemento


----------


**Select Resquest Multiple**
```typescript
    <select2-request-multiple
        [(ngModel)]="valorSelecionado"
        [url]="url"
        [processaParametros]="processaParametros"
        [processaResultado]="processaResultado"
    >
    </select2-request-multiple>
```
 - **Inputs**
	 - **processaParametro** (function): é chamado quando vai fazer a pesquisa no servidor, o retorno desta função irá junto com a url para buscar
	 - **processaResultado** (function): é chamado quando termina de executar a busca, passando o resultado da busca por parametro. pegando o retorno desta função para usar como valores a ser exibido
	 - **placeholder** (string): placeholder quando não houver item selecionado
	 - **templateResultado** (TemplateRef): template da lista de itens exibidos
	 - **templateSelecionado** (TemplateRef): template quando selecionar um item
	 - **templateSemResultado**(TemplateRef) : template quando não houver item na busca
	 - **templateBuscando**(TemplateRef) : template estiver buscando no servdor
	 - **indiceId** (string) padrão 'id': o valor da posição que se encontra o id primario
	 - **indiceNome** (string) padrão 'nome': o valor da posição que se encontra o nome a ser exibido
 - **Outputs**
	 - **onAbrir** (boolean) true: dispara quando abre o elemento
	 - **onBuscar** (string): dispara quando faz alguma busca informando o que foi digitado
	 - **onSelecionarItem** (object): dispara quando seleciona um item passando o item selecionado
	 - **onRemoverItem** (object): dispara quando remove um item selecionado, passando o item por parametro
	 - **onFechar** (boolean) true: dispara quando fecha o elemento