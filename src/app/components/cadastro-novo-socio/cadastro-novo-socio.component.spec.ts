import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroNovoSocioComponent } from './CadastroNovoSocioComponent';

describe('CadastroNovoSocioComponent', () => {
  let component: CadastroNovoSocioComponent;
  let fixture: ComponentFixture<CadastroNovoSocioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastroNovoSocioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroNovoSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
