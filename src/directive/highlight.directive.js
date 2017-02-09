"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var HighlightDirective = (function () {
    function HighlightDirective(elementRef) {
        this.elementRef = elementRef;
    }
    HighlightDirective.prototype.onMouseEnter = function () {
        this.highlight();
    };
    HighlightDirective.prototype.onMouseLeave = function () {
        this.highlight();
    };
    HighlightDirective.prototype.highlight = function () {
        if (this.elementRef.nativeElement.className.indexOf(this.classe) === -1) {
            this.elementRef.nativeElement.className += ' ' + this.classe;
        }
        else {
            this.elementRef.nativeElement.classList.remove(this.classe);
        }
    };
    __decorate([
        core_1.Input('highlight')
    ], HighlightDirective.prototype, "classe");
    __decorate([
        core_1.HostListener('mouseenter')
    ], HighlightDirective.prototype, "onMouseEnter");
    __decorate([
        core_1.HostListener('mouseleave')
    ], HighlightDirective.prototype, "onMouseLeave");
    HighlightDirective = __decorate([
        core_1.Directive({
            selector: '[highlight]'
        })
    ], HighlightDirective);
    return HighlightDirective;
}());
exports.HighlightDirective = HighlightDirective;
//# sourceMappingURL=highlight.directive.js.map