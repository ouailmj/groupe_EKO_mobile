import { Component, ViewChild } from '@angular/core';
import { IonicPage, Slides, NavController, MenuController } from 'ionic-angular';

@IonicPage({
  name: 'page-initial',
  segment: 'initial',
  priority: 'high'
})

@Component({
  selector: 'page-initial',
  templateUrl: 'initial.html',
})

export class InitialPage {
  @ViewChild(Slides) slides: Slides;

  showSkip = true;

  //all data initial in EKO page initial
  slideList: Array<any> = [
    {
      title: "What is <strong>Groupe-EKO</strong>?",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus, dui accumsan cursus lacinia, nisl risus.",
      image: "assets/img/init1.png",
    },
    {
      title: "Why <strong>Groupe-EKO</strong>?",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus, dui accumsan cursus lacinia, nisl risus.",
      image: "assets/img/init3.png",
    },
    {
      title: "Looking for an answer?",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque maximus, dui accumsan cursus lacinia, nisl risus.",
      image: "assets/img/init2.png",
    }
  ];

  constructor(public navCtrl: NavController, public menu: MenuController) {
    this.menu.swipeEnable(false);
    this.menu.enable(false);
  }

  onSlideNext() {
    //next page
    this.slides.slideNext(300)
  }

	onSlidePrev() {
    //previous page
    this.slides.slidePrev(300)
  }

  onLastSlide() {
    //last page
  	this.slides.slideTo(3, 300)
  }

  openAuthPage() {
    //log in page
    this.navCtrl.setRoot('page-auth');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InitialPage');
  }

}
