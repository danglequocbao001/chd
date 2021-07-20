import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaymentmethodsPage } from './paymentmethods.page';

describe('PaymentmethodsPage', () => {
  let component: PaymentmethodsPage;
  let fixture: ComponentFixture<PaymentmethodsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentmethodsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentmethodsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
