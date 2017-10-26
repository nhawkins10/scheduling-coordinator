import { Component, Input, Output, EventEmitter } from '@angular/core';

import { SchedulingService } from '../service/scheduling.service';

@Component({
  selector: 'authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
  providers: [SchedulingService]
})

/*
 * This class provides a modal that allows a user
 * to authenticate themselves as well as change their
 * password.
 */
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

  /*
   * Toggles form fields to allow the user to
   * change their password.
   *
   * @return none
   */
  toggleChange() {
    this.resetMessages();
    this.changing = !this.changing;

    this.password = '';
    this.newPassword = '';
  }

  /*
   * Hides the authentication modal.
   *
   * @return none
   */
  cancel() {
    this.onHideAuth.emit();
  }

  /*
   * Handles a change password request.
   *
   * @return none
   */
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

  /*
   * Handles a log in request.
   *
   * @return none
   */
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

  /*
   * Hides password related messages.
   *
   * @return none
   */
  resetMessages() {
    this.passwordErrorMessage = false;
    this.passwordChangedMessage = false;
  }
}
