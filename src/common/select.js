"use strict";
var core_1 = require("@angular/core");
var Select = (function () {
    function Select(elementRef, zone) {
        this.elementRef = elementRef;
        this.zone = zone;
        this.indiceId = 'id';
        this.indiceNome = 'nome';
        this.aberto = false;
        this.focus = false;
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
    Select.prototype.setFocus = function (valor) {
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
        if (this.focus) {
            return 'select2 select2-container select2-container--bootstrap select2-container--above select2-container--focus';
        }
        else {
            return 'select2 select2-container select2-container--bootstrap select2-container--above';
        }
    };
    Select.prototype.clickForaComponent = function (event) {
        if (!this.elementRef.nativeElement.contains(event.target) && this.aberto) {
            console.log('mandou fecharrrr');
            this.fechar();
        }
    };
    Select.prototype.writeValue = function (value) {
        this.data = value;
        this._value = value;
        this.updateValue(this._value);
    };
    Select.prototype.updateValue = function (value) {
        var _this = this;
        this.zone.run(function () {
            _this._value = value;
            _this.onChange(value);
            _this._onTouchedCallback();
            _this.change.emit(value);
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