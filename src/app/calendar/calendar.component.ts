import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

/*
 * This class provides a calendar interface that allows
 * access to the current month and future months.
 */
export class Calendar {
  @Input() year;
  @Input() month;
  @Input() day;
  @Output() onDayChanged = new EventEmitter<String>();
  @Output() onMonthChanged = new EventEmitter<String>();
  @Output() onYearChanged = new EventEmitter<String>();
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  monthArray = [];


  /*
   * Returns a boolean indicating if the current
   * year is a leap year.
   *
   * @return Boolean
   */
  isLeapYear(): Boolean {
    if (parseInt(this.year, 10) % 100 === 0 && parseInt(this.year, 10) % 400 === 0) {
      return true;
    } else if (parseInt(this.year, 10) % 4 === 0) {
      return true;
    } else {
      return false;
    }
  }

  /*
   * Generates an array of arrays to represent the current month.
   * Array elements that are not part of the working month are
   * set to zero.
   *
   * @return none
   */
  generateCalendar() {
    var monthStart = new Date(this.year, this.month, 1);
    var lengths = {
      "0": 31,
      "1": (this.isLeapYear() ? 29 : 28),
      "2": 31,
      "3": 30,
      "4": 31,
      "5": 30,
      "6": 31,
      "7": 31,
      "8": 30,
      "9": 31,
      "10": 30,
      "11": 31
    };
    var monthArray = [
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0]
    ];
    var counter = 1;

    for (var weekCounter=0; weekCounter<monthArray.length; weekCounter++) {
      for (var dayOfWeekCounter=0; dayOfWeekCounter<monthArray[0].length; dayOfWeekCounter++) {
        if (weekCounter === 0 && dayOfWeekCounter < monthStart.getDay()) {
          continue;
        }
        if (counter <= lengths[this.month]) {
          monthArray[weekCounter][dayOfWeekCounter] = counter;
          counter++
        }
      }
    }

    this.monthArray = monthArray;
  }

  /*
   * Sets the working day to the given day.
   *
   * @param day - the day to set
   * @return none
   */
  updateDay(day) {
    if (day !== 0) {
      this.day = day;
      this.onDayChanged.emit(day);
    }
  }

  /*
   * Sets the working month to the previous month.
   * Won't allow going to months prior to the current month.
   *
   * @return none
   */
  decrementMonth(): void {
    if (this.month == new Date().getMonth() && this.year == new Date().getFullYear()) {
      return;
    } else if (this.month == 0) {
      this.month = 11;
      this.year--;
    } else {
      this.month--;
    }

    if (this.month == new Date().getMonth() && this.year == new Date().getFullYear()) {
      this.day = new Date().getDate();
    } else {
      this.day = 1;
    }

    this.updateView()
  }

  incrementMonth(): void {
    if (this.month == 11) {
      this.month = 0;
      this.year++;
    } else {
      this.month++;
    }

    if (this.month == new Date().getMonth() && this.year == new Date().getFullYear()) {
      this.day = new Date().getDate();
    } else {
      this.day = 1;
    }

    this.updateView()
  }

  showYear(): Boolean {
    if (this.year === new Date().getFullYear()) {
      return false;
    } else {
      return true;
    }
  }

  goToToday(): void {
    let date = new Date();
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.day = date.getDate();

    this.updateView()
  }

  updateView(): void {
    this.onDayChanged.emit(this.day);
    this.onMonthChanged.emit(this.month);
    this.onYearChanged.emit(this.year);
    this.generateCalendar();
  }

  ngOnInit(): void {
    this.generateCalendar();
  }
}
