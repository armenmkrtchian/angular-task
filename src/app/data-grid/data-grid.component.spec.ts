import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataGridComponent } from './data-grid.component';
import { CommonModule } from '@angular/common';
import { IItem } from '../interfaces/IItem.interface';
import { By } from '@angular/platform-browser';

describe('DataGridComponent', () => {
  let component: DataGridComponent;
  let fixture: ComponentFixture<DataGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataGridComponent);
    component = fixture.componentInstance;
    component.items = [];
    fixture.detectChanges();
  });

  it('should display "No data" when items array is empty', () => {
    component.items = [];
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('span[data-testid="no-value"]'));

    expect(element).toBeTruthy();
  });

  it('should display items in the table, if items exist', () => {
    const itemsMock: IItem[] = [
      { id: '1', int: 10, float: 1123.5, color: 'blue', child: { id: 'child1', color: 'blue' } },
    ];

    component.items = itemsMock;  
    fixture.detectChanges();

    const tableRows = fixture.debugElement.nativeElement.querySelectorAll('tbody tr');

    expect(tableRows.length).toBeGreaterThan(itemsMock.length);

    itemsMock.forEach((item, index) => {
      const row = tableRows[index];
      expect(row.cells[0].textContent).toContain(item.id);
      expect(row.cells[1].textContent).toContain(item.int);
    });
  });
});
