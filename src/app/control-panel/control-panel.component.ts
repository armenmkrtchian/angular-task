import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { WorkerCommunicationService } from '../services/worker-communication.service';
import { NUMBERS_WITH_COMMAS_PATTERN } from '../falso-items';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class ControlPanelComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public notValidAdditionalIds: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private workerService: WorkerCommunicationService
  ) {
    this.form = this.fb.group({
      timer: [300],
      arraySize: [1000],
      additionalArrayIds: [null, [Validators.pattern('^[0-9,\\s]*$')]],
    });
  }

  public ngOnInit(): void {
    this.form.controls['timer'].valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((newTimer: number) => {
        this.workerService.calculate(
          newTimer,
          this.form.controls['arraySize'].value
        );
      });

    this.form.controls['arraySize'].valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((newArraySize: number) => {
        this.workerService.calculate(
          this.form.controls['timer'].value,
          newArraySize
        );
      });

    this.form.controls['additionalArrayIds'].valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((newAdditionalArrayIds: string) => {
        this.manageAdditionalIdsModification(newAdditionalArrayIds);
      });

    this.workerService.calculate(
      this.form.controls['timer'].value,
      this.form.controls['arraySize'].value
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.workerService.closeWorker();
  }

  public calculate(timer: number, arraySize: number): void {
    this.workerService.calculate(timer, arraySize);
  }

  private manageAdditionalIdsModification(additionalArrayIds: string): void {
    this.workerService.closeWorker();

    const arrayIds = additionalArrayIds.split(',').map((id) => id.trim());
    this.workerService.setItems(arrayIds);

    this.notValidAdditionalIds =
      !NUMBERS_WITH_COMMAS_PATTERN.test(additionalArrayIds);
  }
}
