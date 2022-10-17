import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { Storage } from '@ionic/storage';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.page.html',
  styleUrls: ['./login-form.page.scss'],
})
export class LoginFormPage implements OnInit {

  formLogin: FormGroup = new FormGroup({
    email : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required]),
  })
  registered_user : any = null
  constructor(
    private storage : Storage,
    private router : Router,
    private localNotifications: LocalNotifications,
    private apiService : ApiService
  ) { 
    this.apiService.getUserRegistered().subscribe(estado => {
      this.ngOnInit()
    });
  }

  async ngOnInit() {
    this.formLogin.controls.email.setValue('')
    this.formLogin.controls.password.setValue('')
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.registered_user =  await this.storage.get('registered_user')
    if(this.registered_user || this.registered_user != undefined){
      this.formLogin.controls.email.setValue(this.registered_user.email)
      this.formLogin.controls.password.setValue(this.registered_user.password)
    }

  }

  /**
   * Inicia sesion
   * @returns 
   */
  async login(){

    if(this.formLogin.status === 'INVALID'){
      this.formLogin.markAllAsTouched()
      this.notification('Introducir correo y contraseña validos.')
      return
    }

    if(this.registered_user && this.registered_user != undefined){
      if(this.registered_user.email == this.formLogin.value.email && this.registered_user.password == this.formLogin.value.password){
        await this.storage.set('user',{email: this.formLogin.value.email, password : this.formLogin.value.password,name: this.registered_user.name,lastname : this.registered_user.lastname})
        this.notification(`${this.registered_user.name} ha iniciado sesion.`);
        this.router.navigateByUrl('/home')
      }
    }
    else
      this.notification('Correo y/o contraseña incorrectos.')
  }
  /**
   * Reedirige al formulario de registro
   */
  register(){
    this.router.navigate(['register'])
  }


  /**
   * Crea una notificacion local de mensajes de error o exito de inicio de sesion
   * @param text 
   */
  async notification(text : string){
    await this.localNotifications.schedule([{
      id: 1,
      title : 'Inicio sesion',
      text: text,
      sound: null,
      data: { secret:'' }
     },]);
  }

}
