import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit{
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
        comments: []
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
        comments: ["¡Felicidades!", "¿Cuántas horas te tomó?"]
      }
    ];
  
    constructor(private alertCtrl: AlertController, private router:Router) {}
  
    likePost(post: any) {
      post.liked = !post.liked;
      post.liked ? post.likes++ : post.likes--;
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
              // Validamos que el comentario no esté vacío
              if (data.comment.trim()) {
                post.comments.push(data.comment);
              } else {
                // Mostrar un mensaje si no hay comentario
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
              // Verificamos si el contenido no está vacío
              if (data.content.trim()) {
                this.posts.unshift({
                  id: this.posts.length + 1,
                  author: "Tú",
                  email: "email@gmail.com",
                  time: "20 min",
                  avatar: "assets/icon/user.png",
                  content: data.content,
                  img: "",
                  liked: false,
                  likes: 0,
                  comments: []
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
  
    ngOnInit() {
  }
}
