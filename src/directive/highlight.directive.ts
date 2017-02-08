import {Directive, HostListener, ElementRef, Input} from "@angular/core";
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Directive({
    selector: '[highlight]',

})
export class HighlightDirective {

    @Input('highlight') classe;

    constructor(public elementRef : ElementRef){
    }


    @HostListener('mouseenter') onMouseEnter() {
        this.highlight();
    }
    @HostListener('mouseleave') onMouseLeave() {
        this.highlight();
    }
    private highlight() {
        if(this.elementRef.nativeElement.className.indexOf(this.classe) === -1){
            this.elementRef.nativeElement.className += ' '+this.classe; 
        }else{
            this.elementRef.nativeElement.classList.remove(this.classe);
        }
    }


}
