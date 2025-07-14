import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArtisanListComponent } from './artisan-list/artisan-list.component';
import { ArtisanDetailComponent } from './artisan-detail/artisan-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchResultsComponent } from './search-results/search-results.component';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirige uniquement les URL vides vers /home
    { path: 'home', component: HomeComponent },
    { path: 'artisans', component: ArtisanListComponent },
    { path: 'artisan/:id', component: ArtisanDetailComponent },
    { path: 'search', component: SearchResultsComponent },
    { path: '**', component: NotFoundComponent } // Capture toutes les URL non définies
];
