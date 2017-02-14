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
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var select_1 = require("./../common/select");
var select_service_1 = require("../service/select.service");
var RequestComponent = RequestComponent_1 = (function (_super) {
    __extends(RequestComponent, _super);
    function RequestComponent(elementRef, zone, requisicao, renderer) {
        var _this = _super.call(this, elementRef, zone) || this;
        _this.elementRef = elementRef;
        _this.zone = zone;
        _this.requisicao = requisicao;
        _this.renderer = renderer;
        _this.name = '';
        _this.classe = '';
        _this.minimoCaracteres = 0;
        _this.placeholder = 'Selecione';
        _this.disabled = false;
        _this.indiceId = 'id';
        _this.indiceNome = 'nome';
        _this.change = new core_1.EventEmitter();
        _this.onSelecionarItem = new core_1.EventEmitter();
        _this.onBuscar = new core_1.EventEmitter();
        _this.onApagar = new core_1.EventEmitter();
        _this.onRemoverItem = new core_1.EventEmitter();
        _this.onAbrir = new core_1.EventEmitter();
        _this.onFechar = new core_1.EventEmitter();
        _this.onLimpar = new core_1.EventEmitter();
        _this.onErro = new core_1.EventEmitter();
        _this.onProcessaResultado = new core_1.EventEmitter();
        _this.onProcessaParametros = new core_1.EventEmitter();
        _this.pagina = 1;
        _this.quantidadePadrao = 0;
        _this.buscando = false;
        _this.semResultado = false;
        return _this;
    }
    RequestComponent.prototype.ngOnDestroy = function () {
        if (this.subscrebeBusca) {
            this.subscrebeBusca.unsubscribe();
        }
    };
    RequestComponent.prototype.abrir = function () {
        if (this.disabled) {
            return false;
        }
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
        if (this.validaCaracteresMinimo() == false) {
            return false;
        }
        this.buscando = true;
        // this.valoresExibir = this._valores.filter(item => item[this.indiceNome].indexOf(this.valorPesquisado) !== -1);
        var parametros = {
            enviado: {
                pagina: this.pagina,
                valorPesquisado: this.valorPesquisado,
            },
            retorno: {}
        };
        //mata o subscribe
        this.ngOnDestroy();
        this.onBuscar.emit(this.valorPesquisado);
        this.onProcessaParametros.emit(parametros);
        this.subscrebeBusca = this.requisicao.getResultados(this.url, parametros.retorno).subscribe(function (resultado) {
            var objEmit = { enviado: resultado, retorno: [] };
            _this.onProcessaResultado.emit(objEmit);
            var exibirResultado = objEmit.retorno;
            if (_this.quantidadePadrao == 0) {
                _this.quantidadePadrao = exibirResultado.length;
            }
            if (_this.quantidadePadrao != exibirResultado.length) {
                _this.semResultado = true;
            }
            _this.valoresExibir = _this.valoresExibir.concat(exibirResultado);
            _this.buscando = false;
        }, function (erro) {
            console.log(erro);
            _this.onErro.emit(erro);
            _this.buscando = false;
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
    return RequestComponent;
}(select_1.Select));
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], RequestComponent.prototype, "name", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], RequestComponent.prototype, "classe", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], RequestComponent.prototype, "tabIndex", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], RequestComponent.prototype, "minimoCaracteres", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], RequestComponent.prototype, "placeholder", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.TemplateRef)
], RequestComponent.prototype, "templateResultado", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.TemplateRef)
], RequestComponent.prototype, "templateSelecionado", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.TemplateRef)
], RequestComponent.prototype, "templateSemResultado", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.TemplateRef)
], RequestComponent.prototype, "templateBuscando", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], RequestComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], RequestComponent.prototype, "indiceId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], RequestComponent.prototype, "indiceNome", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], RequestComponent.prototype, "url", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], RequestComponent.prototype, "change", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], RequestComponent.prototype, "onSelecionarItem", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], RequestComponent.prototype, "onBuscar", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], RequestComponent.prototype, "onApagar", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], RequestComponent.prototype, "onRemoverItem", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], RequestComponent.prototype, "onAbrir", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], RequestComponent.prototype, "onFechar", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], RequestComponent.prototype, "onLimpar", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], RequestComponent.prototype, "onErro", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], RequestComponent.prototype, "onProcessaResultado", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], RequestComponent.prototype, "onProcessaParametros", void 0);
__decorate([
    core_1.ViewChild('campoBusca'),
    __metadata("design:type", core_1.ElementRef)
], RequestComponent.prototype, "campoBusca", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], RequestComponent.prototype, "value", null);
RequestComponent = RequestComponent_1 = __decorate([
    core_1.Component({
        selector: 'select2-request',
        template: "\n    <!--select simples-->\n    <span [ngClass]=\"getClassGeral()\" [tabindex]=\"tabIndex\" dir=\"ltr\" (focus)=\"abrir()\" (click)=\"abrir()\">\n        <span class=\"selection\">\n            <!--simples-->\n            <span class=\"select2-selection select2-selection--single\" role=\"combobox\" aria-haspopup=\"true\" aria-expanded=\"false\" tabindex=\"0\">\n                <span class=\"select2-selection__rendered\">\n                    <span [hidden]=\"!data\" (click)=\"limpar($event)\" class=\"select2-selection__clear\">\u00D7</span>\n                    <span [hidden]=\"!data\" [inner-template]=\"templateSelecionado || templateSelecionadoInterno\" [item]=\"data\"></span>\n                    <span [hidden]=\"data\" [innerHtml]=\"placeholder\" class=\"select2-selection__placeholder\"></span>\n    \n                </span>\n                <span class=\"select2-selection__arrow\" role=\"presentation\">\n                    <b role=\"presentation\"></b>\n                </span>\n            </span>\n        </span>\n        <span class=\"dropdown-wrapper\" aria-hidden=\"true\"></span>\n    </span>\n    \n    <!--quando clicar campo-->\n    <div [hidden]=\"!aberto\">\n        <span class=\"select2-container select2-container--bootstrap select2-container--open\">\n            <span class=\"select2-dropdown select2-dropdown--below\" dir=\"ltr\" >\n                <span class=\"select2-search select2-search--dropdown\">\n                    <input (keyup)=\"keyup($event.target.value)\" #campoBusca placeholder=\"Digite algo\" autofocus class=\"select2-search__field\" type=\"search\" tabindex=\"0\" autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"false\" role=\"textbox\">\n                </span>\n                <span class=\"select2-results\" aria-expanded=\"true\" aria-hidden=\"false\">\n                    <ul \n                        class=\"select2-results__options\" \n                        role=\"tree\"  \n                        infinite-scroll\n                        scroll-distance=\"0,30\"\n                        (OnScrollMethod)=\"onScroll()\"\n                        style=\" overflow: auto!important;\"\n                    >\n                        <span [hidden]=\"exibirMensagemCaracteresMinimo\">\n                            <span [hidden]=\"exibirMensagemCaracteresMinimo && valoresExibir.length == 0\" >\n                                <li *ngFor=\"let item of valoresExibir\" (click)=\"selecionar(item)\" class=\"select2-results__option\" highlight=\"select2-results__option--highlighted\" role=\"treeitem\" [attr.aria-selected]=\"((_value) && (item[indiceId] == _value[indiceId])) ? true : false\">\n                                    <span  [inner-template]=\"templateResultado || templateResultadoInterno\" [item]=\"item\"></span>\n                                </li>\n                            </span>\n                            <li [hidden]=\"buscando || valoresExibir.length > 0\" class=\"select2-results__option select2-results__message\" aria-live=\"assertive\">\n                                <span  [inner-template]=\"templateSemResultado || templateSemResultadoInterno\" [item]=\"{pesquisa:valorPesquisado}\"></span>\n                            </li>\n                            <li [hidden]=\"!buscando\">\n                                <span [inner-template]=\"templateBuscando || templateBuscandoInterno\"></span>\n                            </li>\n                        </span>\n                        <li [hidden]=\"exibirMensagemCaracteresMinimo == false\" class=\"select2-results__option select2-results__message\">\n                            Digite {{minimoCaracteres}} ou mais caracteres para realizar a busca\n                        </li>\n                    </ul>\n                </span>\n            </span>\n        </span>\n    </div>\n    \n    \n    \n    <template #templateSemResultadoInterno>\n        Nenhum resultado encontrado\n    </template>\n    <template #templateResultadoInterno let-valor>\n        {{valor[indiceNome]}}\n    </template>\n    <template #templateSelecionadoInterno let-valor>\n        <span *ngIf=\"valor\">\n            {{valor[indiceNome]}}\n        </span>\n    </template>\n    <template #templateBuscandoInterno>\n        <span class=\"fa fa-5x fa-refresh fa-spin\" style=\" width: auto;margin:auto 50% !important\"></span>\n    </template>\n    \n    ",
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: core_1.forwardRef(function () { return RequestComponent_1; }),
                multi: true
            }
        ],
        host: {
            '(document:click)': 'clickForaComponent($event)',
            '(focus)': 'abrir()',
            '(blur)': 'fechar()',
        },
    }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        core_1.NgZone,
        select_service_1.SelectService,
        core_1.Renderer])
], RequestComponent);
exports.RequestComponent = RequestComponent;
var RequestComponent_1;
//# sourceMappingURL=request.component.js.map