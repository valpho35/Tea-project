import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy {
  showPopup = false;
  private popupSubscription?: Subscription;

  constructor(private popupService: PopupService) { }

  ngOnInit(): void {
     this.popupService.showDelayed(10000);

      this.popupSubscription = this.popupService.showPopup$.subscribe(
      show => {
        this.showPopup = show;
        console.log('Popup state changed:', show);
      }
    );
  }

  ngOnDestroy(): void {
    this.popupService.cancel();
    if (this.popupSubscription) {
      this.popupSubscription.unsubscribe();
    }
  }

  closePopup(): void {
    this.popupService.hide();
  }
}
