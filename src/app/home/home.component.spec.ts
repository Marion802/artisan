import { ComponentFixture, TestBed } from '@angular/core/testing'; // Import des outils nécessaires pour tester les composants Angular

import { HomeComponent } from './home.component'; // Import du composant à tester

// Déclaration du bloc de test pour le composant HomeComponent
describe('HomeComponent', () => {
  let component: HomeComponent; // Variable pour stocker l'instance du composant
  let fixture: ComponentFixture<HomeComponent>; // Variable pour gérer le composant dans un environnement de test

  // Avant chaque test, configure le module de test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent] // Déclare le composant à tester dans le module de test
    })
    .compileComponents(); // Compile les composants et leurs templates

    // Crée une instance du composant et l'associe à la variable fixture
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance; // Récupère l'instance du composant
    fixture.detectChanges(); // Déclenche la détection des changements pour initialiser le composant
  });

  // Test de base pour vérifier que le composant est créé correctement
  it('should create', () => {
    expect(component).toBeTruthy(); // Vérifie que l'instance du composant existe
  });
});