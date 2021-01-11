import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BusinessService, Business } from "../service/business.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from "../../../environments/environment";


@Component({
  selector: 'app-businesses',
  templateUrl: './businesses.component.html',
  styleUrls: ['./businesses.component.sass']
})
export class BusinessesComponent implements OnInit {

  sectors = [];
  sellerGroups = [];
  sellerSubGroups = [];
  organizationTypes = [];
  corporateTypes = [];
  organizationType = '';
  businessTypes = [];
  MyBusinesses = [];
  business: Business;
  // businessDetails

  sellers_id = environment.sellersId;

  // Date Picker
  startDate = new Date(1990, 0, 1);
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  minDate: Date;
  maxDate: Date;

  @ViewChild('closebutton') closebutton;

  isLinear = false;
  constructor(private businessService: BusinessService,
    private router: Router,
    private snackBar: MatSnackBar) { }
  ngOnInit() {

    this.business = new Business("", "", "", "", null, null, null, this.sellers_id, -1, -1, -1, null, -1, -1)
    this.getMyBusinesses(this.sellers_id);
    this.getOrganizationTypes();
    this.getBusinessSectors();
    this.getGroupsByGrouptypeId(this.sellers_id);
  }

  getBusinessSectors() {
    this.businessService.getBusinessSectors().subscribe(
      response => {
        if (response.statusCode == 200) this.sectors = response.data;
      },
      error => {
        console.log(error);
      }
    )
  }

  getOrganizationTypes() {
    this.businessService.getMemberTypes().subscribe(
      response => {
        if (response.statusCode == 200) this.organizationTypes = response.data;
      },
      error => {
        console.log(error);
      }
    )
  }

  getGroupsByGrouptypeId(groupTypeId) {
    this.businessService.getGroupsByGrouptypeId(groupTypeId).subscribe(
      response => {
        if (response.statusCode == 200) this.sellerGroups = response.data;
      },
      error => {
        console.log(error);
      }
    )
  }
  getSubGroupsByGroupId(groupId) {
    this.businessService.getSubGroupsByGroupId(groupId).subscribe(
      response => {
        if (response.statusCode == 200) { this.sellerSubGroups = response.data; }
      },
      error => {
        console.log(error);
      }
    )
  }


  getMyBusinesses(sellersId) {
    this.businessService.getMyBusinesses(sellersId).subscribe(
      response => {
        if (response.statusCode === 200) {
          this.MyBusinesses = response.data;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  getSectorBusinessTypes(id) {
    this.business.business_sectorId = id;
    this.businessService.getSectorBusinessTypes(id).subscribe(
      response => {
        if (response.statusCode == 200) {
          this.displayBusinessSectorTypes(response.data);
        }
      },
      error => {
        console.log(error);
        this.displayBusinessSectorTypes([]);
      }
    )
  }

  getCorporateOrganizationTypes(id) {
    this.businessService.getSubMemberTypes(id).subscribe(
      response => {
        if (response.statusCode == 200) this.corporateTypes = response.data;
      },
      error => {
        console.log(error);
      }
    )
  }

  createBusiness() {
    this.businessService.createBusiness(this.business).subscribe(
      response => {
        if (response.statusCode == 200) {
          this.closebutton.nativeElement.click();
          this.showNotification("snackbar-success", response.description, "top", "Right");
          this.getMyBusinesses(this.sellers_id);
        }
      },
      error => {
        console.log(error);
        this.showNotification("snackbar-warning", error.description || error.message, "top", "Right");
      }
    );
  }

  setBusinessType(id) {
    this.business.business_typeId = id;
  }

  setSellerGroup(id) {
    this.business.groupId = id;
    this.getSubGroupsByGroupId(id);
  }

  setSellerSubGroup(id) {
    this.business.sub_groupId = id;
  }

  setOrganizationType(type) {
    this.business.member_typeId = type.id;
    this.organizationType = type.name;
    if (this.organizationType.toLowerCase() == "corporate") return this.getCorporateOrganizationTypes(type.id);
    this.organizationType = '';
  }

  displayBusinessSectorTypes(data) {
    this.businessTypes = data;
  }

  setCorporateType(id) {
    this.business.sub_member_typeId = id;
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 4000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName
    });
  }
  onOpen(business) {
    sessionStorage.setItem('businessName', business.organization.name);
    sessionStorage.setItem('businessUnique', business.organization.uniquiId);
    this.router.navigate(['/', 'business', 'profile', business.organization.id]);
  }
}

