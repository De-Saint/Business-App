import { Component, OnInit, ViewChild } from '@angular/core';
import { BusinessService } from './../service/business.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-businessstaff',
  templateUrl: './businessstaff.component.html',
  styleUrls: ['./businessstaff.component.sass']
})
export class BusinessstaffComponent implements OnInit {
  id: Number;
  searchText = "";
  staff = [];
  staffDup = [];
  currentStaff: any;
  selectedMember: any;
  selectedRole: any;
  selectedStatus: any;
  searchedMembers = [];
  roles = [];
  statuses = [];
  rolePermissions = [];
  businessPermissions = [];
  assignedPermissions = [];
  assignedPermissionIds = [];
  newRole = "";

  @ViewChild('closebutton') closebutton;
  @ViewChild('editmodalclose') editmodalclose;
  @ViewChild('editmodalclosestatus') editmodalclosestatus;

  constructor(private route: ActivatedRoute, private snackBar: MatSnackBar, private businessService: BusinessService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getBusinessStaff(this.id);
    this.getRoles();
    this.getStatus();
    this.getBusinessPermissions();
  }

  getBusinessStaff(id) {
    this.selectedMember = null;
    this.selectedRole = null;
    this.businessService.getBusinessStaff(id).subscribe(
      response => {
        if (response.statusCode == 200) {
          this.staff = response.data;
          //to display the staff you are working on or show the first staff if not any
          this.setCurrentStaff(this.currentStaff || this.staff[0]);
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  getRoles() {
    this.businessService.getOrganizationRoles(this.id).subscribe(
      response => {
        if (response.statusCode == 200) {
          this.roles = response.data;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  getStatus() {
    this.businessService.getStatuses().subscribe(
      response => {
        if (response.statusCode == 200) {
          this.statuses = response.data;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  findMembers(event) {
    this.searchText = event.target.value;
    this.searchedMembers = []
    if (this.searchText.length > 2) {
      this.businessService.findMembers(this.searchText).subscribe(
        response => {
          if (response.statusCode == 200) {
            this.searchedMembers = response.data;
          }
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  setCurrentStaff(staff) {
    this.currentStaff = staff;
    this.getRolePermissions(staff.role)
  }

  setSelectedMember(member) {
    this.selectedMember = member;
  }

  removeSelectedMember() {
    this.selectedMember = null;
  }

  setSelectedRole(role) {
    this.selectedRole = role;
  }
  setSelectedStatus(status) {
    this.selectedStatus = status;
  }

  addBusinessStaff() {
    this.businessService.addBusinessStaff(this.id, this.selectedRole.id, this.selectedMember.id).subscribe(
      response => {
        if (response.statusCode === 200) {
          this.closebutton.nativeElement.click();
          this.showNotification("snackbar-success", response.description, "top", "Right");
          this.getBusinessStaff(this.id);
        }
      },
      error => {
        console.log(error);
        this.showNotification("snackbar-warning", error.description || error.message, "top", "Right");
      }
    );
  }

  editStaffRole() {
    this.businessService.editStaffRole(this.id, this.selectedRole.id, this.currentStaff.user.id).subscribe(
      response => {
        if (response.statusCode == 200) {
          this.editmodalclose.nativeElement.click();
          this.showNotification("snackbar-success", response.description, "top", "Right");

          //to set the role for the current staff as the just selected role in the DOM
          this.currentStaff.role = this.selectedRole;
          this.getBusinessStaff(this.id);
        }
      },
      error => {
        console.log(error);
        this.showNotification("snackbar-warning", error.description || error.message, "top", "Right");
      }
    );
  }


  editStaffStatus() {
    this.businessService.editStaffStatus(this.id,  this.currentStaff.user.id, this.selectedStatus.id).subscribe(
      response => {
        if (response.statusCode == 200) {
          this.editmodalclosestatus.nativeElement.click();
          this.showNotification("snackbar-success", response.description, "top", "Right");

          //to set the role for the current staff as the just selected role in the DOM
          if(this.selectedStatus.name === "Removed"){
            this.currentStaff = null;
          }else {
            this.currentStaff.status = this.selectedStatus;
          }
          this.getBusinessStaff(this.id);
        }
      },
      error => {
        console.log(error);
        this.showNotification("snackbar-warning", error.description || error.message, "top", "Right");
      }
    );
  }


  getRolePermissions(role) {
    this.rolePermissions = [];
    if (role.name.toLowerCase() == "owner") {
      this.businessService.getBusinessPermissions(this.id).subscribe(
        response => {
          if (response.statusCode == 200) this.rolePermissions = response.data;
        },
        error => {
          console.log(error);
        }
      )
    } else {
      this.businessService.getStaffRolePermissions(role.id).subscribe(
        response => {
          if (response.statusCode == 200) this.rolePermissions = response.data;
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  getBusinessPermissions() {
    this.businessPermissions = [];
    this.businessService.getBusinessPermissions(this.id).subscribe(
      response => {
        console.log(response)
        if (response.statusCode == 200) this.businessPermissions = response.data;
      },
      error => {
        console.log(error);
      }
    )
  }

  searchStaff(event) {
    let searchtext = "" + event.target.value.toLowerCase();

    //to check that the staff list is populated and create a duplicate if not yet created
    if (this.staffDup.length < 1 && this.staff.length > 0) this.staffDup = this.staff;

    //return the staff arraylist if the searchtext is empty
    if (searchtext.length == 0) return this.staff = this.staffDup;

    //to search the already populated staff list using the searchtext
    this.staff = this.staffDup.filter((member) => {
      return member.user.first_name.toLowerCase().includes(searchtext) ||
        member.user.last_name.toLowerCase().includes(searchtext) ||
        member.user.phone_number.toLowerCase().includes(searchtext) ||
        member.user.unique_id.toLowerCase().includes(searchtext) ||
        member.user.email.toLowerCase().includes(searchtext) ||
        member.user.username.toLowerCase().includes(searchtext) ||
        member.role.name.toLowerCase().includes(searchtext)
    });
  }

  addOrRemoveRolePermissions(permission) {
    if (this.assignedPermissions.includes(permission))
      return this.assignedPermissions.splice(this.assignedPermissions.indexOf(permission), 1)
    this.assignedPermissions.push(permission);
  }

  createStaffRole() {
    let role = { "name": this.newRole, "organizationId": this.id, "roletypeId": 3 };
    this.assignedPermissions.map((permission) => this.assignedPermissionIds.push(permission.id));
    this.businessService.createOrganizationRoleWithPermissions(role, this.assignedPermissionIds).subscribe(
      response => {
        if (response.statusCode == 200) {
          this.showNotification("snackbar-success", response.description, "top", "Right");
          this.getBusinessPermissions();
          this.getRoles();
          this.assignedPermissions = [];
        }
      },
      error => {
        console.log(error);
        this.showNotification("snackbar-warning", error.description || error.message, "top", "Right");
      }
    );
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 5000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName
    });
  }

}
