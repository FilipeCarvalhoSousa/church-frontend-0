import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembroPanelComponent } from './membro-panel.component';

describe('MembroPanelComponent', () => {
  let component: MembroPanelComponent;
  let fixture: ComponentFixture<MembroPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembroPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembroPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
