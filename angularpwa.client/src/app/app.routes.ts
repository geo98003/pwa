import { Routes } from '@angular/router';
import { DogsListComponent } from './dogs-list.component';
import { InventoryComponent } from './inventory.component';
import { NotificationComponent } from './notification.component';

export const routes: Routes = [
    //{path: '', pathMatch: 'full'},
    { path: 'list', component: DogsListComponent},
    { path: 'inv', component: InventoryComponent},
    { path: 'notification', component: NotificationComponent }
];
