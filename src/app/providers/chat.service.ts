import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Mensaje } from '../interface/mensaje.interface';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public chats: Mensaje[] = [];

  public usuario: any ={};

  constructor(private angularFirestore: AngularFirestore, public afAuth: AngularFireAuth) {

    // escucho cualquier cambio que suceda en el estado de la autentificacion
    this.afAuth.authState.subscribe( user =>{
      //console.log( 'Estado del usuario: ' , user);

      if (!user) {
        return;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    });
  }

  login( proveedor: string ) {
    if (proveedor === 'google' ) {
      this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider() );
    }else{
      this.afAuth.signInWithPopup(new firebase.default.auth.TwitterAuthProvider());
    }
  }

  logout() {
    this.usuario = {}
    this.afAuth.signOut();
  }



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
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    }

    // inserto el mensaje a firebase
    return this.itemsCollection.add( mensaje );

  }


}
