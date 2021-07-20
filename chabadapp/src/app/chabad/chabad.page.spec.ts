import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChabadPage } from './chabad.page';

describe('ChabadPage', () => {
  let component: ChabadPage;
  let fixture: ComponentFixture<ChabadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChabadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChabadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
