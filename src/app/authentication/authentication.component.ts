import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { SchedulingService } from '../service/scheduling.service';

@Component({
  selector: 'authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
  providers: [SchedulingService]
})
export class Authentication {
  @Input() locked;
  @Output() onHideAuth = new EventEmitter<String>();
  @Output() onToggleLock = new EventEmitter<String>();
  @Output() onPasswordChanged = new EventEmitter<String>();
  changing = false;
  passwordErrorMessage = false;
  passwordChangedMessage = false;
  password = '';
  newPassword = '';

  constructor(private schedulingService: SchedulingService) {}

  toggleChange() {
    this.resetMessages();
    this.changing = !this.changing;

    this.password = '';
    this.newPassword = '';
  }

  cancel() {
    this.onHideAuth.emit();
  }

  changePw() {
    this.resetMessages();

    this.schedulingService.getPassword().then(function(password) {
      if (password === this.password) {
        this.onPasswordChanged.emit(this.newPassword);
        this.toggleChange();
        this.passwordChangedMessage = true;
      } else {
        this.passwordErrorMessage = true;
      }
    }.bind(this));
  }

  logIn() {
    this.resetMessages();

    this.schedulingService.getPassword().then(function(password) {
      if (password === this.password) {
        this.onToggleLock.emit();
        this.onHideAuth.emit();
      } else {
        this.passwordErrorMessage = true;
      }
    }.bind(this));
  }

  resetMessages() {
    this.passwordErrorMessage = false;
    this.passwordChangedMessage = false;
  }

  ngOnInit(): void {

  }
}
