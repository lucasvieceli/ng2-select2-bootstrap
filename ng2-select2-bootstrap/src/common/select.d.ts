import { ElementRef, NgZone, EventEmitter, TemplateRef, OnInit } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
export declare class Select implements ControlValueAccessor, OnInit {
    elementRef: ElementRef;
    zone: NgZone;
    protected indiceId: string;
    protected indiceNome: string;
    protected minimoCaracteres: number;
    protected exibirMensagemCaracteresMinimo: boolean;
    protected aberto: boolean;
    protected focus: boolean;
    protected campoBusca: ElementRef;
    templateResultado: TemplateRef<any>;
    templateSelecionado: TemplateRef<any>;
    templateSemResultado: TemplateRef<any>;
    templateBuscando: TemplateRef<any>;
    _value: any;
    valoresExibir: any;
    _valores: any;
    valorPesquisado: string;
    data: any;
    change: EventEmitter<any>;
    onSelecionarItem: EventEmitter<any>;
    onBuscar: EventEmitter<any>;
    onApagar: EventEmitter<any>;
    onRemoverItem: EventEmitter<any>;
    onAbrir: EventEmitter<any>;
    onFechar: EventEmitter<any>;
    onLimpar: EventEmitter<any>;
    constructor(elementRef: ElementRef, zone: NgZone);
    ngOnInit(): void;
    setFocus(valor: boolean): void;
    fechar(): void;
    selecionar(item: any): void;
    keyup(valor: any): any;
    buscar(): void;
    abrir(): void;
    /**
     * quando está marcado para exibir resultado completo
     */
    remove(item: any, event: any): void;
    getClassGeral(): "select2 select2-container select2-container--bootstrap select2-container--above select2-container--focus" | "select2 select2-container select2-container--bootstrap select2-container--above";
    clickForaComponent(event: any): void;
    validaCaracteresMinimo(): boolean;
    writeValue(value: any): void;
    updateValue(value: any): void;
    onChange(_: any): void;
    onTouched(): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    _onChangeCallback(_: any): void;
    _onTouchedCallback(): void;
}
