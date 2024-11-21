import { Component, Input, Output, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-estrella',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './estrella.component.html',
  styleUrl: './estrella.component.scss'
})
export class EstrellaComponent implements OnInit {
  starClassName = "star-rating-blank";
  @Input() starId!: number;
  @Input() rating!: number;

  @Output() leave: EventEmitter<number> = new EventEmitter();
  @Output() enter: EventEmitter<number> = new EventEmitter();
  @Output() bigClick: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    if(this.rating >= this.starId){
      this.starClassName = "star-rating-filled";
    }
  }

  onEnter() {
    this.enter.emit(this.starId);
  }

  onLeave() {
    this.leave.emit(this.starId);
  }

  starClick() {
    this.bigClick.emit(this.starId);
  }

}