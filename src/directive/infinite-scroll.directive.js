"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var InfiniteScrollDirective = (function () {
    function InfiniteScrollDirective(element) {
        this.element = element;
        this._count = 0;
        this.OnScrollMethod = new core_1.EventEmitter();
        this._element = this.element.nativeElement;
        if (!this.scrollTrigger) {
            this.scrollTrigger = 1;
        }
    }
    InfiniteScrollDirective.prototype.onScroll = function () {
        this._count++;
        if (this._element.scrollTop + this._element.clientHeight >= this._element.scrollHeight) {
            this.OnScrollMethod.emit(null);
        }
        else {
            if (this._element.scrollTop + this._element.clientHeight >= (this._element.scrollHeight - (this._element.scrollHeight * this.scrollTrigger))) {
                this.OnScrollMethod.emit(null);
            }
        }
    };
    __decorate([
        core_1.Input('scroll-distance')
    ], InfiniteScrollDirective.prototype, "scrollTrigger");
    __decorate([
        core_1.Output()
    ], InfiniteScrollDirective.prototype, "OnScrollMethod");
    InfiniteScrollDirective = __decorate([
        core_1.Directive({
            selector: '[infinite-scroll]',
            host: {
                '(scroll)': 'onScroll($event)'
            }
        })
    ], InfiniteScrollDirective);
    return InfiniteScrollDirective;
}());
exports.InfiniteScrollDirective = InfiniteScrollDirective;
//# sourceMappingURL=infinite-scroll.directive.js.map