import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixPageComponent } from './matrix-page.component';

xdescribe('MatrixPageComponent', () => {
  let component: MatrixPageComponent;
  let fixture: ComponentFixture<MatrixPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
