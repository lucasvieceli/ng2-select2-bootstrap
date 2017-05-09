import {ElementRef, NgZone, EventEmitter, TemplateRef, OnInit} from "@angular/core";
import {ControlValueAccessor} from "@angular/forms";

export class Select  implements ControlValueAccessor, OnInit{
    public indiceId      : string = 'id';
    public indiceNome    : string = 'nome';
    public minimoCaracteres : number = 0;
    public exibirMensagemCaracteresMinimo : boolean = true;
    public aberto        : boolean = false;
    public focus         : boolean = false;
    public disabled      : boolean = false;
    public campoBusca    : ElementRef;
    templateResultado        : TemplateRef<any>;
    templateSelecionado      : TemplateRef<any>;
    templateSemResultado     : TemplateRef<any>;
    templateBuscando         : TemplateRef<any>;

    public _value        :any;
    public valoresExibir : any = [];
    public _valores      : any;
    public valorPesquisado : string;
    public data          : any;
    change              = new EventEmitter<any>();
    onSelecionarItem    = new EventEmitter<any>();
    onBuscar            = new EventEmitter<any>();
    onApagar            = new EventEmitter<any>();
    onRemoverItem       = new EventEmitter<any>();
    onAbrir             = new EventEmitter<any>();
    onFechar            = new EventEmitter<any>();
    onLimpar            = new EventEmitter<any>();

    constructor(
        public elementRef   : ElementRef,
        public zone         : NgZone
    ) { }

    ngOnInit(){
        if(this.minimoCaracteres == 0){
            this.exibirMensagemCaracteresMinimo = false;
        }
    }

    setFocus(valor : boolean) {
        if(this.disabled){
            return false;
        }
        
        this.focus = valor;
    }
    fechar() {
        this.aberto = false;
        this.valoresExibir      = [];
        this.setFocus(true);
        
        this.setFocus(false);
        this.onFechar.emit(true);
    }
  
    selecionar(item){
        this.updateValue(this.data);
        this.onSelecionarItem.emit(item);
        //apaga campo de busca
        this.campoBusca.nativeElement.value = '';

        this.fechar();
    }

    keyup(valor){
        if(this.valorPesquisado == valor){
            return null;
        }
        this.valoresExibir = [];
        this.valorPesquisado = valor;
        this.buscar();
    }
    
    buscar(){
        
    }
    abrir(){
        
    }

    /**
     * quando está marcado para exibir resultado completo 
     */
    remove(item, event) {
        event.stopPropagation();
        this.fechar();

        // let itens
        let posicao = this.data.findIndex(procurar => procurar[this.indiceId] == item[this.indiceId]);
        if(posicao !== -1) {
            this.data.splice(posicao,1);
        }
        this.onRemoverItem.emit(item);


        if(this.data.length == 0){
            this.aberto = false;
            this.abrir();
        }
    }

    getClassGeral() {
        return {
            'select2-container--focus': this.focus,
            'select2 select2-container select2-container--bootstrap select2-container--above': true,
            'select2-container--disabled' : this.disabled
        };
        
    }
    clickForaComponent(event) {
        if(!this.elementRef.nativeElement.contains(event.target) && this.aberto) {
            this.fechar();
        }
    }
    
    validaCaracteresMinimo(){
        if(this.minimoCaracteres > 0) {
            if(this.valorPesquisado.length < this.minimoCaracteres){
                return false;
            }
            this.exibirMensagemCaracteresMinimo = false;
        }

        return true;
    }


    writeValue(value: any): void {
        this.data = value;
        this._value = value;
        this.updateValue(this._value);
    }
    updateValue (value: any) {
        this.zone.run(() => {
            if(this._value != value) {
                this._value = value;

                this.onChange(value);
                this._onTouchedCallback();
                // this.change.emit(value);
            }

        });
    }

    onChange (_: any) {}
    onTouched () {}
    registerOnChange (fn: any) { this.onChange = fn; }
    registerOnTouched (fn: any) { this.onTouched = fn; }
    _onChangeCallback (_: any) {}
    _onTouchedCallback () {}
}
