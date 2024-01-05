import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosComplementaresComponent } from './dados-complementares.component';

describe('DadosComplementaresComponent', () => {
  let component: DadosComplementaresComponent;
  let fixture: ComponentFixture<DadosComplementaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosComplementaresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DadosComplementaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
