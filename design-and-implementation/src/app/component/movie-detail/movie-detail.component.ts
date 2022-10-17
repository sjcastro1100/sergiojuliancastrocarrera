import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {

  movie : any = null
  constructor(
    private navParams : NavParams,
    private modalController : ModalController
  ) { }

  ngOnInit() {
    this.movie = this.navParams.get('movie')
    this.setHtml()
  }

  /**
   * Añade la descripcion de la pelicua
   */
  setHtml(){
    document.getElementById('description').innerHTML= this.movie.summary
  }
 
  /**
   * Sale del modal de detalles
   */
  back(){
    this.modalController.dismiss()
  }

}
