import { Injectable } from "@angular/core";
import { ApiService } from "../services/api.service";


@Injectable({
  providedIn: 'root'
})

export class UserProvider {
    constructor(private api : ApiService ){}

    /**
     * Realiza la peticion al api para obtener un usuario
     * @returns lista de usuarios
     */
    async getUser(){
        let data:any = await this.api.get("https://randomuser.me/api/")
        return data;
        
    }
}

