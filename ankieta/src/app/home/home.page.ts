import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import {AlertController, ToastController} from '@ionic/angular';


register();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  ngOnInit() {
    this.presentToast('Please fill out the survey carefully.');
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  constructor(private toastController: ToastController, private ac: AlertController){}

  //lista pytan
  questions: string[] = [
    "1. Na zajęciach była przekazywana wiedza zarówno teoretyczna, jak i praktyczna",
    "2. Zajęcia miały precyzyjne określone założenia i cele.",
    "3. Zajęcia były prowadzone w sposób jasny i zrozumiały",
    "4. Forma zajęć, wykorzysywane ćwiczenia oraz przykłady, angażowały uczestników",
    "5. Wykładowca dokonywał syntez i podsumowań partii materiału.",
    "6. Wykładowca potrafił zinteresować słuchaczy omawianym tematem.",
    "7. Zajęcia realizowane były w przyjaznej i budującej atmosferze.",
  ];

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

  answersList: Answer[] = [];
  async logAnswers(): Promise<void> {
  if (this.answersList.length !== this.questions.length) {
    const alert: HTMLIonAlertElement = await this.ac.create({
      header: 'Incomplete Survey',
      message: 'sprawdz czy wszystkie pytania są zaznaczone',
      buttons: ['OK']
    });
    await alert.present();
  } else {
    console.log(this.answersList);
    this.presentToast('Ankieta wyslana.');
    const swiperEl: any = document.querySelector('swiper-container');
    swiperEl?.swiper?.slidePrev()
  }
}



async changeSlide(slideNumber: number, next: boolean): Promise<void> {
  const swiperEl: any = document.querySelector('swiper-container');
  const currentSlide = swiperEl?.swiper?.activeIndex;
  if (currentSlide === 0 && !this.surveyData.University) {
    const alert: HTMLIonAlertElement = await this.ac.create({
      header: "dane ankiety",
      message: "sprawdz czy wypelniasz odpowiednia ankiete",
      buttons: ['Ok']
    });
    await alert.present();
  } else if (currentSlide === 1 && this.answersList.length !== this.questions.length) {
    const alert: HTMLIonAlertElement = await this.ac.create({
      header: "dane ankiety",
      message: "sprawdz czy wszystkie pytania są zaznaczone",
      buttons: ['Ok']
    });
    await alert.present();
  } else {
    next ? swiperEl?.swiper?.slideNext() : swiperEl?.swiper?.slidePrev();
  }
}

  saveAnswer(index: number, answer: number) {
    const question = this.questions[index];
    const newAnswer: Answer = {
      questionNumber: index,
      question: question,
      answer: answer
    };
    this.answersList[index] = newAnswer;
  }

  getSurveyData(){
    //1.pobranie z backend REST

    //2. przypisanie do modelu
    this.surveyData = {
      University: "UG",
      Major:"AiB",
      Semestr:"3",
      Prowadzacy:"Mr Gajewski",
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

interface Answer{
  questionNumber: number;
  question: string;
  answer: number;
}
