"use strict";
var core_1 = require("@angular/core");
var Select = (function () {
    function Select(elementRef, zone) {
        this.elementRef = elementRef;
        this.zone = zone;
        this.indiceId = 'id';
        this.indiceNome = 'nome';
        this.minimoCaracteres = 0;
        this.exibirMensagemCaracteresMinimo = true;
        this.aberto = false;
        this.focus = false;
        this.disabled = false;
        this.valoresExibir = [];
        this.change = new core_1.EventEmitter();
        this.onSelecionarItem = new core_1.EventEmitter();
        this.onBuscar = new core_1.EventEmitter();
        this.onApagar = new core_1.EventEmitter();
        this.onRemoverItem = new core_1.EventEmitter();
        this.onAbrir = new core_1.EventEmitter();
        this.onFechar = new core_1.EventEmitter();
        this.onLimpar = new core_1.EventEmitter();
    }
    Select.prototype.ngOnInit = function () {
        if (this.minimoCaracteres == 0) {
            this.exibirMensagemCaracteresMinimo = false;
        }
    };
    Select.prototype.setFocus = function (valor) {
        if (this.disabled) {
            return false;
        }
        this.focus = valor;
    };
    Select.prototype.fechar = function () {
        this.aberto = false;
        this.valoresExibir = [];
        this.setFocus(true);
        this.setFocus(false);
        this.onFechar.emit(true);
    };
    Select.prototype.selecionar = function (item) {
        this.updateValue(this.data);
        this.onSelecionarItem.emit(item);
        //apaga campo de busca
        this.campoBusca.nativeElement.value = '';
        this.fechar();
    };
    Select.prototype.keyup = function (valor) {
        if (this.valorPesquisado == valor) {
            return null;
        }
        this.valoresExibir = [];
        this.valorPesquisado = valor;
        this.buscar();
    };
    Select.prototype.buscar = function () {
    };
    Select.prototype.abrir = function () {
    };
    /**
     * quando está marcado para exibir resultado completo
     */
    Select.prototype.remove = function (item, event) {
        var _this = this;
        event.stopPropagation();
        this.fechar();
        // let itens
        var posicao = this.data.findIndex(function (procurar) { return procurar[_this.indiceId] == item[_this.indiceId]; });
        if (posicao !== -1) {
            this.data.splice(posicao, 1);
        }
        this.onRemoverItem.emit(item);
        if (this.data.length == 0) {
            this.aberto = false;
            this.abrir();
        }
    };
    Select.prototype.getClassGeral = function () {
        return {
            'select2-container--focus': this.focus,
            'select2 select2-container select2-container--bootstrap select2-container--above': true,
            'select2-container--disabled': this.disabled
        };
    };
    Select.prototype.clickForaComponent = function (event) {
        if (!this.elementRef.nativeElement.contains(event.target) && this.aberto) {
            this.fechar();
        }
    };
    Select.prototype.validaCaracteresMinimo = function () {
        if (this.minimoCaracteres > 0) {
            if (this.valorPesquisado.length < this.minimoCaracteres) {
                return false;
            }
            this.exibirMensagemCaracteresMinimo = false;
        }
        return true;
    };
    Select.prototype.writeValue = function (value) {
        this.data = value;
        this._value = value;
        this.updateValue(this._value);
    };
    Select.prototype.updateValue = function (value) {
        var _this = this;
        this.zone.run(function () {
            if (_this._value != value) {
                _this._value = value;
                _this.onChange(value);
                _this._onTouchedCallback();
            }
        });
    };
    Select.prototype.onChange = function (_) { };
    Select.prototype.onTouched = function () { };
    Select.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    Select.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    Select.prototype._onChangeCallback = function (_) { };
    Select.prototype._onTouchedCallback = function () { };
    return Select;
}());
exports.Select = Select;
//# sourceMappingURL=select.js.map