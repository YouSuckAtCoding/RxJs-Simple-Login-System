import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'register',
        loadChildren: () => import('../app/auth/auth.route').then(m => m.registerRoutes),
    }
];
