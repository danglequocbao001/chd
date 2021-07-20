import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FoodBasketPage } from './food-basket.page';

describe('FoodBasketPage', () => {
  let component: FoodBasketPage;
  let fixture: ComponentFixture<FoodBasketPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodBasketPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FoodBasketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
