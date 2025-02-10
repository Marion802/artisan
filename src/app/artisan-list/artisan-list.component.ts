import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtisanService } from '../artisan.service';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-artisan-list',
  standalone: true,
  imports: [CommonModule, FooterComponent , HeaderComponent, RouterLink],
  templateUrl: './artisan-list.component.html',
  styleUrls: ['./artisan-list.component.scss']
})
export class ArtisanListComponent implements OnInit {
  artisans: any[] = [];
  category: string = '';

  constructor(private artisanService: ArtisanService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.category = params['category'];
      this.loadArtisans();
    });
  }

  loadArtisans(): void {
    this.artisanService.getArtisans().subscribe(data => {
      this.artisans = data.filter((artisan: any) => artisan.category === this.category);
    });
  }
}