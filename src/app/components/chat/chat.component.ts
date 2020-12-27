import { Component } from '@angular/core';

// para cargar los mensajes
import { ChatService } from '../../providers/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',

})
export class ChatComponent  {

  mensaje: string = "";

  constructor( public _cs: ChatService ) {

    this._cs.cargarMensajes().subscribe( (mensajes: any[])=>{
      console.log(mensajes);
    } )
  }


  enviar_mensaje(){
    console.log(this.mensaje);
  }

}
