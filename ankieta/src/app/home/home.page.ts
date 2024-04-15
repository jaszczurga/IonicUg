import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { AlertController } from '@ionic/angular';


register();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private ac: AlertController){}



  surveyCode:number=100000;

  surveyData: SurveyData = {
    University:"",
    Major:"",
    Semestr:"",
    Prowadzacy:"",
    Przedmiot:"",
    Rodzaj:"",
    Grupa:""

  }

  async changeSlide(number:number): Promise<void>{
    const swiperEl = document.querySelector('swiper-container');
    //zamiana slajdu jesli warunki!
    if(!this.surveyData.University){
      const alert = await this.ac.create({
        header:"dane ankiety",
        message:"sprawdz czy wypelniasz odpowiednia ankiete",
        buttons:['Ok']
      })
      await alert.present();
    }else{
      swiperEl?.swiper.slideNext();
    }
    
  }

  getSurveyData(){
    //1.pobranie z backend REST

    //2. przypisanie do modelu
    this.surveyData = {
      University: "UG",
      Major:"AiB",
      Semestr:"3",
      Prowadzacy:"Mr Kuciapski",
      Przedmiot:"Ionic",
      Rodzaj:"dzienne",
      Grupa:"s22-31"
    }
  }

}


interface SurveyData{
  University: string,
  Major:string,
  Semestr:string,
  Prowadzacy:string,
  Przedmiot:string,
  Rodzaj:string,
  Grupa:string
}