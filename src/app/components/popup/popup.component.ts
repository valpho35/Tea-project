import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/services/popup.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Output() closePopup = new EventEmitter<void>();
  isVisible = true;

  constructor(
    private router: Router,
    private popupService: PopupService
    ) { }

  ngOnInit(): void {
  }

  goToCatalog(): void {
    this.close();
    this.router.navigate(['/catalog']);
  }

  close(): void {
    this.isVisible = false;
    this.closePopup.emit();
    this.popupService.hide();
  }

}
