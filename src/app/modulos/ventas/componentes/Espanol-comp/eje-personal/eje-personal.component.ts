import { Component, OnInit } from '@angular/core';
import { ConexionService } from '../../../Service/conexion/conexion.service';
import { Router } from '@angular/router';
import { LanguageService } from '../../../Service/idioma/lan.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eje-personal',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './eje-personal.component.html',
  styleUrls: ['./eje-personal.component.scss']
})
export class EjePersonalComponent implements OnInit {
  message: string | null = null;
  isEnglish: boolean = false;

  // Datos de las personas
  people = [
    {
      name: 'Nicolas Aros',
      role: 'Sales Executive',
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/2f/3c/57/restaurant-vina-indomita.jpg?w=1100&h=-1&s=1',
      phone: '+56944205663',
      email: 'n.arossalazar@uan.cl',
      activeContracts: 4
    },
    {
      name: 'Diego Vergara',
      role: 'Sales Executive',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo50Y8Jtvo60eE6pqShktEuaIQMkpjf6IiSA&s',
      phone: '+56944205665',
      email: 'd.vergara@uan.cl',
      activeContracts: 0
    },
    {
      name: 'Carmen Elizabeth Juanita de Costa Brava Cortez',
      role: 'Sales Executive',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgWTfOUohAwNvA1O_3VY0ceGev4OPLKtgKlw&s',
      phone: '+56944205662',
      email: 'carmen.decostrabava@uan.cl',
      activeContracts: 5
    },
    {
      name: 'Cristobal Galaz',
      role: 'Sales Executive',
      image: 'https://images.visitchile.com/destinos/656_Vina_del_Mar.jpg?w=960&h=448&fit=crop&q=auto&auto=format',
      phone: '+56944205668',
      email: 'c.galazbrito@uan.cl',
      activeContracts: 3
    },
    {
      name: 'Anibal Muñoz',
      role: 'Sales Executive',
      image: 'https://valparaisoregion.org/wp-content/uploads/2022/07/quilpue2.jpg',
      phone: '+56944205660',
      email: 'a.munozyes1@uan.cl',
      activeContracts: 15
    }
  ];

  constructor(
    private router: Router, 
    private conexionService: ConexionService,
    public languageService: LanguageService 
  ) {}

  ngOnInit() {
    this.conexionService.buttonClicked$.subscribe(() => {
      this.message = '¡El botón en el componente Personal fue clickeado!';
    });

    this.isEnglish = this.router.url.includes('-en');
    this.languageService.switchLanguage(this.isEnglish ? 'en' : 'es');
  }

  sendNotification() {
    this.conexionService.notifyButtonClicked();
  }

  toggleLanguage() {
    const currentUrl = this.router.url;
    let newUrl = currentUrl;

    if (currentUrl.includes('-en')) {
      newUrl = currentUrl.replace('-en', '');  
      this.languageService.switchLanguage('es');
    } else {
      newUrl = `${currentUrl}-en`;  
      this.languageService.switchLanguage('en');
    }

    this.router.navigate([newUrl]);
  }
}
