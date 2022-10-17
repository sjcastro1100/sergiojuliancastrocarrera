import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { Storage } from '@ionic/storage';
import { UserProvider } from 'src/app/providers/UserProvider';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  formRegister = new FormGroup({
    email : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required]),
    name : new FormControl('',[Validators.required]),
    lastname : new FormControl('',[Validators.required]),
  })
  constructor(
    private  userProvider : UserProvider,
    private storage : Storage,
    private localNotifications: LocalNotifications,
    private router : Router,
    private apiService : ApiService
  ) { }

  ngOnInit() {
    this.getUser()
  }

  /**
   * Obtiene el usuario del api y coloca su información en los controles
   */
  async getUser(){
    let user_data = await this.userProvider.getUser();
    if(user_data.results){
      let user = user_data.results[0]
      this.formRegister.controls.email.setValue(user.email)
      this.formRegister.controls.password.setValue(user.login.password)
      this.formRegister.controls.name.setValue(user.name.first)
      this.formRegister.controls.lastname.setValue(user.name.last)
    }
    
  }

  /**
   * Registra el usuario guardandolo en el storage
   */
  async register(){
    if(this.formRegister.status === 'INVALID'){
      this.formRegister.markAllAsTouched()
      this.notification('No dejar campos vacios.')
      return
    }
    await this.storage.set('registered_user',{email: this.formRegister.value.email, password : this.formRegister.value.password,name: this.formRegister.value.name,lastname : this.formRegister.value.lastname})
    this.notification('Se ha registrado correctamente, ahora puede iniciar sesion.')
    this.login()

  }
  /**
   * Muestra las notificaciones los errores o exitos del registro de usuario
   * @param text 
   */
  async notification(text: string){
    await this.localNotifications.schedule([{
      id: 1,
      title : 'Registro',
      text: text,
      sound: null,
      data: { secret:'' }
     },]);
  }

  /**
   * Reedirige hacia el login
   */
  login(){
    this.apiService.changeUserRegistered(false)
    this.router.navigateByUrl('login')
  }
}
