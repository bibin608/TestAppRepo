import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../_models';
import { Product } from '../_models';
import { Survey } from '../_models';
import { UserService, AuthenticationService,AlertService, } from '../_services';
import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';


@Component({ templateUrl: 'survey.component.html' })
export class SurveyComponent implements OnInit {
productId:string;
surveyArray:[];
surveyForm: FormGroup;
disableStatus:boolean;

loading = false;
submitted = false;

survey:Survey;
isSurveySubmitted:any;


constructor(private route: ActivatedRoute,  private formBuilder: FormBuilder,private authenticationService: AuthenticationService,
private userService: UserService,
private alertService: AlertService,
private router: Router,) { }

  ngOnInit() {
    this.disableStatus=false;
        this.route.queryParams.subscribe(params => {
          this.productId = params['productId'];
          });

          this.survey=JSON.parse(localStorage.getItem("survey"+this.productId));
          this.isSurveySubmitted =false;
          if(this.survey!=null){
            this.isSurveySubmitted=true;
            this.disableStatus=true;
          }

          console.log(this.survey!=null ?this.survey.product : "");

        this.surveyForm = this.formBuilder.group({
            productId:[''],
            product: [{value:this.survey!=null ?this.survey.product : "",disabled:this.disableStatus}, Validators.required],
            future:  [{value:this.survey!=null ?this.survey.future : "",disabled:this.disableStatus},Validators.required],
            feedback:[{value:this.survey!=null ?this.survey.product : "",disabled:this.disableStatus}, [Validators.required, Validators.minLength(10)]]
        });  
    }

    get f() { return this.surveyForm.controls; }

    onSubmit() {
      this.submitted = true;
      if (this.surveyForm.invalid) {
          return;
      }
      this.survey=this.surveyForm.value;
      localStorage.setItem("survey"+this.productId, JSON.stringify(this.survey));
      this.alertService.success('Survey has been submitted successful', true);
      this.router.navigate(['/home']);
  }
}

