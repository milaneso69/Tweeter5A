import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  posts = [
    {
      id: 1,
      author: "Usuario2025",
      email: "usuarios2025@gmail.com",
      time: "12 min",
      avatar: "assets/icon/user.png",
      content: "¡Hola soy Nuevo!",
      img: "assets/icon/img.png",
      liked: false,
      likes: 13,
      comments: [
        { author: "FanStarWars", email: "@fanstarwars", time: "6h", content: "¡Bienvenido!", liked: false, likes: 0 },
        { author: "GamerPro", email: "@gamerpro", time: "7h", content: "¡Qué bueno verte aquí!", liked: false, likes: 0 }
      ],
      showComments: false
    },
    {
      id: 2,
      author: "FanStarWars",
      email: "starwars@gmail.com",
      time: "25 min",
      avatar: "assets/icon/perfil.jpg",
      content: "Una de ellas, quizás la más emblemática, es la siguiente: Que la fuerza te acompañe. Se trata de la frase más conocida e icónica. Esta es solo una de las expresiones de la saga.",
      img: "assets/icon/img2.jpg",
      liked: true,
      likes: 30,
      comments: [
        { author: "Usuario2025", email: "@usuario2025", time: "10h", content: "¡Felicidades!", liked: false, likes: 0 },
        { author: "GamerPro", email: "@gamerpro", time: "11h", content: "¿Cuántas horas te tomó?", liked: false, likes: 0 }
      ],
      showComments: false
    },
    {
      id: 3,
      author: "GamerPro",
      email: "gamerpro@example.com",
      time: "30 min",
      avatar: "https://imgs.search.brave.com/0Bx80qH7SCAqs85mhb-p6uWLl7ONYRMtc5sMMh6o6II/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2UxL2U5/LzEzL2UxZTkxMzll/M2NhZDcxOGZhYjFl/NzA5NzdiZDAyM2Y5/LmpwZw",
      content: "¡Finalmente conseguí el trofeo de platino en Ghost of Tsushima! La sensación es increíble.",
      img: "https://imgs.search.brave.com/QW2XRxSj_0v9BrY49tES-RMYBKEiBuLsfF5iCFAZoYs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLmJs/b2dzLmVzLzY3OGEx/OC9naG9zdC1vZi10/c3VzaGltYTUvNDUw/XzEwMDAuanBn",
      liked: true,
      likes: 120,
      comments: [
        { author: "RetroGamer", email: "@retrogamer", time: "12h", content: "¡Qué bien, felicidades!", liked: false, likes: 0 },
        { author: "FPSMaster", email: "@fpsmaster", time: "13h", content: "¿Te costó mucho conseguirlo?", liked: false, likes: 0 }
      ],
      showComments: false
    },
    {
      id: 4,
      author: "RetroGamer",
      email: "retrogamer@example.com",
      time: "1 hour",
      avatar: "https://imgs.search.brave.com/jcnhxrKD_zeqNsphH2gxv6qumeVappNePPgm3A5yh34/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzYzLzMyLzE1/LzM2MF9GXzc2MzMy/MTU2NV9nSDRyYnNa/dGdhSGF2NmliQ0RY/UTVuV3dySmFXbWRD/Vi5qcGc",
      content: "Volviendo a los clásicos. Super Mario Bros sigue siendo uno de mis juegos favoritos.",
      img: "https://imgs.search.brave.com/WFjqMyg5FxTI2F4UAzPON8-x4cqIViXW-AEnuq6VsHE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk16QXlNR0Zo/Tm1RdE5EUTBaQzAw/WlRkakxUZzRaREV0/WkdWaU1tVmtaVFkz/WlRKbFhrRXlYa0Zx/Y0djQC5qcGc",
      liked: true,
      likes: 250,
      comments: [
        { author: "StrategyQueen", email: "@strategyqueen", time: "14h", content: "¡Un clásico de todos los tiempos!", liked: false, likes: 0 },
        { author: "Usuario2025", email: "@usuario2025", time: "15h", content: "Nunca me cansaré de este juego.", liked: false, likes: 0 }
      ],
      showComments: false
    },
    {
      id: 5,
      author: "FPSMaster",
      email: "fpsmaster@example.com",
      time: "2 hours",
      avatar: "https://imgs.search.brave.com/AE0I5Qt_XVIGNXt7kcFjT2H_F_-CD491MSIabAx3Ryw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly96aWxs/aW9uZ2FtZXIuY29t/L3VwbG9hZHMvY29k/bS9za2lucy9jaGFy/YWN0ZXIvY29kLW1v/YmlsZS1jaGFyYWN0/ZXJzLW1pbi5qcGc",
      content: "Acabo de desbloquear mi nueva skin en Call of Duty. ¡Estoy listo para la próxima partida!",
      img: "https://imgs.search.brave.com/AE0I5Qt_XVIGNXt7kcFjT2H_F_-CD491MSIabAx3Ryw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly96aWxs/aW9uZ2FtZXIuY29t/L3VwbG9hZHMvY29k/bS9za2lucy9jaGFy/YWN0ZXIvY29kLW1v/YmlsZS1jaGFyYWN0/ZXJzLW1pbi5qcGc",
      liked: false,
      likes: 45,
      comments: [
        { author: "GamerPro", email: "@gamerpro", time: "16h", content: "¡Se ve genial!", liked: false, likes: 0 },
        { author: "RetroGamer", email: "@retrogamer", time: "17h", content: "¿Es difícil conseguirla?", liked: false, likes: 0 }
      ],
      showComments: false
    },
    {
      id: 6,
      author: "StrategyQueen",
      email: "strategyqueen@example.com",
      time: "3 hours",
      avatar: "https://imgs.search.brave.com/NDixP9wgOAh7vRKivsQYOu5H3SwnyePskmO8-rkrx1A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni80MzUxLzQzNTE0/MTcucG5nP3NlbT0/YWlzX2h5YnJpZA",
      content: "Viendo mi progreso en Age of Empires IV. ¡No hay nada como una buena estrategia!",
      img: "https://imgs.search.brave.com/k0Z_4FHE-SQXWYC5de5y5hchm4VcgBqzwpwXzIAknkE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJhY2Nlc3Mu/Y29tL2Z1bGwvMTEx/MDk4OC5qcGc",
      liked: true,
      likes: 78,
      comments: [
        { author: "FPSMaster", email: "@fpsmaster", time: "18h", content: "¡Esa es una gran estrategia!", liked: false, likes: 0 },
        { author: "Usuario2025", email: "@usuario2025", time: "19h", content: "¿Has jugado todas las campañas?", liked: false, likes: 0 }
      ],
      showComments: false
    }
  ];

  user: any = null;
  showProfileMenu = false;

  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  likePost(post: any) {
    post.liked = !post.liked;
    post.liked ? post.likes++ : post.likes--;
  }

  likeComment(comment: any) {
    comment.liked = !comment.liked;
    comment.liked ? comment.likes++ : comment.likes--;
  }

  async commentOnPost(post: any) {
    const alert = await this.alertCtrl.create({
      header: 'Añadir comentario',
      inputs: [{ name: 'comment', type: 'text', placeholder: 'Escribe tu comentario...' }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Publicar',
          handler: (data) => {
            if (data.comment.trim()) {
              const newComment = {
                author: this.user?.displayName || 'Usuario',
                email: this.user?.email ? `@${this.user.email.split('@')[0]}` : '@usuario',
                time: 'Just now',
                content: data.comment,
                liked: false,
                likes: 0
              };
              post.comments.push(newComment);
              post.showComments = true;
            } else {
              alert.message = "¡El comentario no puede estar vacío!";
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async openPostModal() {
    const alert = await this.alertCtrl.create({
      header: 'Crear Post',
      inputs: [{ name: 'content', type: 'text', placeholder: 'Escribe algo...' }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Publicar',
          handler: (data) => {
            if (data.content.trim()) {
              this.posts.unshift({
                id: this.posts.length + 1,
                author: this.user?.displayName || "Usuario",
                email: this.user?.email ? `@${this.user.email.split('@')[0]}` : "@usuario",
                time: "Just now",
                avatar: this.user?.photoUrl || "assets/icon/user.png",
                content: data.content,
                img: "",
                liked: false,
                likes: 0,
                comments: [
                  { author: "FanStarWars", email: "@fanstarwars", time: "6h", content: "¡Gracias!", liked: false, likes: 0 },
                  { author: "GamerPro", email: "@gamerpro", time: "7h", content: "¡Me encanta!", liked: false, likes: 0 },
                  { author: "RetroGamer", email: "@retrogamer", time: "12h", content: "¡Qué genial!", liked: false, likes: 0 }
                ],
                showComments: false
              });
            } else {
              alert.message = "¡El contenido no puede estar vacío!";
            }
          }
        }
      ]
    });
    await alert.present();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  toggleComments(post: any) {
    post.showComments = !post.showComments;
  }
}