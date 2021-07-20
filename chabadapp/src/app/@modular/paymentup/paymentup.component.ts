import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { DonateService } from '../../@app-core/http';
import { LoadingService } from '../../@app-core/utils';
declare var Stripe;
@Component({
  selector: 'app-paymentup',
  templateUrl: './paymentup.component.html',
  styleUrls: ['./paymentup.component.scss'],
})
export class PaymentupComponent implements OnInit {
  data:any;
  stripe = Stripe('pk_test_51IFwpWCpBejooWZYsmTcqPL7wfAcx58B6lQNiE3K8XEueAbjRJCRzczedDQO3LbJ1afIh6oln6VT6SZXOZYtiL6G00Ow7S9qTG');
  card: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private donateService: DonateService,
    public modalController: ModalController, 
    public loadingService: LoadingService,
    public toastController: ToastController,

  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.data =  JSON.parse(params['data']);
    })
    this.setupStripe()
  }
  async openModal() {
    const modal = await this.modalController.create({
      component: PaymentupComponent,
      swipeToClose: true,
      cssClass: 'modal__payment'
    });
}
    dismissModal() {
      this.modalController.dismiss();
    }
  setupStripe() {
    let elements = this.stripe.elements();
    var style = {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };
  
    this.card = elements.create('card', { style: style });
    this.card.mount('#card-element');
    this.card.addEventListener('change', event => {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });
  
    var form = document.getElementById('payment-form');
    form.addEventListener('submit', event => {
      this.loadingService.present();
      event.preventDefault();
      this.stripe.createSource(this.card).then(result => {
        if (result.error) {
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          this.data.donation.token = result.source.id;
          this.loadingService.dismiss();
          this.router.navigate(['/payment'], {
            queryParams: {
              data: JSON.stringify(this.data)
            }
          })
          this.dismissModal();
          
        }
      });
    });
  }
  async presentToastValid(message, color) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      color: color,
    });
    toast.present();
  }
  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      color: color,
    });
    toast.present();
  }

}
