import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Lista } from '../../models/lista.model';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { viewClassName } from '@angular/compiler';


@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @Input() terminada = true;

  constructor(  public deseosService: DeseosService,
                private router: Router,
                private alertCtrl: AlertController
    ) { }

  ngOnInit() {}

  listaSeleccionada( lista: Lista ) {

    if(this.terminada){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
   }
   borrarLista( lista: Lista ) {

    this.deseosService.borrarLista( lista );

   }

   async editarLista( lista: Lista, slideItem: any ) {

    const alert = await this.alertCtrl.create({
      header: 'Editar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          console.log('Cancelar');
          slideItem.close();
          }
        },
        {
          text: 'Uodate',
          handler: (data) => {
            console.log(data);
            if (data.titulo.length === 0) {
              slideItem.close();
              return;
            }
            lista.titulo = data.titulo;
            this.deseosService.guardarStorage();
            slideItem.close();
          }
        }
      ]
    });
    alert.present();
  }

}
