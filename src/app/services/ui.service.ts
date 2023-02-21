import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private formShown = false;
  private subject: Subject<any> = new Subject<any>();

  public toggleFormShown(): void {
    this.formShown = !this.formShown;
    this.subject.next(this.formShown);
  }

  public onToggleForm(): Observable<any> {
    return this.subject.asObservable();
  }
}
