import { Component, OnInit,AfterViewChecked  } from '@angular/core';
import {Story} from "../story";
import {Router} from "@angular/router";
import {FormGroup,FormControl} from '@angular/forms';
 
import { ActionSequence } from 'protractor';
declare let paypal: any;



@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements AfterViewChecked {
 

  addScript: boolean =false;
    paypalLoad: boolean = true;
    finalAmount: number = 1;
    paypalConfig ={
      env :'sandbox',
      client: {
        sandbox: 'ASWEGeCF3QJNg9L3BFb0T1qOvb8ECKofdKxSAP7L5hdx6w99dzMth-9BP4FxXe_yCefz8WkNnQQqsO_g'
      },
      commit: true,
      payment:(data,actions) => {
        return actions.payment.create({
          payment: {
            transactions:[
              {amount: {total: this.finalAmount,currency: 'CAD'}}
            ]
          }
        });
      },
      onAuthorize: (data,actions) => {
        return actions.payment.execute().then((payment)  =>{
          //do something when payment succesfull
        })
      }
     };

     ngAfterViewChecked(): void {
       if(!this.addScript) {
         this.addPaypalScript().then(() => {
           paypal.Button.render(this.paypalConfig,'#paypal-checkout-btn');
           this.paypalLoad = false;

         })
       }

     }
     addPaypalScript() {
       this.addScript = true;
       return new Promise((resolve,reject)  => {
         let scripttagElement = document.createElement('script');
         scripttagElement.src = "https://www.paypalobjects.com/api/checkout.js";
         scripttagElement.onload = resolve;
         document.body.appendChild(scripttagElement);

       }
       )
     }
  }

