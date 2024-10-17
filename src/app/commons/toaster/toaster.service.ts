import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

type types = 'success' | 'error' | 'warning' | 'info';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(
    private toaster: ToastrService
  ) { }

  public show(message: string = '', title: string = '', timeLapse: string = '', type: types = 'success', duration: number = 0) {

    if( duration === 0 )
      duration = (type === 'success' || type === 'info') ? 4000 : 7000;
    else
      duration = duration * 1000;

    return this.toaster[type](
      message,
      title,
      {
        timeOut: duration,
        progressBar: true,
        enableHtml: true,
        progressAnimation: 'increasing',
        closeButton: false,
        tapToDismiss: true,
        extendedTimeOut: 20000,
        positionClass: 'toast-bottom-full-width'
      }
    )
  }
}
