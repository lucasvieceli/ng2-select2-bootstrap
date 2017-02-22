import {Component} from '@angular/core'

@Component({
  templateUrl: './simples.component.html',
})
export class SimplesComponent {
  logs : any  = [];
  valores     = [
    {id: 1, nome: 'Lucas'},
    {id: 2, nome: 'João'},
    {id: 3, nome: 'guilherme'},
    {id: 4, nome: 'Thiago'},
    {id: 5, nome: 'Isadora'},
    {id: 6, nome: 'Mirella'},
    {id: 7, nome: 102},
  ];
  codigoUtilizado = `
    <!--caso queira mudar a exibição-->
     <template #exibirDiferente let-valor>
          ID: {{valor.id}}<br>
          Nome: {{valor.nome}}
      </template>

      Valor selecionado: {{valorSelecionado | json}}
      <select2-select
          [valores]="valores"
          [(ngModel)]="valorSelecionado"
          [templateResultado]="exibirDiferente"
          (onAbrir)="log('onAbrir', $event)"
          (onFechar)="log('onFechar', $event)"
          (onBuscar)="log('onBuscar', $event)"
          (onSelecionarItem)="log('onSelecionarItem', $event)"
          (onLimpar)="log('onLimpar', $event)"
      >
      </select2-select>
  `;

  log(nome, texto){
    this.logs.push({nome: nome, texto: texto});
  }
}
