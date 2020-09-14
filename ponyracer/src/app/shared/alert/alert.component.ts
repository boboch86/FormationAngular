import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'pr-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Input() dismissible = true;
  @Input() type = 'warning';
  constructor() { }

  ngOnInit() {
  }

  closeHandler() {
    this.close.emit();
  }

  get alertClasses() {
    return `alert alert-${this.type}`;
  }
}
