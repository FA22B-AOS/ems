import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationInsightComponent } from './qualification-insight.component';

describe('QualificationInsightComponent', () => {
  let component: QualificationInsightComponent;
  let fixture: ComponentFixture<QualificationInsightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualificationInsightComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QualificationInsightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
