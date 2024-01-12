import { Component } from '@angular/core';
import { DataGridComponent } from './data-grid/data-grid.component';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { CommonModule } from '@angular/common';
import { WorkerCommunicationService } from './services/worker-communication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [CommonModule, DataGridComponent, ControlPanelComponent],
})
export class AppComponent {
  constructor(public workerService: WorkerCommunicationService) {}
}
