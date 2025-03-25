import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  posts = [
    {
      id: 1,
      author: "Usuario2025",
      email: "usuarios2025@gmail.com",
      time: "12 min",
      avatar: "assets/icon/user.png",
      content: "¡Hola soy Nuevo!",
      img: "",
      liked: false,
      likes: 15,
      comments: []
    },
    {
      id: 2,
      author: "FanStarWars",
      email: "starwars@gmail.com",
      time: "25 min",
      avatar: "assets/icon/perfil.jpg",
      content: "Una de ellas, quizás la más emblemática, es la siguiente: Que la fuerza te acompañe. Se trata de la frase más conocida e icónica.",
      img: "assets/icon/img2.jpg",
      liked: false,
      likes: 30,
      comments: []
    },
    {
      id: 3,
      author: "SonicMania",
      email: "sonic@gmail.com",
      time: "40 min",
      avatar: "assets/icon/sonic_25_anos_3618.webp",
      content: "Se supone que ambos son el mismo Sonic, ¿verdad? El Clásico es igual que el Moderno, pero más joven, y el Moderno es el mismo Sonic, pero mayor que el Clásico. Por alguna razón, los veo como personajes diferentes, como entidades distintas. Para mí, el Sonic Moderno es Sonic y el Sonic Clásico es solo otro personaje, no el mismo Sonic. ¿Alguien los ve como el mismo personaje/persona? Sé que puede ser una pregunta tonta y aleatoria, pero me pareció interesante, sobre todo con el Clásico allá por 2017.",
      img: "assets/icon/sonic.png",
      liked: false,
      likes: 500,
      comments: []
    },
    {
      id: 4,
      author: "BATMAN",
      email: "batman3002@gmail.com",
      time: "30 min",
      avatar: "assets/icon/adam-west-as-bruce-wayne-batman-in-the-movie-batman-1966.webp",
      content: "¿Quién es el más fuerte, Batman o Superman? En el terreno de pelear contra criminales, Clark Kent definitivamente le gana a Batman, pero, en la vida real de los simples mortales, Bruce Wayne sin duda lleva la ventaja, así que podemos concluir que esto es un empate (hasta que una caída en la bolsa haga que bruce pierda su fortuna).",
      img: "assets/icon/batmanwalppaper.jpg",
      liked: false,
      likes: 924,
      comments: []
    }
  ];

  constructor(private alertCtrl: AlertController) {}

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
            if (data.comment.trim()) {
              post.comments.push(data.comment);
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
                author: "Tú",
                email: "email@gmail.com",
                time: "Ahora",
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

  repeatPost(post: any) {
    const repost = {
      ...post,
      id: this.posts.length + 1,
      author: `Reposteado por Tú`,
      email: "email@gmail.com",
      time: "Ahora",
      liked: false, 
      likes: post.likes, 
      comments: [...post.comments] 
    };
    this.posts.unshift(repost);
  }

  async sharePost(post: any) {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Post de ${post.author}`,
          text: post.content,
          url: window.location.href
        });
      } catch (error) {
        console.error("Error al compartir:", error);
      }
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Compartir',
        message: 'No se puede compartir desde este navegador. Copia y pega el siguiente texto:',
        inputs: [{ value: post.content, type: 'text', disabled: true }],
        buttons: ['Cerrar']
      });
      await alert.present();
    }
  }

  ngOnInit() {}
}