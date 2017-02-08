"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var core_1 = require('@angular/core');
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var component_1 = require("./src/component");
var directive_1 = require("./src/directive");
var service_1 = require("./src/service");
__export(require('./src/component'));
__export(require('./src/common'));
__export(require('./src/directive'));
__export(require('./src/service'));
var Ng2Select2BootstrapModule = (function () {
    function Ng2Select2BootstrapModule() {
    }
    Ng2Select2BootstrapModule.forRoot = function () {
        return {
            ngModule: Ng2Select2BootstrapModule,
            providers: [service_1.SelectService]
        };
    };
    Ng2Select2BootstrapModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
            ],
            exports: [
                directive_1.InnerTemplateDirective,
                component_1.SelectComponent,
                component_1.MultipleComponent,
                component_1.RequestComponent,
                component_1.RequestMultipleComponent,
            ],
            declarations: [
                directive_1.InnerTemplateDirective,
                component_1.SelectComponent,
                component_1.MultipleComponent,
                component_1.RequestComponent,
                directive_1.HighlightDirective,
                component_1.RequestMultipleComponent,
                directive_1.InfiniteScrollDirective,
            ],
            providers: [service_1.SelectService]
        }), 
        __metadata('design:paramtypes', [])
    ], Ng2Select2BootstrapModule);
    return Ng2Select2BootstrapModule;
}());
exports.Ng2Select2BootstrapModule = Ng2Select2BootstrapModule;
//# sourceMappingURL=index.js.map