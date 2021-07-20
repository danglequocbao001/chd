import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailEventPage } from './detail-event.page';

describe('DetailEventPage', () => {
  let component: DetailEventPage;
  let fixture: ComponentFixture<DetailEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailEventPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
