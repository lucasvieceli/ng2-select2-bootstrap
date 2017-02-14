import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {
    SelectComponent,
    MultipleComponent,
    RequestComponent,
    RequestMultipleComponent
} from "./src/component";
import {InnerTemplateDirective, HighlightDirective,InfiniteScrollDirective} from "./src/directive";
import {SelectService} from "./src/service";

export * from './src/component/index';
export * from './src/common/index';
export * from './src/directive/index';
export * from './src/service/index';

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
  ],
  declarations: [
    InnerTemplateDirective,
    SelectComponent,
    MultipleComponent,
    RequestComponent,
    HighlightDirective,
    RequestMultipleComponent,
    InfiniteScrollDirective,
  ],
  providers: [SelectService]
})
export class Ng2Select2BootstrapModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: Ng2Select2BootstrapModule,
      providers: [SelectService]
    };
  }
}