import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormPage } from './login-form/login-form.page';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [LoginFormPage],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild([{
      path: '',
      component : LoginFormPage
    },
    
  ])
  ]
})
export class LoginModule { }
