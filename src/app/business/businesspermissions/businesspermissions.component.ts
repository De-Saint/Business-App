import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessService } from './../service/business.service';

@Component({
  selector: 'app-businesspermissions',
  templateUrl: './businesspermissions.component.html',
  styleUrls: ['./businesspermissions.component.sass']
})
export class BusinesspermissionsComponent implements OnInit {
  id: Number;
  myDetails: any;
  business: any;
  role: any
  groupPermissions = [];

  constructor(private route: ActivatedRoute, private businessService: BusinessService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getMyBusinessStaffDetails(this.id);
  }

  getBusinessRolePermissions(role){
    if (role.name.toLowerCase() == "owner") {
      this.businessService.getBusinessPermissions(this.id).subscribe(
        response => {
          if (response.statusCode == 200) this.groupPermissions = response.data;
        },
        error => {
          console.log(error);
        }
      )
    } else {
      this.businessService.getStaffRolePermissions(role.id).subscribe(
        response => {
          if (response.statusCode == 200) this.groupPermissions = response.data;
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  getMyBusinessStaffDetails(id){
    this.businessService.getMyBusinessStaffDetails(id).subscribe(
      response => {
        if (response.statusCode == 200) {
          this.myDetails = response.data.user;
          this.business = response.data.organization;
          this.role = response.data.role;
          this.getBusinessRolePermissions(this.role);
        }
      },
      error => {
        console.log(error);
      }
    )
  }

}
