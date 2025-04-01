import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// 🔥 Importa Firebase y su configuración
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './environments/firebase.config';

// 🔥 Inicializa Firebase
initializeApp(firebaseConfig);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
