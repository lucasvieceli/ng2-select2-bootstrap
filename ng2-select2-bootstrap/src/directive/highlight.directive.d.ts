import { ElementRef } from "@angular/core";
export declare class HighlightDirective {
    elementRef: ElementRef;
    classe: any;
    constructor(elementRef: ElementRef);
    onMouseEnter(): void;
    onMouseLeave(): void;
    private highlight();
}
