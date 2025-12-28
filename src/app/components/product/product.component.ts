import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeaProduct } from 'src/app/models/tea-product.model';
import { TeaService } from 'src/app/services/tea.service';

interface StaticTeaProduct {
  id: number;
  title: string;
  price: number;
  weight: number;
  description: string;
  detailedDescription?: string;
  ingredients: string;
  category: string;
  image: string;
  inStock: boolean;
  brewingTips?: string;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: TeaProduct | null = null;
  isLoading = true;
  errorMessage = '';
  selectedQuantity = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teaService: TeaService
  ) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    if (isNaN(id)) {
      this.errorMessage = 'Неверный ID товара';
      this.isLoading = false;
      return;
    }

    this.isLoading = true;

    this.teaService.getTeaProducts().subscribe({
      next: (products) => {
        this.product = products.find(p => p.id === id) || null;
        if (!this.product) {
          this.errorMessage = 'Товар не найден';
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Ошибка загрузки товара:', error);
        this.errorMessage = 'Не удалось загрузить информацию о товаре';
        this.isLoading = false;
      }
    });
  }

  formatPrice(price: number): string {
    return price.toFixed(2) + ' ₽';
  }

  formatWeight(weight: number): string {
    return weight + ' г';
  }

  increaseQuantity(): void {
    if (this.selectedQuantity < 10) {
      this.selectedQuantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.selectedQuantity > 1) {
      this.selectedQuantity--;
    }
  }

  buyProduct(): void {
    if (this.product) {
      this.teaService.setSelectedProduct(this.product);
      
      this.router.navigate(['/order'], {
        queryParams: { 
          product: this.product.title,
          price: this.product.price
        }
      });
    }
  }

  backToCatalog(): void {
    this.router.navigate(['/catalog']);
  }
}
