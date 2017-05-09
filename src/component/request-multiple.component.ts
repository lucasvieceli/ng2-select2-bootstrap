import {
    Component, Input, ElementRef, forwardRef, NgZone, Output, EventEmitter,
    TemplateRef, ViewChild, Renderer, OnDestroy
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";
import {Select} from './../common/select';
import {SelectService} from "../service/select.service";

@Component({
    selector    : 'select2-request-multiple',
    template    : `
    <span [ngClass]="getClassGeral()"  dir="ltr" (click)="abrir()">
        <span class="selection">
            <span class="select2-selection select2-selection--multiple" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="-1">
            <ul class="select2-selection__rendered">
                <li [hidden]="data" [innerHtml]="placeholder"  class="select2-selection__placeholder"></li>
                <span [hidden]="!data" >
                    <span [inner-template]="templateSelecionado || templateSelecionadoInterno" [item]="this"></span>
                </span>
                <li class="select2-selection__arrow" role="presentation"><b role="presentation"></b></li>
            </ul>
        </span>
        </span>
        <span class="dropdown-wrapper" aria-hidden="true"></span>
    </span>
    
    <!--quando clicar campo-->
    <div [hidden]="!aberto">
        <span class="select2-container select2-container--bootstrap select2-container--open">
            <span class="select2-dropdown select2-dropdown--below" dir="ltr" >
                <span class="select2-search select2-search--dropdown">
                    <input (keyup)="keyup($event.target.value)" #campoBusca placeholder="Digite algo" autofocus class="select2-search__field" type="search" tabindex="0" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox">
                </span>
                <span class="select2-results" aria-expanded="true" aria-hidden="false">
                    <ul 
                        class="select2-results__options" 
                        role="tree"  
                        infinite-scroll
                        scroll-distance="0,30"
                        (OnScrollMethod)="onScroll()"
                        style=" overflow: auto!important;"
                    >
                        <span [hidden]="exibirMensagemCaracteresMinimo">
                            <span [hidden]="valoresExibir.length == 0" >
                                <li *ngFor="let item of valoresExibir" (click)="selecionar(item)" class="select2-results__option" highlight="select2-results__option--highlighted" role="treeitem" [attr.aria-selected]="((_value) && (item[indiceId] == _value[indiceId])) ? true : false">
                                    <span  [inner-template]="templateResultado || templateResultadoInterno" [item]="item"></span>
                                </li>
                            </span>
                            <li [hidden]="buscando || valoresExibir.length > 0" class="select2-results__option select2-results__message" aria-live="assertive">
                                <span  [inner-template]="templateSemResultado || templateSemResultadoInterno" [item]="{pesquisa:valorPesquisado}"></span>
                            </li>
                            <li [hidden]="!buscando">
                                <span [inner-template]="templateBuscando || templateBuscandoInterno"></span>
                            </li>
                        </span>
                        <li [hidden]="exibirMensagemCaracteresMinimo == false" class="select2-results__option select2-results__message">
                            Digite {{minimoCaracteres}} ou mais caracteres para realizar a busca
                        </li>
                    </ul>
                </span>
            </span>
        </span>
    </div>
    
    
    
    <template #templateSemResultadoInterno>
        Nenhum resultado encontrado
    </template>
    <template #templateResultadoInterno let-valor>
        {{valor[indiceNome]}}
    </template>
    <template #templateSelecionadoInterno let-valor>
       <span *ngIf="valor">
            <li *ngFor="let item of valor.data" class="select2-selection__choice">
                <span class="select2-selection__choice__remove" role="presentation" (click)="valor.remove(item, $event)">×</span>
                {{item[indiceNome]}}
            </li>
        </span>
    </template>
    <template #templateBuscandoInterno>
        <span class="fa fa-5x fa-refresh fa-spin" style=" width: auto;margin:auto 50% !important"></span>
    </template>
    
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RequestMultipleComponent),
            multi: true
        }
    ],
    host: {
        '(document:click)': 'clickForaComponent($event)',
        '(focus)': 'setFocus(true)',
        '(blur)': 'setFocus(false)',
    },
})
export class RequestMultipleComponent extends Select implements OnDestroy{


    @Input() name                     : any = '';
    @Input() classe                   : any = '';
    @Input() placeholder              : string = 'Selecione';
    @Input() minimoCaracteres         : number = 0;
    @Input() templateResultado        : TemplateRef<any>;
    @Input() templateSelecionado      : TemplateRef<any>;
    @Input() templateSemResultado     : TemplateRef<any>;
    @Input() templateBuscando         : TemplateRef<any>;
    @Input() disabled                 : boolean = false;
    @Input() indiceId                 : string = 'id';
    @Input() indiceNome               : string = 'nome';
    @Input() url                      : string;
 
    
    @Output() change            = new EventEmitter<any>();
    @Output() onSelecionarItem  = new EventEmitter<any>();
    @Output() onBuscar          = new EventEmitter<any>();
    @Output() onApagar          = new EventEmitter<any>();
    @Output() onRemoverItem     = new EventEmitter<any>();
    @Output() onAbrir           = new EventEmitter<any>();
    @Output() onFechar          = new EventEmitter<any>();
    @Output() onLimpar          = new EventEmitter<any>();
    @Output() onErro            = new EventEmitter<any>();
    @Output() onProcessaResultado  = new EventEmitter<any>();
    @Output() onProcessaParametros = new EventEmitter<any>();
    @ViewChild('campoBusca') campoBusca : ElementRef;

    public pagina          : number = 1;
    public quantidadePadrao: number = 0;
    public buscando        : boolean = false;
    public semResultado    : boolean = false;
    public subscrebeBusca  : any;


    constructor(
        public elementRef   : ElementRef,
        public zone         : NgZone,
        public requisicao   : SelectService,
        public renderer     : Renderer
    ){
        super(elementRef, zone);
    }

    ngOnDestroy(){
        if(this.subscrebeBusca){
            this.subscrebeBusca.unsubscribe();
        }
    }

    
    abrir(){
        if(this.disabled){
            return false;
        }
        
        if(this.aberto) {
            this.fechar();
        }else{
            this.aberto = true;
            if(!this.data){this.data = []}
            this.onAbrir.emit(true);

            // this.renderer.invokeElementMethod(this.campoBusca.nativeElement, 'focus', []);
            this.pagina             = 1;
            this.semResultado       = false;
            this.quantidadePadrao   = 0;
            this.valorPesquisado    = '';
            this.campoBusca.nativeElement.value = '';
            this.setFocus(true);
            this.buscar();
        }
    }
    keyup(valor){
        if(this.valorPesquisado == valor){
            return null;
        }
        this.valoresExibir = [];
        this.valorPesquisado = valor;
        this.pagina = 1;
        this.buscar();
    }

    selecionar(item){
        let jaExiste = this.data.findIndex(procurar => procurar[this.indiceId] == item[this.indiceId]);
        if(jaExiste === -1) {
            this.data.push(item);
        }

        this.updateValue(this.data);
        this.onSelecionarItem.emit(item);
        this.fechar();

        //apaga campo de busca
        this.campoBusca.nativeElement.value = '';
    }

    getSomenteId(){
        let ids = [];
        for(let item of this.data){
            ids.push(item[this.indiceId]);
        }

        return ids;
    }
    limpar(){
        this.data = [];
        this.updateValue(null);
        this.aberto = false;
        
        this.onLimpar.emit(true);
        this.abrir();
        
    }


    buscar(){
        if(this.validaCaracteresMinimo() == false){
            return false;
        }
        
        this.buscando = true;

        // this.valoresExibir = this._valores.filter(item => item[this.indiceNome].indexOf(this.valorPesquisado) !== -1);
        let parametros = {
            enviado : {
                pagina: this.pagina,
                valorPesquisado: this.valorPesquisado,
                idSelecionados: this.getSomenteId(),
            },
            retorno: {}
        };

        //mata o subscribe
        this.ngOnDestroy();
        this.onBuscar.emit(this.valorPesquisado);
        this.onProcessaParametros.emit(parametros);
        
        this.subscrebeBusca = this.requisicao.getResultados(this.url, parametros.retorno).subscribe(
            resultado =>{
                let objEmit = {enviado : resultado,retorno: []};
                this.onProcessaResultado.emit(objEmit);
                let exibirResultado = objEmit.retorno;

                if(Array.isArray(exibirResultado)) {
                    if (this.quantidadePadrao == 0) {
                        this.quantidadePadrao = exibirResultado.length;
                    }

                    if (this.quantidadePadrao != exibirResultado.length) {
                        this.semResultado = true;
                    }

                    this.valoresExibir = this.valoresExibir.concat(exibirResultado);
                }else{
                    console.log('Ng2Select2Bootstrap: retorno não é um select', exibirResultado);
                }
                this.buscando = false;
            },
            erro =>{
                this.onErro.emit(erro);
                this.buscando = false;
            }
        );
    }

    onScroll(){
        if(!this.buscando && !this.semResultado) {
            this.pagina++;
            this.buscar();
        }
    }

    get value(): any { return this._value; };
    @Input() set value(v) {
        if (v !== this._value) {
            this._value = v;
            this._onChangeCallback(v);
        }
    }

    

    
    


}