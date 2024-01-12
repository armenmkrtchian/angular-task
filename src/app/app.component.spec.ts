import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DataGridComponent } from './data-grid/data-grid.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const mockWorkerUrl = 'mocked-worker.js';

  beforeEach(async () => {
    const workerUrlProvider = { provide: 'workerUrl', useValue: mockWorkerUrl };

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, DataGridComponent],
      providers: [workerUrlProvider],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
