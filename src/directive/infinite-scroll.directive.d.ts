import { ElementRef, EventEmitter } from '@angular/core';
export declare class InfiniteScrollDirective {
    element: ElementRef;
    _element: any;
    _count: number;
    scrollTrigger: number;
    OnScrollMethod: EventEmitter<any>;
    constructor(element: ElementRef);
    onScroll(): void;
}
