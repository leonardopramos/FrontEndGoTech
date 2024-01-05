import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAberturaComponent } from './data-abertura.component';

describe('DataAberturaComponent', () => {
  let component: DataAberturaComponent;
  let fixture: ComponentFixture<DataAberturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataAberturaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataAberturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
