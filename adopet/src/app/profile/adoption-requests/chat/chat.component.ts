import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { RequestComponent } from '../requests-layout/request/request.component';
import { Message } from '../../../models/message.interface';
import { AdoptionRequestService } from '../../../services/adoption-request/adoption-request.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  submittedForm = false;
  messageForm: FormGroup;

  constructor(private adoptionRequestService: AdoptionRequestService,
    private router: Router,
    private dialogRef: MatDialogRef<RequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.messageForm = new FormGroup({
      message: new FormControl('')
    });
  }

  onSendMessage() {
    this.submittedForm = true;

    const message: Message = {
      userID: this.data.user._id,
      text: this.messageForm.get('message').value,
      date: new Date()
    }

    this.adoptionRequestService.addRequestMessage(message, this.data.request._id).subscribe(
      res => {
        this.data.request.messages.push(res);
        this.messageForm.reset();
        this.submittedForm = false;
      },
      err => console.log(err)
    );
  }

  onClose() {
    this.dialogRef.close();
  }

  isCurrentUserMessage(message: Message) {
    return message.userID === this.data.user._id;
  }

  isDisabled() {
    return this.messageForm.get('message').value === '' || this.submittedForm;
  }

  getOtherUserName() {
    return this.router.url.includes('received') ? this.data.request.adopter.name : this.data.request.owner.name;
  }

  getDateTime(message: Message) {
    const date = message.date.toString();
    return date.substring(11, 16) + ' | ' + date.substring(8, 10) + '.' + date.substring(5, 7) + '.' + date.substring(0, 4);
  }
}
