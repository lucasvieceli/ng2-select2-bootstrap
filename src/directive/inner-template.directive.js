"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var InnerTemplateDirective = (function () {
    function InnerTemplateDirective(viewContainer) {
        this.viewContainer = viewContainer;
    }
    Object.defineProperty(InnerTemplateDirective.prototype, "item", {
        set: function (item) {
            this._item = item;
            if (this.template) {
                this.template.destroy();
                this.criaTemplate();
            }
        },
        enumerable: true,
        configurable: true
    });
    InnerTemplateDirective.prototype.ngOnInit = function () {
        this.criaTemplate();
    };
    InnerTemplateDirective.prototype.criaTemplate = function () {
        if (this.templateRef) {
            this.template = this.viewContainer.createEmbeddedView(this.templateRef, {
                '\$implicit': this._item,
                'index': this.index
            });
        }
    };
    __decorate([
        core_1.Input()
    ], InnerTemplateDirective.prototype, "item");
    __decorate([
        core_1.Input()
    ], InnerTemplateDirective.prototype, "index");
    __decorate([
        core_1.Input('inner-template')
    ], InnerTemplateDirective.prototype, "templateRef");
    InnerTemplateDirective = __decorate([
        core_1.Directive({
            selector: '[inner-template]'
        })
    ], InnerTemplateDirective);
    return InnerTemplateDirective;
}());
exports.InnerTemplateDirective = InnerTemplateDirective;
//# sourceMappingURL=inner-template.directive.js.map