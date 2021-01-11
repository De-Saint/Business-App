import { AuthenticationService } from './../../authentication/service/authentication.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BusinessService } from './../service/business.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-businessprofile',
  templateUrl: './businessprofile.component.html',
  styleUrls: ['./businessprofile.component.sass']
})
export class BusinessprofileComponent implements OnInit {
  id: any;
  business: any;
  staff: [];
  verifyForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router, private businessService: BusinessService) { }

  ngOnInit(): void {
    this.verifyForm = this.formBuilder.group({
      verifycode: [''],
    });
    this.id = this.route.snapshot.params.id;
    this.getBusinessDetails(this.id);
    this.getBusinessStaff(this.id);
  }

  getBusinessDetails(id) {
    this.businessService.getBusinessDetails(id).subscribe(
      response => {
        if (response.statusCode === 200) { this.business = response.data; }
      },
      error => {
        console.log(error);
      }
    )
  }

  getBusinessStaff(id) {
    this.businessService.getBusinessStaff(id).subscribe(
      response => {
        if (response.statusCode === 200) { this.staff = response.data; }
      },
      error => {
        console.log(error);
      }
    )
  }
  onVerifyEmail() {
    // stop here if form is invalid
    if (this.verifyForm.invalid) {
      return;
    } else {
      this.businessService.confirmEmail(this.verifyForm.value.verifycode)
        .subscribe((resp => {
          if (resp.statusCode === 200) {
            this.getBusinessDetails(this.id);
            this.getBusinessStaff(this.id);
            document.getElementById('closeverifyemail').click();
          }
        }), error => {
          console.log(error);
        });

    }
  }
}
