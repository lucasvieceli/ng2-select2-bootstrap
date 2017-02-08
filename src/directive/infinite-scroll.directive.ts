import {Directive,ElementRef,Input,Output,EventEmitter} from '@angular/core';

@Directive({
    selector: '[infinite-scroll]',
    host: {
        '(scroll)':'onScroll($event)'
    }
})
export class InfiniteScrollDirective {
    public _element:any;
    public _count:number = 0;
    @Input('scroll-distance') scrollTrigger: number;
    @Output() OnScrollMethod = new EventEmitter<any>();

    constructor(public element:ElementRef) {
        this._element = this.element.nativeElement;
        if(!this.scrollTrigger) {
            this.scrollTrigger = 1;
        }
    }
    onScroll() {
        this._count++;
        if(this._element.scrollTop + this._element.clientHeight >= this._element.scrollHeight) {
            this.OnScrollMethod.emit(null);
        }else {
            if(this._element.scrollTop + this._element.clientHeight >= (this._element.scrollHeight - (this._element.scrollHeight * this.scrollTrigger))) {
                this.OnScrollMethod.emit(null);
            }
        }
    }
}
