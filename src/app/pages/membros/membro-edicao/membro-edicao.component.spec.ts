import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembroEdicaoComponent } from './membro-edicao.component';

describe('MembroEdicaoComponent', () => {
  let component: MembroEdicaoComponent;
  let fixture: ComponentFixture<MembroEdicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembroEdicaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembroEdicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
