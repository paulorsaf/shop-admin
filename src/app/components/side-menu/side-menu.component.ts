import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  @Output() clickMenu = new EventEmitter<string>();
  @Output() clickLogout = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  goToPage(page: string) {
    this.clickMenu.emit(page);
  }

  logout() {
    this.clickLogout.emit();
  }

}
