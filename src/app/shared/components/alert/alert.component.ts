import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html'
})
export class AlertComponent {
  @Input({ required: true }) showModal!: boolean;
  @Input({ required: true }) config!: any;
  @Output() handleModal: EventEmitter<any> = new EventEmitter();
  title: string = '';
  message: string = '';
  type: string = 'default';
  navigate: boolean = false;

  ngOnInit() {
    const { message, type, title, navigate } = this.config;
    this.title = title;
    this.message = message;
    this.type = type;
    this.navigate = navigate;
  }

  toggleModal(){
    this.showModal = !this.showModal;
    this.handleModal.emit(this.navigate);
  }

}
