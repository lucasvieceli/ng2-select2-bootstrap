import {Component} from '@angular/core'
@Component({
  templateUrl: './multiple.component.html',
})
export class MultipleComponent {
  logs : any  = [];
  valores     = [
    {id: 1, nome: 'Lucas'},
    {id: 2, nome: 'João'},
    {id: 3, nome: 'guilherme'},
    {id: 4, nome: 'Thiago'},
    {id: 5, nome: 'Isadora'},
    {id: 6, nome: 'Mirella'},
  ];
  codigoUtilizado = `
      <!--caso queira mudar a exibição-->
     <template #exibirDiferente let-valor>
          ID: {{valor.id}}<br>
          Nome: {{valor.nome}}
      </template>
      
      <!--caso queira mudar a exibição-->
      <template #exibirSelecionado let-valor>
          <li *ngFor="let item of valor.data" class="select2-selection__choice">
              <span class="select2-selection__choice__remove" role="presentation" (click)="valor.remove(item, $event)">×</span>
              {{item.nome}}( {{item.id}} )
          </li>
      </template>

      Valor selecionado: {{valorSelecionado | json}}
      <select2-multiple
            [valores]="valores"
            [(ngModel)]="valorSelecionado"
            [templateResultado]="exibirDiferente" 
            [templateSelecionado]="exibirSelecionado" 
            (onAbrir)="log('onAbrir', $event)"
            (onFechar)="log('onFechar', $event)"
            (onBuscar)="log('onBuscar', $event)"
            (onSelecionarItem)="log('onSelecionarItem', $event)"
            (onRemoverItem)="log('onRemoverItem', $event)"
        >
        </select2-multiple>
  `;

  log(nome, texto){
    this.logs.push({nome: nome, texto: texto});
  }
}
