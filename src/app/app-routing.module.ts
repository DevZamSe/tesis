import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './src/shared/guards/login/login.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: './src/auth/auth.module#AuthModule',
  },
  {
    path: 'dashboard',
    loadChildren:
      './src/featured-modules/featured-modules.module#FeaturedModulesModule',
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
