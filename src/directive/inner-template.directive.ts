import {Input, Directive, OnInit, TemplateRef, ViewContainerRef} from "@angular/core";
@Directive({
    selector: '[inner-template]'
})
export class InnerTemplateDirective implements OnInit {

    _item       : any;
    template    : any;

    @Input() set item(item : any){
        this._item = item;

        if (this.template) {
            this.template.destroy();
            this.criaTemplate();
        }

    }

    @Input() index:number;

    @Input('inner-template')  templateRef:TemplateRef<any>;

    constructor(public viewContainer:ViewContainerRef) {
    }

    ngOnInit() {
        this.criaTemplate();
    }

    criaTemplate(){
        if(this.templateRef) {
            this.template = this.viewContainer.createEmbeddedView(this.templateRef, {
                '\$implicit': this._item,
                'index': this.index
            });
        }
    }
}