import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalDetailOrderPage } from './modal-detail-order.page';

describe('ModalDetailOrderPage', () => {
  let component: ModalDetailOrderPage;
  let fixture: ComponentFixture<ModalDetailOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetailOrderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalDetailOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
