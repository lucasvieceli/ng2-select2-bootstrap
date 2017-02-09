/**
 * @fileoverview This file is generated by the Angular 2 template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties}
 */
/* tslint:disable */
"use strict";
var import0 = require('./inner-template.directive');
var import1 = require('@angular/core/src/change_detection/change_detection_util');
var import3 = require('@angular/core/src/linker/view_utils');
var Wrapper_InnerTemplateDirective = (function () {
    function Wrapper_InnerTemplateDirective(p0) {
        this._changed = false;
        this.context = new import0.InnerTemplateDirective(p0);
        this._expr_0 = import1.UNINITIALIZED;
        this._expr_1 = import1.UNINITIALIZED;
        this._expr_2 = import1.UNINITIALIZED;
    }
    Wrapper_InnerTemplateDirective.prototype.ngOnDetach = function (view, componentView, el) {
    };
    Wrapper_InnerTemplateDirective.prototype.ngOnDestroy = function () {
    };
    Wrapper_InnerTemplateDirective.prototype.check_item = function (currValue, throwOnChange, forceUpdate) {
        if ((forceUpdate || import3.checkBinding(throwOnChange, this._expr_0, currValue))) {
            this._changed = true;
            this.context.item = currValue;
            this._expr_0 = currValue;
        }
    };
    Wrapper_InnerTemplateDirective.prototype.check_index = function (currValue, throwOnChange, forceUpdate) {
        if ((forceUpdate || import3.checkBinding(throwOnChange, this._expr_1, currValue))) {
            this._changed = true;
            this.context.index = currValue;
            this._expr_1 = currValue;
        }
    };
    Wrapper_InnerTemplateDirective.prototype.check_templateRef = function (currValue, throwOnChange, forceUpdate) {
        if ((forceUpdate || import3.checkBinding(throwOnChange, this._expr_2, currValue))) {
            this._changed = true;
            this.context.templateRef = currValue;
            this._expr_2 = currValue;
        }
    };
    Wrapper_InnerTemplateDirective.prototype.ngDoCheck = function (view, el, throwOnChange) {
        var changed = this._changed;
        this._changed = false;
        if (!throwOnChange) {
            if ((view.numberOfChecks === 0)) {
                this.context.ngOnInit();
            }
        }
        return changed;
    };
    Wrapper_InnerTemplateDirective.prototype.checkHost = function (view, componentView, el, throwOnChange) {
    };
    Wrapper_InnerTemplateDirective.prototype.handleEvent = function (eventName, $event) {
        var result = true;
        return result;
    };
    Wrapper_InnerTemplateDirective.prototype.subscribe = function (view, _eventHandler) {
        this._eventHandler = _eventHandler;
    };
    return Wrapper_InnerTemplateDirective;
}());
exports.Wrapper_InnerTemplateDirective = Wrapper_InnerTemplateDirective;
//# sourceMappingURL=inner-template.directive.ngfactory.js.map