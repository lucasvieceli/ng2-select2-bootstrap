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
    return InnerTemplateDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], InnerTemplateDirective.prototype, "item", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], InnerTemplateDirective.prototype, "index", void 0);
__decorate([
    core_1.Input('inner-template'),
    __metadata("design:type", core_1.TemplateRef)
], InnerTemplateDirective.prototype, "templateRef", void 0);
InnerTemplateDirective = __decorate([
    core_1.Directive({
        selector: '[inner-template]'
    }),
    __metadata("design:paramtypes", [core_1.ViewContainerRef])
], InnerTemplateDirective);
exports.InnerTemplateDirective = InnerTemplateDirective;
//# sourceMappingURL=inner-template.directive.js.map