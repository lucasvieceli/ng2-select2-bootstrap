import {
    Component, Input, ElementRef,  forwardRef, NgZone, Output, EventEmitter,
    TemplateRef,  ViewChild
} from '@angular/core';
import {Select} from './../common/select';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector    : 'select2-tag',
    template : `
        <!--select simples-->
        <span [ngClass]="getClassGeral()" dir="ltr" (click)="abrir()">
        <span class="selection">
            <span class="select2-selection select2-selection--multiple" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="-1">
            <ul class="select2-selection__rendered">
                <span [hidden]="data.length == 0" >
                    <span [inner-template]="templateSelecionado || templateSelecionadoInterno" [item]="this"></span>
                </span>
                <li class="select2-search select2-search--inline" style="float:none">
                    <input (keyup)="keyup($event)" (keydown.enter)="$event.preventDefault()" #campoBusca class="select2-search__field" type="search" tabindex="0" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" [placeholder]="(data.length == 0) ? placeholder : ''">
                </li>
                <li class="select2-selection__arrow" role="presentation"><b role="presentation"></b></li>
            </ul>
        </span>
        </span>
        <span class="dropdown-wrapper" aria-hidden="true"></span>
    </span>

        <!--quando clicar campo-->
        <div [hidden]="!aberto">
        <span class="select2-container select2-container--bootstrap select2-container--open">
            <span class="select2-dropdown select2-dropdown--below" style="z-index: 999999" dir="ltr" >
                <span class="select2-results">
                    <ul class="select2-results__options" role="tree"  aria-expanded="true" aria-hidden="false">
                        <span [style.display]="(exibirMensagemCaracteresMinimo) ? 'none': ''">
                            <span [hidden]="valoresExibir.length == 0" >
                                <li *ngFor="let item of valoresExibir" (click)="selecionar(item)" class="select2-results__option" highlight="select2-results__option--highlighted" role="treeitem" [attr.aria-selected]="((_value) && (item == _value)) ? true : false">
                                    <span  [inner-template]="templateResultado || templateResultadoInterno" [item]="item"></span>
                                </li>
                            </span>
                            <li [style.display]="(valoresExibir.length > 0) ? 'none' : ''"  class="select2-results__option select2-results__message" aria-live="assertive">
                                <span  [inner-template]="templateSemResultado || templateSemResultadoInterno" [item]="{pesquisa:valorPesquisado}"></span>
                            </li>
                        </span>
                        <li [style.display]="(exibirMensagemCaracteresMinimo == false) ? 'none': ''" class="select2-results__option select2-results__message">
                            Digite {{minimoCaracteres}} ou mais caracteres para realizar a busca
                        </li>
                    </ul>
                </span>
            </span>
        </span>
        </div>



        <ng-template #templateSemResultadoInterno>
            Nenhum resultado encontrado
        </ng-template>
        <ng-template #templateResultadoInterno let-valor>
            {{valor}}
        </ng-template>
        <ng-template #templateSelecionadoInterno let-valor>
        <span *ngIf="valor">
            <li *ngFor="let item of valor.data" class="select2-selection__choice">
                <span class="select2-selection__choice__remove" role="presentation" (click)="valor.remove(item, $event)">×</span>
                {{item}}
            </li>
        </span>
        </ng-template>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TagComponent),
            multi: true
        }
    ],
    host: {
        '(document:click)': 'clickForaComponent($event)',
        '(focus)': 'setFocus(true)',
        '(blur)': 'setFocus(false)',
    },
})
export class TagComponent extends Select implements ControlValueAccessor{

    data = [];
    _valores = [];
    @Input() name: any = '';
    @Input() classe: any = '';
    @Input() placeholder: string = 'Selecione';
    @Input() templateResultado        : TemplateRef<any>;
    @Input() templateSelecionado      : TemplateRef<any>;
    @Input() templateSemResultado     : TemplateRef<any>;
    @Input() disabled                 : boolean = false;
    @Input() set valores(valor : any){
        this._valores = valor;
        this.valoresExibir = valor;
    }
    @Output() change            = new EventEmitter<any>();
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

    abrir() {
        if (this.disabled){
            return false;
        }
        if (this.aberto) {
            this.fechar();
        }else{
            this.aberto = true;
            if(!this._value){this._value = []}
            this.valorPesquisado    = '';
            this.campoBusca.nativeElement.focus();
            this.setFocus(true);
            this.onAbrir.emit(true);
            this.buscar();
        }
    }
    keyup(event){
        event.preventDefault();
        let valor = event.target.value;

        //enter
        if(event.keyCode == 13){

            this.selecionar(valor, false);
            this.valorPesquisado = '';
            this.buscar();
            return
        }
        //apagar
        if(event.keyCode == 8){
            this.remove(this.data[this.data.length-1], event);
            this.valorPesquisado = '';
            this.buscar();
            event.preventDefault();
            return
        }

        if(this.valorPesquisado == valor){
            return null;
        }
        this.valoresExibir = [];
        this.valorPesquisado = valor;
        this.buscar();
    }

    selecionar(item, fecharCampo = true){
        item= item.trim();
        if(item == '') {
            return false;
        }
        //verifica se ja foi adicionado
        let jaExiste = this.data.findIndex(procurar => procurar == item);
        if(jaExiste === -1) {
            this.data.push(item);
        }
        this.updateValue(this.data);

        this.onSelecionarItem.emit(item);
        if(fecharCampo) {
            this.fechar();
        }

        //apaga campo de busca
        this.campoBusca.nativeElement.value = '';
    }


    limpar(event){
        event.stopPropagation();
        this.data = [];
        this.updateValue(null);
        this.onLimpar.emit(true);
        this.aberto = false;
        this.abrir();
    }

    remove(item, event) {
        event.stopPropagation();
        // this.fechar();

        // let itens
        let posicao = this.data.findIndex(procurar => procurar == item);
        if(posicao !== -1) {
            this.data.splice(posicao,1);
        }
        this.onRemoverItem.emit(item);


        // if(this.data.length == 0){
        //     this.aberto = false;
        //     this.abrir();
        // }

        this.updateValue(this.data);
    }

    buscar(){
        if(this.validaCaracteresMinimo() == false){
            return false;
        }
        
        this.onBuscar.emit(this.valorPesquisado);
        this.valoresExibir = this._valores.filter(item => {
            let pesquisa = item.toString().toLocaleLowerCase().indexOf(this.valorPesquisado.toString().toLocaleLowerCase());
            //verifica se o item da lista original ja n esta add na lista data
            let jaFoiAdicionado = this.data.findIndex(procurar => procurar == item);
            if (pesquisa !== -1 && jaFoiAdicionado === -1) {
                return item;
            }
        });
    }



    get value(): any { return this._value; };
    @Input() set value(v) {
        if (v !== this._value) {
            this._value = (v);
            this._onChangeCallback(v);
        }
    }

    

    
    
    
    writeValue(value: any): void {
        if(!Array.isArray(value)){
            value = [];
        }
        this.data = value;
        this._value = value;
    }
    updateValue (value: any) {
        this.zone.run(() => {
            this._value = value;

            this.onChange(value);
            this._onTouchedCallback();
            this.change.emit(value);


        });
    }
    
    onChange (_: any) {}
    onTouched () {}
    registerOnChange (fn: any) { this.onChange = fn; }
    registerOnTouched (fn: any) { this.onTouched = fn; }
    _onChangeCallback (_: any) {}
    _onTouchedCallback () {}

}