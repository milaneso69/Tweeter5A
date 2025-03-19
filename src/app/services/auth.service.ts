import { Injectable } from '@angular/core';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor() {}

  // Método para iniciar sesión con Google
  async loginWithGoogle() {
    try {
      const result = await FirebaseAuthentication.signInWithGoogle();
      console.log('Usuario autenticado:', result);

      // Devuelve solo la propiedad 'user' que contiene la información básica
      return result.user;
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
      throw error;
    }
  }

  // Método para cerrar sesión
  async logout() {
    try {
      await FirebaseAuthentication.signOut();
      console.log('Sesión cerrada correctamente');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  // Obtener el usuario autenticado actualmente
  async getCurrentUser() {
    try {
      const user = await FirebaseAuthentication.getCurrentUser();
      console.log('Usuario actual:', user);
      return user;
    } catch (error) {
      console.error('Error al obtener el usuario actual:', error);
      return null;
    }
  }
}
