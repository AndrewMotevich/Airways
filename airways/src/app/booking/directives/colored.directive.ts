import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appColored]',
})
export class ColoredDirective implements OnInit {
  @Input('appColored') value?: number;

  @HostBinding('class.plenty') classPlenty: boolean = false;

  @HostBinding('class.few') classFew: boolean = false;

  @HostBinding('class.enough') classEnough: boolean = false;

  ngOnInit(): void {
    if (!this.value) return;

    this.classPlenty = this.value >= 100;

    if (this.classPlenty) return;

    this.classFew = this.value <= 20;

    if (this.classFew) return;

    this.classEnough = this.value > 20 && this.value < 100;
  }
}
