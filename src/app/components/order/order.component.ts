import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { TeaProduct } from 'src/app/models/tea-product.model';
import { TeaService } from 'src/app/services/tea.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  selectedProduct: TeaProduct | null = null;
  orderForm: FormGroup;
  isSubmitting = false;
  orderSuccess = false;
  orderError = false;

  constructor(
    private route: ActivatedRoute,
    private teaService: TeaService,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
    this.orderForm = this.createOrderForm();
  }

  ngOnInit(): void {
    this.teaService.selectedProduct$.subscribe(product => {
      if (product) {
        this.orderForm.patchValue({ product: product.title });
      }
    });

    this.route.queryParams.subscribe(params => {
      if (params['product']) {
        this.orderForm.patchValue({ product: params['product'] });
      }
    });
  }

  private createOrderForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Za-zА-Яа-яЁё]+$')]],
      last_name: ['', [Validators.required, Validators.pattern('^[A-Za-zА-Яа-яЁё]+$')]],
      phone: ['', [
        Validators.required,
        Validators.pattern('^[+]?[0-9\\s\\-()]+$'),
        this.phoneDigitCountValidator
      ]],
      country: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern('^\\d{5,6}$')]],
      product: [{ value: '', disabled: true }, Validators.required],
      address: ['', [
        Validators.required,
        Validators.pattern('^[A-Za-zА-Яа-яЁё0-9\\s\\-/]+$')
      ]],
      comment: ['']
    });
  }

  private phoneDigitCountValidator(control: any) {
    const value = control.value || '';
    const digitCount = (value.match(/\d/g) || []).length;
    return digitCount === 11 ? null : { digitCount: true };
  }

  get name() { return this.orderForm.get('name'); }
  get lastName() { return this.orderForm.get('last_name'); }
  get phone() { return this.orderForm.get('phone'); }
  get country() { return this.orderForm.get('country'); }
  get zip() { return this.orderForm.get('zip'); }
  get product() { return this.orderForm.get('product'); }
  get address() { return this.orderForm.get('address'); }
  get comment() { return this.orderForm.get('comment'); }

  onSubmit(): void {
    if (this.orderForm.invalid || this.isSubmitting) {
      this.markFormGroupTouched(this.orderForm);
      return;
    }

    this.isSubmitting = true;
    this.orderError = false;

    const formData = {
      ...this.orderForm.getRawValue(), 
      comment: this.orderForm.value.comment || ''
    };

    const apiUrl = 'https://testologia.ru/order-tea';

    this.http.post<any>(apiUrl, formData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        if (response && response.success === 1) {
          this.orderSuccess = true;
          this.orderForm.reset();
          if (this.product) {
            this.orderForm.patchValue({ product: this.product.value });
          }
        } else {
          console.error('Ошибка при отправке заказа:', Error);
          this.isSubmitting = false;
          this.orderError = true;
        }
      },
      error: (error) => {
        console.error('Ошибка при отправке заказа:', error);
        this.isSubmitting = false;
        this.orderError = true;
      }
    });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  backToCatalog(): void {
    this.router.navigate(['/catalog']);
  }
}
