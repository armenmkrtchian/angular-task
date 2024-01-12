import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IItem } from '../interfaces/IItem.interface';

@Injectable({
  providedIn: 'root',
})
export class WorkerCommunicationService {
  private currentWorker!: Worker;
  private itemsSubject = new BehaviorSubject<IItem[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public items$ = this.itemsSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();

  public startWorker(timer: number, arraySize: number): void {
    this.loadingSubject.next(true);

    this.currentWorker = new Worker(
      new URL('../socket.worker', import.meta.url)
    );

    this.currentWorker.onmessage = ({ data }) => {
      this.itemsSubject.next(data.result.slice(-10));
      this.loadingSubject.next(false);
    };

    this.currentWorker.postMessage({ timer, arraySize });
  }

  public setItems(arrayIds: string[]): void {
    let currentItems = this.itemsSubject.getValue();

    if (!currentItems || currentItems.length < arrayIds.length) {
      currentItems = Array(arrayIds.length).fill({ id: '' });
    }

    arrayIds.forEach((value: string, index: number) => {
      if (value) {
        currentItems[index].id = value;
      }
    });

    this.itemsSubject.next([...currentItems]);
  }

  public closeWorker(): void {
    this.currentWorker?.terminate();
    this.loadingSubject.next(false);
  }

  public calculate(timer: number, arraySize: number): void {
    if (typeof Worker !== undefined) {
      this.closeWorker();
      this.startWorker(timer, arraySize);
    } else {
      console.error('Web workers not supported! Calling on the main thread...');
    }
  }
}
