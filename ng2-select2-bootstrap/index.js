"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var component_1 = require("./src/component");
var directive_1 = require("./src/directive");
var service_1 = require("./src/service");
__export(require("./src/component/index"));
__export(require("./src/common/index"));
__export(require("./src/directive/index"));
__export(require("./src/service/index"));
var Ng2Select2BootstrapModule = Ng2Select2BootstrapModule_1 = (function () {
    function Ng2Select2BootstrapModule() {
    }
    Ng2Select2BootstrapModule.forRoot = function () {
        return {
            ngModule: Ng2Select2BootstrapModule_1,
            providers: [service_1.SelectService]
        };
    };
    return Ng2Select2BootstrapModule;
}());
Ng2Select2BootstrapModule = Ng2Select2BootstrapModule_1 = __decorate([
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
            forms_1.FormsModule,
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
    })
], Ng2Select2BootstrapModule);
exports.Ng2Select2BootstrapModule = Ng2Select2BootstrapModule;
var Ng2Select2BootstrapModule_1;
//# sourceMappingURL=index.js.map