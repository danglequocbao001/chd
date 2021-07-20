import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PageNotiComponent } from './page-noti.component';

describe('PageNotiComponent', () => {
  let component: PageNotiComponent;
  let fixture: ComponentFixture<PageNotiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNotiComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PageNotiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
