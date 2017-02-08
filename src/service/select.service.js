"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require("@angular/http");
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/toPromise');
var SelectService = (function () {
    function SelectService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    SelectService.prototype.getResultados = function (url, parametros) {
        var informar = new http_1.URLSearchParams();
        if (parametros) {
            for (var parametro in parametros) {
                informar.set(parametro, parametros[parametro]);
            }
            informar.set('asdasdas', [1, 2, 3, 4].toString());
        }
        return this.http
            .get(url, { headers: this.headers, search: informar })
            .map(function (res) { return res.json(); })
            .catch(function (erro) { return erro; });
    };
    SelectService = __decorate([
        core_1.Injectable()
    ], SelectService);
    return SelectService;
}());
exports.SelectService = SelectService;
//# sourceMappingURL=select.service.js.map