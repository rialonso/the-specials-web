import { Router } from '@angular/router';
import { LoadingSpinnerService } from 'src/app/core/loading-spinner.service';
import { ForgotPasswordService } from './../../core/services/profile-infos/forgot-password/forgot-password.service';
import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

import { TranslateService } from './../../shared/translate.service';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  text: any;
  emailFormControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  emailForgoted: boolean = false;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private translatePage: TranslateService,
    private forgotPasswordService: ForgotPasswordService,
    private loadingSpinner: LoadingSpinnerService,
    private router: Router,

    ) { }
  matcher = new MyErrorStateMatcher();
  ngOnInit(): void {
    this.text = this.translatePage.textTranslate;
  }
  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
  recoverPassword() {
    this.loadingSpinner.ShowLoading = true;
    const payloadRecover = {email: this.emailFormControl.value};
    this.forgotPasswordService.post(payloadRecover)
    .pipe(takeUntil(this.destroyed$))
    .toPromise().then(res => {
      if(res) {
        this.loadingSpinner.ShowLoading = false;
        this.emailForgoted = true;
        setTimeout(() => {
          this.emailForgoted = false;
          this.router.navigate(['/signin']);
        }, 3000);
      }
    })
  }
}
