import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from "../service/authentication.service";
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  hide = true;
  errorResponse = '';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authservice: AuthenticationService
  ) { }
  ngOnInit() {
    if (this.authservice.isUserLoggedIn()) this.router.navigate(['/dashboard/main'])
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to businesses page
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/business/businesses';
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      this.authservice.executeAPIAuth(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe(response => {
          //if successfull, returns to the previous page or businesses page if not any
          if (response.statusCode == 200){

            //check if business page and load page freshly to initialize the sidebar
            if (this.returnUrl != "/business/businesses" && this.returnUrl.includes("/business")){
              let url = "/#" + this.returnUrl;
              window.location.href = url;
            }
            this.router.navigate([this.returnUrl]);
          }else {
            this.errorResponse = response.description;
          }
        },
          error => {
            console.log(error);
          })
    }
  }
}
