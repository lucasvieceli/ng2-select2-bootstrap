import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MultipleComponent} from './component/multiple.component';
import {RequestComponent} from './component/request.component';
import {RequestMultipleComponent} from './component/request-multiple.component';
import {SelectComponent} from './component/select.component';
import {HighlightDirective} from './directive/highlight.directive';
import {InfiniteScrollDirective} from './directive/infinite-scroll.directive';
import {InnerTemplateDirective} from './directive/inner-template.directive';
import {SelectService} from './service/select.service';
import {TagComponent} from './component/tag.component';
import {HiddenDirective} from './directive/hidden.directive';

@NgModule({
  imports     : [
    CommonModule,
    FormsModule,
  ],
  exports     : [
    InnerTemplateDirective,
    SelectComponent,
    MultipleComponent,
    RequestComponent,
    RequestMultipleComponent,
    FormsModule,
    TagComponent,
    HighlightDirective,
  ],
  declarations: [
    InfiniteScrollDirective,
    InnerTemplateDirective,
    SelectComponent,
    MultipleComponent,
    RequestComponent,
    HighlightDirective,
    RequestMultipleComponent,
    TagComponent,
    HiddenDirective,
  ],
  providers: [SelectService]
})
export class Ng2Select2BootstrapModule {
 
}
