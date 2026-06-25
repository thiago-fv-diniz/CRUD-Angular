import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastType = 'success' | 'error' | 'info';
export interface Toast { id: number; text: string; type: ToastType; }

@Injectable({ providedIn: 'root' })
export class ToastService {
  private seq = 0;
  private _toasts = new BehaviorSubject<Toast[]>([]);
  readonly toasts$ = this._toasts.asObservable();

  show(text: string, type: ToastType = 'info', ms = 3400) {
    const id = ++this.seq;
    this._toasts.next([...this._toasts.value, { id, text, type }]);
    setTimeout(() => this.dismiss(id), ms);
  }
  success(text: string) { this.show(text, 'success'); }
  error(text: string) { this.show(text, 'error'); }
  info(text: string) { this.show(text, 'info'); }

  dismiss(id: number) {
    this._toasts.next(this._toasts.value.filter(t => t.id !== id));
  }
}
