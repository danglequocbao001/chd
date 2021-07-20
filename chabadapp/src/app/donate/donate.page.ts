import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DonateService, ChabadService, AccountService } from '../@app-core/http';
import { LoadingService } from '../@app-core/utils';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-donate',
  templateUrl: './donate.page.html',
  styleUrls: ['./donate.page.scss'],
})
export class DonatePage implements OnInit {
  public tab = 'pray'
  isHidden = false;
  isChoose = false;
  source_type: any;
  required_mess  = false;
  message_purpose = "";
  required_purpose = false;
  message = "";
  source_id: any;
  frmDonate: FormGroup;
  email = '';
  error_messages = {
    'amount': [
      { 
        type: 'require', message: 'This field must have a value!'
       }
    ],
  
  }
  dataParams;
  chabad = {
    name: '',
    thumb_image: ''
  }
  avatar: any;
  x: any;
  avatarReplace = 'https://i.imgur.com/edwXSJa.png';
  constructor(
    private router: Router,
    private chabadService: ChabadService,
    public formBuilder: FormBuilder,
     private route: ActivatedRoute,
     public donateService: DonateService,
     public loadingService: LoadingService,
     public accountService: AccountService
     ) {
    this.frmDonate = this.formBuilder.group({
      amount: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      note: new FormControl('', Validators.compose([
        Validators.required,
      ])),
   });
  }
  ngOnInit() {
    this.loadingService.present()
    this.route.queryParams.subscribe(params => {
      this.dataParams = JSON.parse(params['data']);
      this.chabadService.getDetail(this.dataParams.chabad.id).subscribe(data => {
            this.chabad = data.chabad
            this.loadingService.dismiss()
      })
    })
    this.email = localStorage.getItem('email');
   
  }
 
  getUrl() {
    return `url(${this.chabad.thumb_image})`
  }
  onSubmit() {
    this.loadingService.present();
    const sourceId = this.dataParams.event ? this.dataParams.event.id : this.dataParams.chabad.id;
   
    var result = {
      "donation" : {
        "email": this.email,
        "token": '',
        "amount": this.frmDonate.get('amount').value,
        "note": this.frmDonate.get('note').value,
        "source_type": this.dataParams.type,
        "source_id": sourceId
      }
    }
    const amount = this.frmDonate.get('amount').value.replace(/\,/g,'');
    if (this.frmDonate.get('amount').dirty || this.frmDonate.get('amount').touched ) {
      if(!amount.match(/\d+/g)) {
        this.required_mess = true;
        this.message = 'The value must a number!';
        this.loadingService.dismiss();
        return; 
      }
      else if(amount < 18 ) {
        this.required_mess = true;
        this.message = 'The number must be greater than 18$';
        this.loadingService.dismiss();
        return; 
      }
      else if(amount %18 !== 0){
        this.required_mess = true;
        this.message = 'The number must be divisible by 18!';
        this.loadingService.dismiss();
        return;

      }
      else {
        this.required_mess = false;
        this.loadingService.dismiss();
      }
    }
    if (this.frmDonate.get('note').dirty || this.frmDonate.get('note').touched ) {
      if(this.frmDonate.get('note').value.length == 0) {
        this.required_purpose = true;
        this.message_purpose = 'This field is require!';
        this.loadingService.dismiss();
      }
      else {
        this.required_purpose = false;
        this.loadingService.dismiss();
      }
    }

    this.router.navigate(['paymentmethods'], {
      queryParams: {
        data: JSON.stringify(result)
      }
    })
}
  clickPray() {
    this.tab = 'pray';
  }
  clickDonate() {
    this.tab = 'donate';
  }
  clickHidden(e) {
    if(this.isHidden == false) {
      this.isHidden = true;
      e.target.classList.add('btn__nameless_dis_pray');
    }
    else {
      this.isHidden = false;
      e.target.classList.remove('btn__nameless_dis_pray');
    }
  }
  ionViewWillEnter() {
    this.avatar = localStorage.getItem('avatar')
  }
  call() {
    this.x = this.frmDonate.get('amount').value;
    this.x = this.x.replace(/\,/g,'');
    this.x = this.x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  btnActivate(e) {
    this.isChoose = true;
    let choosed = document.querySelectorAll('day');
    choosed.forEach(element => {
      element.classList.remove(('day'));
      document.getElementById('day-choose').style.background = '#64C18E';
    });
    e.target.classList.add('active-button');
  }
}
