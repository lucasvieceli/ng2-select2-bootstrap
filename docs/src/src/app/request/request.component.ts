import {Component} from '@angular/core'

@Component({
  templateUrl: './request.component.html',
})
export class RequestComponent {
  logs : any  = [];
  objProcessaParametros = {enviado: { pagina: 'Página atual que está pesquisando', valorPesquisado: 'Valor que foi pesquisado'}, retorno: {}};
  objProcessaResultado = {enviado: {}, retorno: {}};

  codigoUtilizado = `
     <template #templateResultado let-valor>
          <div style="padding-top: 4px;padding-bottom: 3px;">
              <div style="float: left;width: 60px;margin-right: 10px;">
                  <img [src]="valor.owner.avatar_url" width="60">
              </div>
              <div style="margin-left: 70px;">
                  <div style="color: black">{{valor.name}}</div>
                  <div style="font-size: 13px;color: black;margin-top: 4px;">{{valor.description}}</div>
                  <div>
                      <div style="display: inline-block;color: black;font-size: 11px;margin-right: 1em;">
                          <i class="fa fa-flash"></i>
                          {{valor.forks_count}}
                          Forks
                      </div>
                      <div style="display: inline-block;color: black;font-size: 11px;margin-right: 1em;">
                          <i class="fa fa-star"></i> {{valor.stargazers_count}} Stars
                      </div>
                      <div style="display: inline-block;color: black;font-size: 11px;margin-right: 1em;">
                          <i class="fa fa-eye"></i>
                          {{valor.watchers_count}} Watchers
                      </div>
                  </div>
              </div>
          </div>
      </template>

      <select2-request
          [(ngModel)]="valorSelecionado"
          [templateResultado]="templateResultado"
          url="https://api.github.com/search/repositories"
          minimoCaracteres="1"
          (onAbrir)="log('onAbrir', $event)"
          (onFechar)="log('onFechar', $event)"
          (onBuscar)="log('onBuscar', $event)"
          (onSelecionarItem)="log('onSelecionarItem', $event)"
          (onLimpar)="log('onLimpar', $event)"
          (onErro)="log('onErro', $event)"
          (onProcessaParametros)="processaParametros($event)"
          (onProcessaResultado)="processaResultado($event)"
          indiceNome="name"
      >
      </select2-request>
  `;
  codigoUtilizadoComponent = `
    /**
     * processa os parametros para passar para url
     */
    processaParametros(valor){
      valor.retorno = {
        q     : valor.enviado.valorPesquisado,
        page  : valor.enviado.pagina,
      }
    }
  
    /**
     * processa o resultado do servidor
     */
    processaResultado(valor){
     valor.retorno = valor.enviado.items;
    }
  `;

  log(nome, texto){
    this.logs.push({nome: nome, texto: texto});
  }

  /**
   * processa os parametros para passar para url
   */
  processaParametros(valor){
    valor.retorno = {
      q     : valor.enviado.valorPesquisado,
      page  : valor.enviado.pagina,
    }
  }

  /**
   * processa o resultado do servidor
   */
  processaResultado(valor){
    valor.retorno = valor.enviado.items;
  }
}
