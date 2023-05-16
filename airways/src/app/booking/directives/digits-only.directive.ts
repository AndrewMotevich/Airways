import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';

@Directive({
  selector: '[appDigitsOnly]'
})
export class DigitsOnlyDirective implements OnInit {
  private inpControl!: FormControl | null;

  constructor(private el: ElementRef, private ngControl: NgControl) { }

  ngOnInit(): void {
    this.inpControl = this.ngControl?.control as FormControl;
  }

  @HostListener('input', ['$event.target']) inputHandler(inp: HTMLInputElement): void {
    const fixValue = inp.value.replace(/[^0-9]/g, '');

    this.el.nativeElement.value = fixValue;
    this.inpControl?.patchValue(fixValue);
  }
}
