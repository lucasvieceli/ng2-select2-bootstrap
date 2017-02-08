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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require("@angular/forms");
var select_1 = require('./../common/select');
var MultipleComponent = (function (_super) {
    __extends(MultipleComponent, _super);
    function MultipleComponent(elementRef, zone) {
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
    Object.defineProperty(MultipleComponent.prototype, "valores", {
        set: function (valor) {
            this._valores = valor;
            this.valoresExibir = valor;
        },
        enumerable: true,
        configurable: true
    });
    MultipleComponent.prototype.abrir = function () {
        if (this.aberto) {
            this.fechar();
        }
        else {
            this.aberto = true;
            if (!this.data) {
                this.data = [];
            }
            if (!this._value) {
                this._value = [];
            }
            this.valorPesquisado = '';
            this.campoBusca.nativeElement.focus();
            this.setFocus(true);
            this.onAbrir.emit(true);
            this.buscar();
        }
    };
    MultipleComponent.prototype.selecionar = function (item) {
        var _this = this;
        //verifica se ja foi adicionado
        var jaExiste = this.data.findIndex(function (procurar) { return procurar[_this.indiceId] == item[_this.indiceId]; });
        if (jaExiste === -1) {
            this.data.push(item);
        }
        this.updateValue(this.data);
        this.onSelecionarItem.emit(item);
        this.fechar();
        //apaga campo de busca
        this.campoBusca.nativeElement.value = '';
    };
    MultipleComponent.prototype.getSomenteId = function () {
        var ids = [];
        for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
            var item = _a[_i];
            ids.push(item[this.indiceId]);
        }
        return ids;
    };
    MultipleComponent.prototype.limpar = function (event) {
        event.stopPropagation();
        this.data = null;
        this.updateValue(null);
        this.onLimpar.emit(true);
        this.aberto = false;
        this.abrir();
    };
    MultipleComponent.prototype.remove = function (item, event) {
        _super.prototype.remove.call(this, item, event);
        this.updateValue(this.data);
    };
    MultipleComponent.prototype.buscar = function () {
        var _this = this;
        this.onBuscar.emit(this.valorPesquisado);
        this.valoresExibir = this._valores.filter(function (item) {
            var pesquisa = item[_this.indiceNome].toLocaleLowerCase().indexOf(_this.valorPesquisado.toLocaleLowerCase());
            //verifica se o item da lista original ja n esta add na lista data
            var jaFoiAdicionado = _this.data.findIndex(function (procurar) { return procurar[_this.indiceId] == item[_this.indiceId]; });
            if (pesquisa !== -1 && jaFoiAdicionado === -1) {
                return item;
            }
        });
    };
    Object.defineProperty(MultipleComponent.prototype, "value", {
        get: function () { return this._value; },
        set: function (v) {
            if (v !== this._value) {
                this._value = (v);
                this._onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    MultipleComponent.prototype.writeValue = function (value) {
        this.data = value;
        this._value = value;
    };
    MultipleComponent.prototype.updateValue = function (value) {
        var _this = this;
        this.zone.run(function () {
            _this._value = value;
            _this.onChange(value);
            _this._onTouchedCallback();
            _this.change.emit(value);
        });
    };
    MultipleComponent.prototype.onChange = function (_) { };
    MultipleComponent.prototype.onTouched = function () { };
    MultipleComponent.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    MultipleComponent.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    MultipleComponent.prototype._onChangeCallback = function (_) { };
    MultipleComponent.prototype._onTouchedCallback = function () { };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MultipleComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MultipleComponent.prototype, "classe", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MultipleComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', core_1.TemplateRef)
    ], MultipleComponent.prototype, "templateResultado", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', core_1.TemplateRef)
    ], MultipleComponent.prototype, "templateSelecionado", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', core_1.TemplateRef)
    ], MultipleComponent.prototype, "templateSemResultado", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MultipleComponent.prototype, "indiceId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MultipleComponent.prototype, "indiceNome", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], MultipleComponent.prototype, "valores", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MultipleComponent.prototype, "change", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MultipleComponent.prototype, "onSelecionarItem", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MultipleComponent.prototype, "onBuscar", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MultipleComponent.prototype, "onApagar", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MultipleComponent.prototype, "onRemoverItem", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MultipleComponent.prototype, "onAbrir", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MultipleComponent.prototype, "onFechar", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MultipleComponent.prototype, "onLimpar", void 0);
    __decorate([
        core_1.ViewChild('campoBusca'), 
        __metadata('design:type', core_1.ElementRef)
    ], MultipleComponent.prototype, "campoBusca", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MultipleComponent.prototype, "value", null);
    MultipleComponent = __decorate([
        core_1.Component({
            selector: 'select2-multiple',
            template: "\n    <!--select simples-->\n    <span [class]=\"getClassGeral()\" dir=\"ltr\" (click)=\"abrir()\">\n        <span class=\"selection\">\n            <span class=\"select2-selection select2-selection--multiple\" role=\"combobox\" aria-haspopup=\"true\" aria-expanded=\"false\" tabindex=\"-1\">\n            <ul class=\"select2-selection__rendered\">\n                <li [hidden]=\"data\" [innerHtml]=\"placeholder\"  class=\"select2-selection__placeholder\"></li>\n                <span [hidden]=\"!data\" >\n                    <span [inner-template]=\"templateSelecionado || templateSelecionadoInterno\" [item]=\"this\"></span>\n                </span>\n                <li class=\"select2-selection__arrow\" role=\"presentation\"><b role=\"presentation\"></b></li>\n            </ul>\n        </span>\n        </span>\n        <span class=\"dropdown-wrapper\" aria-hidden=\"true\"></span>\n    </span>\n    \n    <!--quando clicar campo-->\n    <div [hidden]=\"!aberto\">\n        <span class=\"select2-container select2-container--bootstrap select2-container--open\">\n            <span class=\"select2-dropdown select2-dropdown--below\" dir=\"ltr\" >\n                <span class=\"select2-search select2-search--dropdown\">\n                    <input (keyup)=\"keyup($event.target.value)\" #campoBusca placeholder=\"Digite algo\" autofocus class=\"select2-search__field\" type=\"search\" tabindex=\"0\" autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"false\" role=\"textbox\">\n                </span>\n                <span class=\"select2-results\">\n                    <ul class=\"select2-results__options\" role=\"tree\"  aria-expanded=\"true\" aria-hidden=\"false\">\n                        <span [hidden]=\"valoresExibir.length == 0\" >\n                            <li *ngFor=\"let item of valoresExibir\" (click)=\"selecionar(item)\" class=\"select2-results__option\" highlight=\"select2-results__option--highlighted\" role=\"treeitem\" [attr.aria-selected]=\"((_value) && (item[indiceId] == _value[indiceId])) ? true : false\">\n                                <span  [inner-template]=\"templateResultado || templateResultadoInterno\" [item]=\"item\"></span>\n                            </li>\n                        </span>\n                        <li [hidden]=\"valoresExibir.length > 0\" class=\"select2-results__option select2-results__message\" aria-live=\"assertive\">\n                            <span  [inner-template]=\"templateSemResultado || templateSemResultadoInterno\" [item]=\"{pesquisa:valorPesquisado}\"></span>\n                        </li>\n                    </ul>\n                </span>\n            </span>\n        </span>\n    </div>\n    \n    \n    \n    <template #templateSemResultadoInterno>\n        Nenhum resultado encontrado\n    </template>\n    <template #templateResultadoInterno let-valor>\n        {{valor[indiceNome]}}\n    </template>\n    <template #templateSelecionadoInterno let-valor>\n        <span *ngIf=\"valor\">\n            <li *ngFor=\"let item of valor.data\" class=\"select2-selection__choice\">\n                <span class=\"select2-selection__choice__remove\" role=\"presentation\" (click)=\"valor.remove(item, $event)\">\u00D7</span>\n                {{item[indiceNome]}}\n            </li>\n        </span>\n    </template>\n\n    \n    ",
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return MultipleComponent; }),
                    multi: true
                }
            ],
            host: {
                '(document:click)': 'clickForaComponent($event)',
                '(focus)': 'setFocus(true)',
                '(blur)': 'setFocus(false)',
            },
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.NgZone])
    ], MultipleComponent);
    return MultipleComponent;
}(select_1.Select));
exports.MultipleComponent = MultipleComponent;
//# sourceMappingURL=multiple.component.js.map