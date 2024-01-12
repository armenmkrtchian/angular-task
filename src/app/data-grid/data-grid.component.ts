import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IItem } from '../interfaces/IItem.interface';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class DataGridComponent {
  @Input() items!: IItem[];

  identify(index: number, item: IItem): string {
    return item.id;
  }
}
