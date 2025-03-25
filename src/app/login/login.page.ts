import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  // Función vacía para el botón de Google (solo para mantener el botón)
  login() {
    // No se implementa ninguna funcionalidad
  }

  // Redirección a home con el botón de X
  goToHome() {
    this.router.navigate(['/tabs/home']);
  }

  // Redirección a home con el botón Next
  next() {
    this.router.navigate(['/tabs/home']);
  }
}