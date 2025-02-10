import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ArtisanService } from '../artisan.service';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule], 
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  artisans: any[] = [];

  constructor(private artisanService: ArtisanService) { }

  ngOnInit(): void {
    this.artisanService.getArtisans().subscribe(data => {
      this.artisans = this.getRandomArtisans(data, 3);
    });
  }

  getRandomArtisans(data: any[], count: number): any[] {
    const shuffled = data.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}