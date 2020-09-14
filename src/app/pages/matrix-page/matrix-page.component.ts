import { Component, AfterViewInit, ElementRef, OnDestroy, ViewChildren, QueryList, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { data } from './zones.config';
import { IZone } from '../../entities/zone.js';
import { ISection } from '../../entities/section.js';
import sortBy from 'lodash/sortBy';
import { map, takeUntil } from 'rxjs/operators';
import { fromEvent, Subject } from 'rxjs';
import { MatrixPageService } from './matrix-page.service';

@Component({
  selector: 'app-matrix-page',
  templateUrl: './matrix-page.component.html',
  styleUrls: ['./matrix-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatrixPageComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('cell') cellsElems: QueryList<ElementRef>;

  private zones = sortBy(data.zones, 'name') as IZone[];
  private sections = data.sections as ISection[];
  cells = this.matrixService.generateCells(this.zones, this.sections);
  destroy$ = new Subject();

  private highlightedRow: number;
  private highlightedColumn: number;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private matrixService: MatrixPageService
  ){}

  ngAfterViewInit(): void {
    this._bindCellsHover();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private _bindCellsHover(): void{
    this.cellsElems.forEach(cell => {
      fromEvent(cell.nativeElement, 'mouseenter')
      .pipe(
        map((event: any) => event.target),
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        this.highlightedColumn = parseInt(value.getAttribute('col'), 10);
        this.highlightedRow = parseInt(value.getAttribute('row'), 10);
        this.changeDetector.detectChanges();
      });

      fromEvent(cell.nativeElement, 'mouseleave')
      .pipe(
        map((event: any) => event.target),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.highlightedColumn = 0;
        this.highlightedRow = 0;
        this.changeDetector.detectChanges();
      });
    });
  }

  isCellHighlighted(row: number , col: number): boolean{
    return (row === this.highlightedRow && col < this.highlightedColumn) ||
    (col === this.highlightedColumn && row < this.highlightedRow);
  }

  trackByFunc(index: number, cell: any): string {
    if (cell.section) {
      return cell.section.sectionId.toString();
    } else if (cell.zone){
      return cell.zone.guid;
    }
    return index.toString();
  }
}
