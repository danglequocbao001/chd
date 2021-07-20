import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopuplogoutComponent } from './popuplogout.component';

describe('PopuplogoutComponent', () => {
  let component: PopuplogoutComponent;
  let fixture: ComponentFixture<PopuplogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopuplogoutComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopuplogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
