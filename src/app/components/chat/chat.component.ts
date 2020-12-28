import { Component, OnInit } from '@angular/core';

// para cargar los mensajes
import { ChatService } from '../../providers/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',

})
export class ChatComponent implements OnInit {

  mensaje: string = "";
  elemento: any;

  constructor( public _cs: ChatService ) {

    this._cs.cargarMensajes().subscribe( () => {

      setTimeout(() =>{
        this.elemento.scrollTop = this.elemento.scrollHeight;

      },20);
    } );
  }

  ngOnInit(){
    // tengo la refencia al elemento de HTML
    this.elemento = document.getElementById('app-mensajes')
  }


  enviar_mensaje(){
    //console.log(this.mensaje);

    if (this.mensaje.length === 0) {
      return;
    }

    this._cs.agregarMensaje(this.mensaje).then( () =>this.mensaje = "" )
                                        .catch((err) => console.error('Error al enviar', err));

  }

}
