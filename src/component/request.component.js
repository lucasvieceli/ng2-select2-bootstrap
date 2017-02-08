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
var RequestComponent = (function (_super) {
    __extends(RequestComponent, _super);
    function RequestComponent(elementRef, zone, requisicao, renderer) {
        _super.call(this, elementRef, zone);
        this.elementRef = elementRef;
        this.zone = zone;
        this.requisicao = requisicao;
        this.renderer = renderer;
        this.placeholder = 'Selecione';
        this.resultadoCompleto = false;
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
        this.pagina = 1;
        this.quantidadePadrao = 0;
        this.buscando = false;
        this.semResultado = false;
    }
    RequestComponent.prototype.ngOnDestroy = function () {
        if (this.subscrebeBusca) {
            this.subscrebeBusca.unsubscribe();
        }
    };
    RequestComponent.prototype.abrir = function () {
        if (this.aberto) {
            this.fechar();
        }
        else {
            this.setFocus(true);
            this.aberto = true;
            // this.renderer.invokeElementMethod(this.campoBusca.nativeElement, 'focus', []);
            this.pagina = 1;
            this.semResultado = false;
            this.quantidadePadrao = 0;
            this.valorPesquisado = '';
            this.campoBusca.nativeElement.value = '';
            this.setFocus(true);
            this.onAbrir.emit(true);
            this.buscar();
        }
    };
    RequestComponent.prototype.keyup = function (valor) {
        if (this.valorPesquisado == valor) {
            return null;
        }
        this.valoresExibir = [];
        this.valorPesquisado = valor;
        this.pagina = 1;
        this.buscar();
    };
    RequestComponent.prototype.selecionar = function (item) {
        this.data = item;
        _super.prototype.selecionar.call(this, item);
    };
    RequestComponent.prototype.limpar = function (event) {
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
    RequestComponent.prototype.buscar = function () {
        var _this = this;
        this.buscando = true;
        // this.valoresExibir = this._valores.filter(item => item[this.indiceNome].indexOf(this.valorPesquisado) !== -1);
        var parametros = {};
        if (typeof this.processaParametros != 'undefined') {
            var obj = {
                pagina: this.pagina,
                valorPesquisado: this.valorPesquisado
            };
            parametros = this.processaParametros(obj);
        }
        //mata o subscribe
        this.ngOnDestroy();
        this.onBuscar.emit(parametros);
        this.subscrebeBusca = this.requisicao.getResultados(this.url, parametros).subscribe(function (resultado) {
            var exibirResultado = [];
            if (typeof _this.processaResultado != 'undefined') {
                exibirResultado = _this.processaResultado(resultado);
            }
            if (_this.quantidadePadrao == 0) {
                _this.quantidadePadrao = exibirResultado.length;
            }
            if (_this.quantidadePadrao != exibirResultado.length) {
                _this.semResultado = true;
            }
            _this.valoresExibir = _this.valoresExibir.concat(exibirResultado);
            _this.buscando = false;
        }, function (erro) {
            if (typeof _this.processaErro != 'undefined') {
                _this.processaErro(erro);
            }
        });
    };
    RequestComponent.prototype.onScroll = function () {
        if (!this.buscando && !this.semResultado) {
            this.pagina++;
            this.buscar();
        }
    };
    Object.defineProperty(RequestComponent.prototype, "value", {
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
    ], RequestComponent.prototype, "name");
    __decorate([
        core_1.Input()
    ], RequestComponent.prototype, "classe");
    __decorate([
        core_1.Input()
    ], RequestComponent.prototype, "tabIndex");
    __decorate([
        core_1.Input()
    ], RequestComponent.prototype, "placeholder");
    __decorate([
        core_1.Input()
    ], RequestComponent.prototype, "templateResultado");
    __decorate([
        core_1.Input()
    ], RequestComponent.prototype, "templateSelecionado");
    __decorate([
        core_1.Input()
    ], RequestComponent.prototype, "templateSemResultado");
    __decorate([
        core_1.Input()
    ], RequestComponent.prototype, "templateBuscando");
    __decorate([
        core_1.Input()
    ], RequestComponent.prototype, "resultadoCompleto");
    __decorate([
        core_1.Input()
    ], RequestComponent.prototype, "indiceId");
    __decorate([
        core_1.Input()
    ], RequestComponent.prototype, "indiceNome");
    __decorate([
        core_1.Input()
    ], RequestComponent.prototype, "url");
    __decorate([
        core_1.Input()
    ], RequestComponent.prototype, "processaResultado");
    __decorate([
        core_1.Input()
    ], RequestComponent.prototype, "processaErro");
    __decorate([
        core_1.Input()
    ], RequestComponent.prototype, "processaParametros");
    __decorate([
        core_1.Output()
    ], RequestComponent.prototype, "change");
    __decorate([
        core_1.Output()
    ], RequestComponent.prototype, "onSelecionarItem");
    __decorate([
        core_1.Output()
    ], RequestComponent.prototype, "onBuscar");
    __decorate([
        core_1.Output()
    ], RequestComponent.prototype, "onApagar");
    __decorate([
        core_1.Output()
    ], RequestComponent.prototype, "onRemoverItem");
    __decorate([
        core_1.Output()
    ], RequestComponent.prototype, "onAbrir");
    __decorate([
        core_1.Output()
    ], RequestComponent.prototype, "onFechar");
    __decorate([
        core_1.Output()
    ], RequestComponent.prototype, "onLimpar");
    __decorate([
        core_1.ViewChild('campoBusca')
    ], RequestComponent.prototype, "campoBusca");
    __decorate([
        core_1.Input()
    ], RequestComponent.prototype, "value");
    RequestComponent = __decorate([
        core_1.Component({
            selector: 'select2-request',
            template: "\n    <!--select simples-->\n    <span [class]=\"getClassGeral()\" [tabindex]=\"tabIndex\" dir=\"ltr\" (focus)=\"abrir()\" (click)=\"abrir()\">\n        <span class=\"selection\">\n            <!--simples-->\n            <span class=\"select2-selection select2-selection--single\" role=\"combobox\" aria-haspopup=\"true\" aria-expanded=\"false\" tabindex=\"0\">\n                <span class=\"select2-selection__rendered\">\n                    <span [hidden]=\"!data\" (click)=\"limpar($event)\" class=\"select2-selection__clear\">\u00D7</span>\n                    <span [hidden]=\"!data\" [inner-template]=\"templateSelecionado || templateSelecionadoInterno\" [item]=\"data\"></span>\n                    <span [hidden]=\"data\" [innerHtml]=\"placeholder\" class=\"select2-selection__placeholder\"></span>\n    \n                </span>\n                <span class=\"select2-selection__arrow\" role=\"presentation\">\n                    <b role=\"presentation\"></b>\n                </span>\n            </span>\n        </span>\n        <span class=\"dropdown-wrapper\" aria-hidden=\"true\"></span>\n    </span>\n    \n    <!--quando clicar campo-->\n    <div [hidden]=\"!aberto\">\n        <span class=\"select2-container select2-container--bootstrap select2-container--open\">\n            <span class=\"select2-dropdown select2-dropdown--below\" dir=\"ltr\" >\n                <span class=\"select2-search select2-search--dropdown\">\n                    <input (keyup)=\"keyup($event.target.value)\" #campoBusca placeholder=\"Digite algo\" autofocus class=\"select2-search__field\" type=\"search\" tabindex=\"0\" autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"false\" role=\"textbox\">\n                </span>\n                <span class=\"select2-results\" aria-expanded=\"true\" aria-hidden=\"false\">\n                    <ul \n                        class=\"select2-results__options\" \n                        role=\"tree\"  \n                        infinite-scroll\n                        scroll-distance=\"0,30\"\n                        (OnScrollMethod)=\"onScroll()\"\n                        style=\" overflow: auto!important;\"\n                    >\n                        <span [hidden]=\"valoresExibir.length == 0\" >\n                            <li *ngFor=\"let item of valoresExibir\" (click)=\"selecionar(item)\" class=\"select2-results__option\" highlight=\"select2-results__option--highlighted\" role=\"treeitem\" [attr.aria-selected]=\"((_value) && (item[indiceId] == _value[indiceId])) ? true : false\">\n                                <span  [inner-template]=\"templateResultado || templateResultadoInterno\" [item]=\"item\"></span>\n                            </li>\n                        </span>\n                        <li [hidden]=\"buscando || valoresExibir.length > 0\" class=\"select2-results__option select2-results__message\" aria-live=\"assertive\">\n                            <span  [inner-template]=\"templateSemResultado || templateSemResultadoInterno\" [item]=\"{pesquisa:valorPesquisado}\"></span>\n                        </li>\n                        <li [hidden]=\"!buscando\">\n                            <span [inner-template]=\"templateBuscando || templateBuscandoInterno\"></span>\n                        </li>\n                    </ul>\n                </span>\n            </span>\n        </span>\n    </div>\n    \n    \n    \n    <template #templateSemResultadoInterno>\n        Nenhum resultado encontrado\n    </template>\n    <template #templateResultadoInterno let-valor>\n        {{valor[indiceNome]}}\n    </template>\n    <template #templateSelecionadoInterno let-valor>\n        <span *ngIf=\"valor\">\n            {{valor[indiceNome]}}\n        </span>\n    </template>\n    <template #templateBuscandoInterno>\n        <span class=\"fa fa-5x fa-refresh fa-spin\" style=\" width: auto;margin:auto 50% !important\"></span>\n    </template>\n    \n    ",
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return RequestComponent; }),
                    multi: true
                }
            ],
            host: {
                '(document:click)': 'clickForaComponent($event)',
                '(focus)': 'abrir()',
                '(blur)': 'fechar()'
            }
        })
    ], RequestComponent);
    return RequestComponent;
}(select_1.Select));
exports.RequestComponent = RequestComponent;
//# sourceMappingURL=request.component.js.map