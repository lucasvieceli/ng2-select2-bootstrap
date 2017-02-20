import { OnInit, TemplateRef, ViewContainerRef } from "@angular/core";
export declare class InnerTemplateDirective implements OnInit {
    viewContainer: ViewContainerRef;
    _item: any;
    template: any;
    item: any;
    index: number;
    templateRef: TemplateRef<any>;
    constructor(viewContainer: ViewContainerRef);
    ngOnInit(): void;
    criaTemplate(): void;
}
