import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembroListComponent } from './membro-list.component';

describe('MembroListComponent', () => {
  let component: MembroListComponent;
  let fixture: ComponentFixture<MembroListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembroListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
