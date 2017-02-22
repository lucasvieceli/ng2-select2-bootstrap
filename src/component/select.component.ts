import {
    Component, Input, ElementRef,  forwardRef, NgZone, Output, EventEmitter,
    TemplateRef,  ViewChild
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from "@angular/forms";
import {Select} from './../common/select';

@Component({
    selector    : 'select2-select',
    template    : `
    <!--select simples-->
    <span [ngClass]="getClassGeral()" dir="ltr" (click)="abrir()">
        <span class="selection">
            <!--simples-->
            <span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0">
                <span class="select2-selection__rendered">
                    <span [hidden]="!data" (click)="limpar($event)" class="select2-selection__clear">×</span>
                    <span [hidden]="!data" class="nao-fechar" [inner-template]="templateSelecionado || templateSelecionadoInterno" [item]="data"></span>
                    <span [hidden]="data" [innerHtml]="placeholder" class="select2-selection__placeholder"></span>
    
                </span>
                <span class="select2-selection__arrow" role="presentation">
                    <b role="presentation"></b>
                </span>
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
                <span class="select2-results">
                    <ul class="select2-results__options" role="tree"  aria-expanded="true" aria-hidden="false">
                        <span [hidden]="exibirMensagemCaracteresMinimo">
                            <span [hidden]="!valoresExibir.length" >
                                <li *ngFor="let item of valoresExibir" (click)="selecionar(item)" class="select2-results__option" highlight="select2-results__option--highlighted" role="treeitem" [attr.aria-selected]="((_value) && (item[indiceId] == _value[indiceId])) ? true : false">
                                    <span  [inner-template]="templateResultado || templateResultadoInterno" [item]="item"></span>
                                </li>
                            </span>
                            <li [hidden]="valoresExibir.length" class="select2-results__option select2-results__message" aria-live="assertive">
                                <span  [inner-template]="templateSemResultado || templateSemResultadoInterno" [item]="{pesquisa:valorPesquisado}"></span>
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
            {{valor[indiceNome]}}
        </span>
    </template>

    
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true
        }
    ],
    host: {
        '(document:click)': 'clickForaComponent($event)',
        '(focus)': 'setFocus(true)',
        '(blur)': 'setFocus(false)',
    },
})
export class SelectComponent extends Select{


    @Input() name                     : string = '';
    @Input() classe                   : string = '';
    @Input() placeholder              : string = 'Selecione';
    @Input() minimoCaracteres         : number = 0;
    @Input() templateResultado        : TemplateRef<any>;
    @Input() templateSelecionado      : TemplateRef<any>;
    @Input() templateSemResultado     : TemplateRef<any>;
    @Input() indiceId                 : string = 'id';
    @Input() indiceNome               : string = 'nome';
    @Input() disabled                 : boolean = false;
    @Input() set valores(valor : any){
        this._valores = valor;
        this.valoresExibir = valor;
    }
    // @Output() change            = new EventEmitter<any>();
    @Output() onSelecionarItem  = new EventEmitter<any>();
    @Output() onBuscar          = new EventEmitter<any>();
    @Output() onApagar          = new EventEmitter<any>();
    @Output() onRemoverItem     = new EventEmitter<any>();
    @Output() onAbrir           = new EventEmitter<any>();
    @Output() onFechar          = new EventEmitter<any>();
    @Output() onLimpar          = new EventEmitter<any>();
    @ViewChild('campoBusca') campoBusca : ElementRef;
    

    constructor(
        public elementRef   : ElementRef,
        public zone         : NgZone
    ){
        super(elementRef, zone);
    }

    
    abrir(){
        if(this.disabled){
            return false;
        }
        
        if(this.aberto) {
            this.fechar();
        }else{
            this.aberto = true;
            this.campoBusca.nativeElement.focus();
            this.valorPesquisado    = '';
            this.campoBusca.nativeElement.value = '';
            this.setFocus(true);
            this.onAbrir.emit(true);
            this.buscar();
        }
    }

    selecionar(item){
        this.data = item;

      super.selecionar(item);
    }
    limpar(event){
        event.stopPropagation();
        this.data = null;
        this.updateValue(null);
        this.onLimpar.emit(true);
        if(this.aberto){
            this.fechar()
        }else {
            this.abrir();
        }
    }

    buscar(){
        if(this.validaCaracteresMinimo() == false){
            return false;
        }

        this.onBuscar.emit(this.valorPesquisado);
        this.valoresExibir = this._valores.filter(item => item[this.indiceNome].toString().toLocaleLowerCase().indexOf(this.valorPesquisado.toString().toLocaleLowerCase()) !== -1);
    }



    get value(): any { return this._value; };
    @Input() set value(v) {
        if (v !== this._value) {
            this._value = v;
            this._onChangeCallback(v);
        }
    }

    

    
    


}