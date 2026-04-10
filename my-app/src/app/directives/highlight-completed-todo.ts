import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[appHighlightCompletedTodo]',
})
export class HighlightCompletedTodo {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @Input() set appHighlightCompletedTodo(isCompleted: boolean) {
    if (isCompleted) {
      this.renderer.setStyle(this.el.nativeElement, 'text-decoration', 'line-through');
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#6ca422');
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '0.6');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'text-decoration');
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#fff');
      this.renderer.removeStyle(this.el.nativeElement, 'opacity');
    }
  }
}
