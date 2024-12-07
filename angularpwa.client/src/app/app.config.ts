import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { InventoryUpdateService } from './inventoryUpdate.service';
import { SwPush, provideServiceWorker } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';
import { BlobStorageService } from './blobstorage.service';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    //provideZoneChangeDetection({ eventCoalescing: true }),
    provideServiceWorker('ngsw-worker.js'),
    provideRouter(routes),
    InventoryUpdateService,
    BlobStorageService,
    //{ provide: InventoryUpdateService, useClass: InventoryUpdateService },
    //{ provide: SwPush, useClass: SwPush }
  ]
};
