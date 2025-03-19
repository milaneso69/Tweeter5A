import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  user: any = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadUser();
  }

  async login() {
    try {
      // Inicia sesión con Google y asigna los datos del usuario
      this.user = await this.authService.loginWithGoogle();
      console.log('Usuario logueado:', this.user);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  }

  async logout() {
    try {
      await this.authService.logout();
      this.user = null;
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  async loadUser() {
    try {
      // Cargar el usuario actual si está logueado
      this.user = await this.authService.getCurrentUser();
    } catch (error) {
      console.error('Error al obtener usuario:', error);
    }
  }
}
