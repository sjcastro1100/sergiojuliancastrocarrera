import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { MovieDetailComponent } from '../component/movie-detail/movie-detail.component';
import { MovieProvider } from '../providers/MovieProvider';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  movies: any = []
  query_movie : string = ""
  logeado : boolean = false
  user: any = null
  constructor(
    private localNotifications : LocalNotifications,
    private movieProvider : MovieProvider,
    private apiService : ApiService,
    private modalController: ModalController,
    //private authService :AuthService,
    private storage : Storage,
    private router : Router

  ) {
   
  }

  async ngOnInit() {
    this.logeado = await this.apiService.checkLogin()
    this.user = await this.storage.get('user')
    if(this.logeado == true)
      this.getFullMovies()
  }

  /**
   * Obtiene la información de los videos, si no hay query obtiene todos las peliculas, de lo contrario busca con el parametro q
   */
  getData(){
    if(this.query_movie  == '')
      this.getFullMovies()
    else
      this.searchMovie()
  }
  /**
   * Obtiene todas las peliculas 
   */
  async getFullMovies(){
    this.movies = []
    let data = await this.movieProvider.getFullList();
    if(data){
      data.forEach(element => {
          this.movies.push(element.show);
      });
    }
  }
  /**
   * Obtiene las peliculas dadas por el parametro query
   */
  async searchMovie(){
    this.movies = []
    let data = await this.movieProvider.searchMovie(this.query_movie);
    if(data){
      data.forEach(element => {
        this.movies.push(element.show);
    });
    }
  }
  /**
   * Cierra sesion
   */
  async logout(){
    await this.storage.clear()
    this.apiService.changeStatusSesion(true)
    this.router.navigateByUrl('/login')
  }

  /**
   * Muestra los detalles de la pelicula
   * @param movie 
   */
  async movieDetail(movie){
    const modal = await this.modalController.create({
      component: MovieDetailComponent,
      componentProps:{movie : movie}
    });
    modal.present();

  }

}
