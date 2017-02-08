"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require("@angular/forms");
var select_1 = require('./../common/select');
var SelectComponent = (function (_super) {
    __extends(SelectComponent, _super);
    function SelectComponent(elementRef, zone) {
        _super.call(this, elementRef, zone);
        this.elementRef = elementRef;
        this.zone = zone;
        this.placeholder = 'Selecione';
        this.indiceId = 'id';
        this.indiceNome = 'nome';
        this.change = new core_1.EventEmitter();
        this.onSelecionarItem = new core_1.EventEmitter();
        this.onBuscar = new core_1.EventEmitter();
        this.onApagar = new core_1.EventEmitter();
        this.onRemoverItem = new core_1.EventEmitter();
        this.onAbrir = new core_1.EventEmitter();
        this.onFechar = new core_1.EventEmitter();
        this.onLimpar = new core_1.EventEmitter();
    }
    Object.defineProperty(SelectComponent.prototype, "valores", {
        set: function (valor) {
            this._valores = valor;
            this.valoresExibir = valor;
        },
        enumerable: true,
        configurable: true
    });
    SelectComponent.prototype.abrir = function () {
        if (this.aberto) {
            this.fechar();
        }
        else {
            this.aberto = true;
            this.campoBusca.nativeElement.focus();
            this.valorPesquisado = '';
            this.campoBusca.nativeElement.value = '';
            this.setFocus(true);
            this.onAbrir.emit(true);
            this.buscar();
        }
    };
    SelectComponent.prototype.selecionar = function (item) {
        this.data = item;
        _super.prototype.selecionar.call(this, item);
    };
    SelectComponent.prototype.limpar = function (event) {
        event.stopPropagation();
        this.data = null;
        this.updateValue(null);
        this.onLimpar.emit(true);
        if (this.aberto) {
            this.fechar();
        }
        else {
            this.abrir();
        }
    };
    SelectComponent.prototype.buscar = function () {
        var _this = this;
        this.onBuscar.emit(this.valorPesquisado);
        this.valoresExibir = this._valores.filter(function (item) { return item[_this.indiceNome.toLocaleLowerCase()].indexOf(_this.valorPesquisado.toLocaleLowerCase()) !== -1; });
    };
    Object.defineProperty(SelectComponent.prototype, "value", {
        get: function () { return this._value; },
        set: function (v) {
            if (v !== this._value) {
                this._value = v;
                this._onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    __decorate([
        core_1.Input()
    ], SelectComponent.prototype, "name");
    __decorate([
        core_1.Input()
    ], SelectComponent.prototype, "classe");
    __decorate([
        core_1.Input()
    ], SelectComponent.prototype, "placeholder");
    __decorate([
        core_1.Input()
    ], SelectComponent.prototype, "templateResultado");
    __decorate([
        core_1.Input()
    ], SelectComponent.prototype, "templateSelecionado");
    __decorate([
        core_1.Input()
    ], SelectComponent.prototype, "templateSemResultado");
    __decorate([
        core_1.Input()
    ], SelectComponent.prototype, "indiceId");
    __decorate([
        core_1.Input()
    ], SelectComponent.prototype, "indiceNome");
    __decorate([
        core_1.Input()
    ], SelectComponent.prototype, "valores");
    __decorate([
        core_1.Output()
    ], SelectComponent.prototype, "change");
    __decorate([
        core_1.Output()
    ], SelectComponent.prototype, "onSelecionarItem");
    __decorate([
        core_1.Output()
    ], SelectComponent.prototype, "onBuscar");
    __decorate([
        core_1.Output()
    ], SelectComponent.prototype, "onApagar");
    __decorate([
        core_1.Output()
    ], SelectComponent.prototype, "onRemoverItem");
    __decorate([
        core_1.Output()
    ], SelectComponent.prototype, "onAbrir");
    __decorate([
        core_1.Output()
    ], SelectComponent.prototype, "onFechar");
    __decorate([
        core_1.Output()
    ], SelectComponent.prototype, "onLimpar");
    __decorate([
        core_1.ViewChild('campoBusca')
    ], SelectComponent.prototype, "campoBusca");
    __decorate([
        core_1.Input()
    ], SelectComponent.prototype, "value");
    SelectComponent = __decorate([
        core_1.Component({
            selector: 'select2-select',
            template: "\n    <!--select simples-->\n    <span [class]=\"getClassGeral()\" dir=\"ltr\" (click)=\"abrir()\">\n        <span class=\"selection\">\n            <!--simples-->\n            <span class=\"select2-selection select2-selection--single\" role=\"combobox\" aria-haspopup=\"true\" aria-expanded=\"false\" tabindex=\"0\">\n                <span class=\"select2-selection__rendered\">\n                    <span [hidden]=\"!data\" (click)=\"limpar($event)\" class=\"select2-selection__clear\">\u00D7</span>\n                    <span [hidden]=\"!data\" class=\"nao-fechar\" [inner-template]=\"templateSelecionado || templateSelecionadoInterno\" [item]=\"data\"></span>\n                    <span [hidden]=\"data\" [innerHtml]=\"placeholder\" class=\"select2-selection__placeholder\"></span>\n    \n                </span>\n                <span class=\"select2-selection__arrow\" role=\"presentation\">\n                    <b role=\"presentation\"></b>\n                </span>\n            </span>\n        </span>\n        <span class=\"dropdown-wrapper\" aria-hidden=\"true\"></span>\n    </span>\n    \n    <!--quando clicar campo-->\n    <div [hidden]=\"!aberto\">\n        <span class=\"select2-container select2-container--bootstrap select2-container--open\">\n            <span class=\"select2-dropdown select2-dropdown--below\" dir=\"ltr\" >\n                <span class=\"select2-search select2-search--dropdown\">\n                    <input (keyup)=\"keyup($event.target.value)\" #campoBusca placeholder=\"Digite algo\" autofocus class=\"select2-search__field\" type=\"search\" tabindex=\"0\" autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"false\" role=\"textbox\">\n                </span>\n                <span class=\"select2-results\">\n                    <ul class=\"select2-results__options\" role=\"tree\"  aria-expanded=\"true\" aria-hidden=\"false\">\n                        <span [hidden]=\"!valoresExibir.length\" >\n                            <li *ngFor=\"let item of valoresExibir\" (click)=\"selecionar(item)\" class=\"select2-results__option\" highlight=\"select2-results__option--highlighted\" role=\"treeitem\" [attr.aria-selected]=\"((_value) && (item[indiceId] == _value[indiceId])) ? true : false\">\n                                <span  class=\"nao-fechar\"  [inner-template]=\"templateResultado || templateResultadoInterno\" [item]=\"item\"></span>\n                            </li>\n                        </span>\n                        <li [hidden]=\"valoresExibir.length\" class=\"select2-results__option select2-results__message\" aria-live=\"assertive\">\n                            <span  class=\"nao-fechar\"  [inner-template]=\"templateSemResultado || templateSemResultadoInterno\" [item]=\"{pesquisa:valorPesquisado}\"></span>\n                        </li>\n                    </ul>\n                </span>\n            </span>\n        </span>\n    </div>\n    \n    \n    \n    <template #templateSemResultadoInterno>\n        Nenhum resultado encontrado\n    </template>\n    <template #templateResultadoInterno let-valor>\n        {{valor[indiceNome]}}\n    </template>\n    <template #templateSelecionadoInterno let-valor>\n        <span *ngIf=\"valor\">\n            {{valor[indiceNome]}}\n        </span>\n    </template>\n\n    \n    ",
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return SelectComponent; }),
                    multi: true
                }
            ],
            host: {
                '(document:click)': 'clickForaComponent($event)',
                '(focus)': 'setFocus(true)',
                '(blur)': 'setFocus(false)'
            }
        })
    ], SelectComponent);
    return SelectComponent;
}(select_1.Select));
exports.SelectComponent = SelectComponent;
//# sourceMappingURL=select.component.js.map