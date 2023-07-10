import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountstatementComponent } from './accountstatement.component';

describe('AccountstatementComponent', () => {
  let component: AccountstatementComponent;
  let fixture: ComponentFixture<AccountstatementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountstatementComponent]
    });
    fixture = TestBed.createComponent(AccountstatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
