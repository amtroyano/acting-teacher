import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})

export class MessageService {

    options = {
        enableHtml: true,
        closeButton: true
    }

    constructor(private toastService: ToastrService) {
    }

    showError(message: Message) {
        console.log('Entra');
        this.toastService.error('<br>' + message.error || message.text, message.code + ' - ' + message.title || 'Error ' + message.code, this.options);
    }

    showInfo(message: Message) {
        this.toastService.info('<br>' + message.text, message.title || 'Información', this.options);
    }

    showWarn(message: Message) {
        this.toastService.warning('<br>' + message.text, message.title || 'Advertencia', this.options);
    }

}
