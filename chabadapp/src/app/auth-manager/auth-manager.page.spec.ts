import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AuthManagerPage } from './auth-manager.page';

describe('AuthManagerPage', () => {
  let component: AuthManagerPage;
  let fixture: ComponentFixture<AuthManagerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthManagerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
