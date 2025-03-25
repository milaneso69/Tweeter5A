import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.page.html',
  styleUrls: ['./buscador.page.scss'],
  standalone: false,
})
export class BuscadorPage implements OnInit {
  searchText: string = '';  
  publicaciones: Array<any> = [
    { avatar: 'assets/icon/futbolicon.jpg', title: 'Futbol', content: 'En su forma más básica, el fútbol es un juego entre dos equipos de once jugadores cada uno, que intentan marcar goles chutando un balón a la portería del equipo contrario. El equipo que marca más goles gana el partido', liked: false, likes: 0, comments: [] },
    { avatar: 'assets/icon/deportes.jpeg', title: 'Deportes', content: 'Los 25 deportes señalados son: atletismo, remo, bádminton, baloncesto, boxeo, canotaje, ciclismo, ecuestre, esgrima, futbol, gimnasia, halterofilia, balonmano, hockey, judo, natación, pentatlón moderno, taekwondo, tenis, tenis de mesa, tiro, tiro con arco, triatlón, vela y voleibol.', liked: false, likes: 0, comments: [] },
    { avatar: 'assets/icon/creeper.png', title: 'Minecraft', content: 'Los juegos como Minecraft que permiten la exploración y la creatividad pueden ser buenos para el aprendizaje. Estimulan el pensamiento crítico, la resolución de problemas y el pensamiento sistémico (aprender cómo funcionan las cosas de forma conjunta).', liked: false, likes: 0, comments: [] },
    { avatar: 'assets/icon/peliculas.jpg', title: 'Peliculas2025', content: '¿Cómo se llama la película más vista? N.º	Película	Taquilla (fuera de EE. UU.) Avatar	2 138 484 377 (73,1 %)', liked: false, likes: 0, comments: [] },
    { avatar: 'assets/icon/series.jpg', title: 'SeriesTV', content: '¿Cuáles son las 5 series más vistas de la historia? A continuación, te presentamos las siete series más vistas de la historia. The Big Bang Theory (2007-2019), Los Sopranos (1999-2007), Breaking Bad (2008-2013), Seinfeld (1989-1998), Friends (1994-2004), Juego de Tronos (2011-2019), MASH (1972-1983)', liked: false, likes: 0, comments: [] },
    { avatar: 'assets/icon/vader.jpg', title: 'DarthVader', content: 'Una de las frases más famosas de Darth Vader es "No, yo soy tu padre". Esta frase aparece en la película Star Wars: Episode V - The Empire Strikes Back. ', liked: false, likes: 0, comments: [] },
  ];
  publicacionesFiltradas: Array<any> = [...this.publicaciones];

  constructor(private alertController: AlertController) {}

  ngOnInit() {}

  onSearch() {
    if (this.searchText.trim() === '') {
      this.publicacionesFiltradas = [...this.publicaciones];
    } else {
      this.publicacionesFiltradas = this.publicaciones.filter(publicacion =>
        publicacion.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  likePost(post: any) {
    post.liked = !post.liked;
    post.liked ? post.likes++ : post.likes--;
  }

  async commentOnPost(post: any) {
    const alert = await this.alertController.create({
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
    const alert = await this.alertController.create({
      header: 'Crear Post',
      inputs: [{ name: 'content', type: 'text', placeholder: 'Escribe algo...' }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { 
          text: 'Publicar', 
          handler: (data) => {
            if (data.content.trim()) {
              this.publicaciones.unshift({
                avatar: "assets/icon/user.png",
                title: "Nuevo Post",
                content: data.content,
                liked: false,
                likes: 0,
                comments: []
              });
              this.publicacionesFiltradas = [...this.publicaciones];
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
      title: `Reposteado: ${post.title}`,
    };
    this.publicaciones.unshift(repost);
    this.publicacionesFiltradas = [...this.publicaciones];
  }

  async sharePost(post: any) {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Post sobre ${post.title}`,
          text: post.content,
          url: window.location.href
        });
      } catch (error) {
        console.error("Error al compartir:", error);
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Compartir',
        message: 'No se puede compartir desde este navegador. Copia y pega el siguiente texto:',
        inputs: [{ value: post.content, type: 'text', disabled: true }],
        buttons: ['Cerrar']
      });
      await alert.present();
    }
  }
}