import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipePrincipalPipe } from './pipe-principal.pipe';



@NgModule({
  declarations: [PipePrincipalPipe],
  imports: [
    CommonModule,
    
  ],
  exports: [PipePrincipalPipe]
})
export class PipeModule { }
