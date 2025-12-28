import { Injectable, OnDestroy } from '@angular/core';
import { Subject, takeUntil, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private showPopupSubject = new Subject<boolean>();
  private destroy$ = new Subject<void>();

  showPopup$ = this.showPopupSubject.asObservable();

  showDelayed(delay: number = 10000): void {
    this.destroy$.next();

    timer(delay)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.showPopupSubject.next(true);
      });
  }

  show(): void {
    this.showPopupSubject.next(true);
  }

  hide(): void {
    this.showPopupSubject.next(false);
  }

  cancel(): void {
    this.destroy$.next();
  }
  constructor() { }
}
