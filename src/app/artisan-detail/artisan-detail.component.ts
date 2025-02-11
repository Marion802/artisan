import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ArtisanService } from '../artisan.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-artisan-detail',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './artisan-detail.component.html',
  styleUrls: ['./artisan-detail.component.scss']
})
export class ArtisanDetailComponent implements OnInit {
  artisan: any;
  contactForm = {
    name: '',
    subject: '',
    message: ''
  };

  constructor(private route: ActivatedRoute, private artisanService: ArtisanService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.artisanService.getArtisanById(id).subscribe(data => {
        this.artisan = data;
      });
    } else {
      // Gérer le cas où l'ID est null
      console.error('ID de l\'artisan non trouvé');
    }
  }

  sendEmail(): void {
    if (this.artisan && this.artisan.email) {
      const mailtoLink = `mailto:${this.artisan.email}?subject=${encodeURIComponent(this.contactForm.subject)}&body=${encodeURIComponent(this.contactForm.message)}`;
      window.location.href = mailtoLink;
    }
  }
}