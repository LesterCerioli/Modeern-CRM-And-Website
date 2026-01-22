// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from './app/app.module';


// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));


import { startApiKeepAlive } from './services/keepAliveService';

async function bootstrap() {
    
    startApiKeepAlive();

    console.log("🚀 Sistema iniciado e Worker de Keep-Alive rodando em background.");

    
}

bootstrap();
