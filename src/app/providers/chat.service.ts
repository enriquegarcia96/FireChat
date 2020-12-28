import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Mensaje } from '../interface/mensaje.interface';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public chats: Mensaje[] = [];

  constructor(private angularFirestore: AngularFirestore) { }

  // metodo
  cargarMensajes(){

    this.itemsCollection = this.angularFirestore.collection<Mensaje>('chats', ref => ref.orderBy('fecha','desc').limit(5)); // ordeno los mensajes de forma asendente

    return this.itemsCollection.valueChanges().pipe(
      map((mensajes: Mensaje[])=>{
        console.log(mensajes);

        this.chats = [];
        for ( let mensaje of mensajes ){
          this.chats.unshift( mensaje );
        }
        return this.chats;

      })
    )
  }

  // agrega los mensajes a firebase
  agregarMensaje( texto: string ){

    // Objeto que le envio a firebase para grabarlo
    let mensaje: Mensaje = {
      nombre: 'Demo',
      mensaje: texto,
      fecha: new Date().getTime()
    }

    // inserto el mensaje a firebase
    return this.itemsCollection.add( mensaje );

  }


}
