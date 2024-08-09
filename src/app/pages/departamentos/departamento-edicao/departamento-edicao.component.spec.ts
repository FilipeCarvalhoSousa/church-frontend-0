import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentoEdicaoComponent } from './departamento-edicao.component';

describe('DepartamentoEdicaoComponent', () => {
  let component: DepartamentoEdicaoComponent;
  let fixture: ComponentFixture<DepartamentoEdicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartamentoEdicaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartamentoEdicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
