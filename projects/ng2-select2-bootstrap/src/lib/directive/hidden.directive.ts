import {Directive,  ElementRef, Input} from "@angular/core";
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Directive({
    selector: '[hidden]',

})
export class HiddenDirective {

    @Input('hidden') set hidden(valor){
        if(valor) {
            this.elementRef.nativeElement.style.display = 'none'
        }else{
            this.elementRef.nativeElement.style.display = 'block'
        }
    }

    constructor(public elementRef : ElementRef){
    }


}
