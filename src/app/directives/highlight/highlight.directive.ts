import { Directive, ElementRef, Renderer2, AfterViewInit, OnDestroy } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements AfterViewInit, OnDestroy {

  private destroy$ = new Subject();
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngAfterViewInit(): void {
    fromEvent(this.elementRef.nativeElement, 'mouseenter').pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.renderer.removeClass(this.elementRef.nativeElement, 'secondary-highlight');
      this.renderer.addClass(this.elementRef.nativeElement, 'primary-highlight');
    });

    fromEvent(this.elementRef.nativeElement, 'mouseleave').pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.renderer.removeClass(this.elementRef.nativeElement, 'primary-highlight');
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
