import {
    Component, Input, ElementRef, forwardRef, NgZone, Output, EventEmitter,
    TemplateRef, ViewChild, Renderer, OnDestroy
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {Select} from './../common/select';
import {SelectService} from '../service/select.service';

@Component({
    selector    : 'select2-request',
    templateUrl: './request.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RequestComponent),
            multi: true
        }
    ],
    host: {
        '(document:click)': 'clickForaComponent($event)',
        '(focus)': 'abrir()',
        '(blur)': 'fechar()',
    },
})
export class RequestComponent extends Select implements OnDestroy{

    @Input() name: any = '';
    @Input() classe: any = '';
    @Input() tabIndex                 : any;
    @Input() styleItemSelecionado     : any;
    @Input() minimoCaracteres         : number = 0;
    @Input() placeholder              : string = 'Selecione';
    @Input() templateResultado        : TemplateRef<any>;
    @Input() templateLista            : TemplateRef<any>;
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
            this.setFocus(true);
            this.aberto = true;

            // this.renderer.invokeElementMethod(this.campoBusca.nativeElement, 'focus', []);
            this.pagina             = 1;
            this.semResultado       = false;
            this.quantidadePadrao   = 0;
            this.valorPesquisado    = '';
            this.campoBusca.nativeElement.value = '';
            this.setFocus(true);
            this.onAbrir.emit(true);
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

        this.buscando = true;

        // this.valoresExibir = this._valores.filter(item => item[this.indiceNome].indexOf(this.valorPesquisado) !== -1);
        let parametros = {
            enviado : {
                pagina: this.pagina,
                valorPesquisado: this.valorPesquisado,
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
                console.log(erro);
                if(erro.status == 409){
                    this.semResultado = true;
                }
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