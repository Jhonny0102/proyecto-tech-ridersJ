import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements DoCheck {
  public role!: string | null;

  ngDoCheck(): void {
    if (this.role != localStorage.getItem('role'))
      this.role = localStorage.getItem('role');
  }
}