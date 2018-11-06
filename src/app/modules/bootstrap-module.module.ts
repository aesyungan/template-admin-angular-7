import { NgModule } from '@angular/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap';
@NgModule({
  imports: [
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule,
  ],
  exports: [
    TooltipModule,
    ModalModule,
    TabsModule,
  ],
  declarations: []
})
export class BootstrapModuleModule { }
