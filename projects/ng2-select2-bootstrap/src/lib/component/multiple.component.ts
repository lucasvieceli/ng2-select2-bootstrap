import {
    Component, Input, ElementRef,  forwardRef, NgZone, Output, EventEmitter,
    TemplateRef,  ViewChild
} from '@angular/core';
import {Select} from './../common/select';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector    : 'select2-multiple',
    template : `
        <!--select simples-->
        <span [ngClass]="getClassGeral()" dir="ltr" (click)="abrir()">
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
                <span class="select2-results">
                    <ul class="select2-results__options" role="tree"  aria-expanded="true" aria-hidden="false">
                        <span [hidden]="exibirMensagemCaracteresMinimo">
                            <span [hidden]="valoresExibir.length == 0" >
                                <li *ngFor="let item of valoresExibir" (click)="selecionar(item)" class="select2-results__option" highlight="select2-results__option--highlighted" role="treeitem" [attr.aria-selected]="((_value) && (item[indiceId] == _value[indiceId])) ? true : false">
                                    <span  [inner-template]="templateResultado || templateResultadoInterno" [item]="item"></span>
                                </li>
                            </span>
                            <li [hidden]="valoresExibir.length > 0" class="select2-results__option select2-results__message" aria-live="assertive">
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



        <ng-template #templateSemResultadoInterno>
            Nenhum resultado encontrado
        </ng-template>
        <ng-template #templateResultadoInterno let-valor>
            {{valor[indiceNome]}}
        </ng-template>
        <ng-template #templateSelecionadoInterno let-valor>
        <span *ngIf="valor">
            <li *ngFor="let item of valor.data" class="select2-selection__choice">
                <span class="select2-selection__choice__remove" role="presentation" (click)="valor.remove(item, $event)">×</span>
                {{item[indiceNome]}}
            </li>
        </span>
        </ng-template>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MultipleComponent),
            multi: true
        }
    ],
    host: {
        '(document:click)': 'clickForaComponent($event)',
        '(focus)': 'setFocus(true)',
        '(blur)': 'setFocus(false)',
    },
})
export class MultipleComponent extends Select implements ControlValueAccessor{


    @Input() name: any = '';
    @Input() classe: any = '';
    @Input() placeholder: string = 'Selecione';
    @Input() minimoCaracteres: number = 0;
    @Input() templateResultado        : TemplateRef<any>;
    @Input() templateSelecionado      : TemplateRef<any>;
    @Input() templateSemResultado     : TemplateRef<any>;
    @Input() disabled                 : boolean = false;
    @Input() indiceId                 : string = 'id';
    @Input() indiceNome               : string = 'nome';
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
            if(!this.data){this.data = []}
            if(!this._value){this._value = []}
            this.valorPesquisado    = '';
            this.campoBusca.nativeElement.focus();
            this.setFocus(true);
            this.onAbrir.emit(true);
            this.buscar();
        }
    }

    selecionar(item){
        //verifica se ja foi adicionado
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

    limpar(event){
        event.stopPropagation();
        this.data = null;
        this.updateValue(null);
        this.onLimpar.emit(true);
        this.aberto = false;
        this.abrir();
    }
    remove(item, event){
        super.remove(item, event);
        this.updateValue(this.data);
    }

    buscar(){
        if(this.validaCaracteresMinimo() == false){
            return false;
        }
        
        this.onBuscar.emit(this.valorPesquisado);
        this.valoresExibir = this._valores.filter(item => {
            let pesquisa = item[this.indiceNome].toString().toLocaleLowerCase().indexOf(this.valorPesquisado.toString().toLocaleLowerCase());
            //verifica se o item da lista original ja n esta add na lista data
            let jaFoiAdicionado = this.data.findIndex(procurar => procurar[this.indiceId] == item[this.indiceId]);
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