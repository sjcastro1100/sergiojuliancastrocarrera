import { Injectable } from "@angular/core";
import { ApiService } from "../services/api.service";


@Injectable({
  providedIn: 'root'
})

export class MovieProvider {
    constructor(private api : ApiService ){}

    /**
     * Obtiene la lista completa de peliculas
     * @returns 
     */
    async getFullList(){
        let data:any = await this.api.getCors("https://api.tvmaze.com/schedule/");
        return data; 
    }
    /**
     * /**
     * Obtiene la lista de las películas mediante un query
     * @param query 
     * @returns 
     */
    async searchMovie(query:string){
        let data:any = await this.api.getCors(`https://api.tvmaze.com/search/shows?q=${query}`);
        return data; 
    }
}

