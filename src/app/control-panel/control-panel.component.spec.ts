import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlPanelComponent } from './control-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkerCommunicationService } from '../services/worker-communication.service';


describe('ControlPanelComponent', () => {
  let component: ControlPanelComponent;
  let fixture: ComponentFixture<ControlPanelComponent>;
  let workerServiceSpy: jasmine.SpyObj<WorkerCommunicationService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('WorkerService', ['calculate', 'closeWorker']);

    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      providers: [{ provide: WorkerCommunicationService, useValue: spy }],
    });

    fixture = TestBed.createComponent(ControlPanelComponent);
    component = fixture.componentInstance;
    workerServiceSpy = TestBed.inject(WorkerCommunicationService) as jasmine.SpyObj<WorkerCommunicationService>;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call workerService.calculate when timer changes', () => {
    const newTimer = 42;
    component.form.controls['timer'].setValue(newTimer);
    component.ngOnInit();

    expect(workerServiceSpy.calculate).toHaveBeenCalledWith(
      newTimer,
      component.form.controls['arraySize'].value
    );
  });

  it('should call workerService.calculate when arraySize changes', () => {
    const newArraySize = 10;
    component.form.controls['arraySize'].setValue(newArraySize);
    component.ngOnInit();

    expect(workerServiceSpy.calculate).toHaveBeenCalledWith(
      component.form.controls['timer'].value,
      newArraySize
    );
  });

  it('should call workerService.calculate during ngOnInit', () => {
    component.ngOnInit();

    expect(workerServiceSpy.calculate).toHaveBeenCalledWith(
      component.form.controls['timer'].value,
      component.form.controls['arraySize'].value
    );
  });
});
