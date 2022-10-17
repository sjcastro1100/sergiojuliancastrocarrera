import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  token : string

  credentials: any;

  data: any

  private user_loged : Subject<boolean> = new Subject();

  constructor(
    private storage: Storage,
    private http : HttpClient,
    private router : Router
  ) {
   
   }


   /**
    * Realiza la peticion del metodo get de una url, detalles de cors
    * @param endpoint 
    * @returns 
    */
  getCors(endpoint) {

   return fetch(endpoint).then( (res ) =>{
    return res.json().then((response) => {
      return response;
    })
   })
  }
 
  /**
    * Realiza la peticion del metodo get de una url con headers (no aplican)
    * @param endpoint 
    * @returns 
    */
  get(endpoint) {
    let url = endpoint
    return new Promise (resolve => {
      this.storage.get("bearer").then((credentials) => {
        this.credentials = credentials;
        let api_headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.credentials);
        api_headers.set('Access-Control-Allow-Origin:', '*');
        this.http.get(url,  {headers: api_headers} ).subscribe(data => {
          this.data = data;
          resolve(this.data);
        }, error => {
          console.log(JSON.stringify(error));
        });
      });
    });
  }

  /**
   * Verifica que el usuario este logeado o no
   * @returns 
   */
  async checkLogin(){
    let user_login = await this.storage.get('user')
    if(!user_login || user_login == undefined){
      this.router.navigateByUrl('login')
      return false
    }
    else
      return true
 }


 /**
  * retorna el estado de la sesion
  * @returns 
  */
  getStatusSesion(){
    return this.user_loged;
  }
  /**
   * Cambia el estado de la sesion 
   * @param status 
   */
  changeStatusSesion(status){
    this.user_loged.next(status)
  }
  /**
   * Obtiene el valor del usuario registrado
   * @returns 
   */
  getUserRegistered(){
    return this.user_loged;
  }

  /**
   * da valor al usuario registrado para emitir evento
   * @param value 
   */
  changeUserRegistered(value){
    this.user_loged.next(value)
  }
}
