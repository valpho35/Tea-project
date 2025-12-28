import { Component, OnInit } from '@angular/core';

interface CatalogItem {
  id: number;
  title: string;
  description: string;
  image: string;
  imageBig: string;
  price: number;
}

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  catalogItems: CatalogItem[] = [
    {
      id: 1,
      title: 'Детокс чай лайм',
      description: 'Великолепный чай внесет в вашу жизнь яркие краски и вкус расслабления',
      image: 'assets/images/Detox.png',
      imageBig: 'images/Detoxbig.png',
      price: 450
    },
    {
      id: 2,
      title: 'Ягодный чай',
      description: 'Нотки ягод позволят вам расслабиться и насладиться великолепием этого чая',
      image: 'assets/images/Berry.png',
      imageBig: 'images/Berrybig.png',
      price: 520
    },
    {
      id: 3,
      title: 'Цветочный чай',
      description: 'Душистые цветы создают невероятный аромат и наполняют вас энергией',
      image: 'assets/images/Flower.png',
      imageBig: 'images/Flowerbig.png',
      price: 380
    },
    {
      id: 4,
      title: 'Очищающий чай',
      description: 'Бесподобный чай для получения утреннего заряда бодрости',
      image: 'assets/images/Clarity.png',
      imageBig: 'images/Claritybig.png',
      price: 490
    },
    {
      id: 5,
      title: 'Кислый чай',
      description: 'Кислый чай для настоящих ценителей кислинки во время чаепития',
      image: 'assets/images/Sour.png',
      imageBig: 'images/Sourbig.png',
      price: 410
    },
    {
      id: 6,
      title: 'Лимонная мята',
      description: 'Смесь лимона с мятой сделает ваш день самым лучшим',
      image: 'assets/images/Lemon mint.png',
      imageBig: 'images/Lemon mintbig.png',
      price: 360
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  formatPrice(price: number): string {
    return price.toFixed(2) + ' ₽';
  }

}
