import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclarationBlocComponent } from './declaration-bloc.component';

describe('DeclarationBlocComponent', () => {
  let component: DeclarationBlocComponent;
  let fixture: ComponentFixture<DeclarationBlocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclarationBlocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeclarationBlocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
