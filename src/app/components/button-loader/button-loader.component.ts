import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-loader',
  templateUrl: './button-loader.component.html',
  styleUrls: ['./button-loader.component.scss']
})
export class ButtonLoaderComponent {

  @Input() isDisabled: boolean | null = false;
  @Input() isLoading: boolean | null = false;
  @Input() defaultIcon = "save";

  @Output() onClick = new EventEmitter<void>();

  click() {
    this.onClick.emit();
  }

}
