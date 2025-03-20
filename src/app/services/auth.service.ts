import { Injectable } from '@angular/core';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null); // BehaviorSubject para manejar el estado del usuario
  public user$ = this.userSubject.asObservable(); // Observable para suscribirse a los cambios del usuario

  constructor() {}

  // Método para iniciar sesión con Google
  async loginWithGoogle() {
    try {
      const result = await FirebaseAuthentication.signInWithGoogle();
      const user = result.user;
      this.userSubject.next(user); // Emitir el nuevo estado del usuario
      return user;
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
      throw error;
    }
  }

  // Método para cerrar sesión
  async logout() {
    try {
      await FirebaseAuthentication.signOut();
      this.userSubject.next(null); // Emitir que el usuario ha cerrado sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  // Obtener el usuario autenticado actualmente
  async getCurrentUser() {
    try {
      const user = await FirebaseAuthentication.getCurrentUser();
      this.userSubject.next(user); // Emitir el estado actual del usuario
      return user;
    } catch (error) {
      console.error('Error al obtener el usuario actual:', error);
      return null;
    }
  }
}