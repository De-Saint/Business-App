import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";

export class Response{
  constructor( public statusCode:number, public description: string, public data: Object, public errors: Object){

  }
}

export class Business {


  constructor(
      public business_description: string,
      public email: string,
      public name: string,
      public phone: string,
      public cac_number: string,
      public website_link: string,
      public date_founded: Date,
      public group_typeId: Number,
      public groupId: Number,
      public sub_groupId: Number,
      public member_typeId: Number,
      public sub_member_typeId: Number,
      public business_sectorId: Number,
      public business_typeId: Number
      ) {
  }

}

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  base_url = environment.app_url;
  private navigationData = [];
  constructor(private http: HttpClient) {
  }

  getBusinessSectors() {
    return this.http.get<any>(`${this.base_url}/businesses/sectors/getall`);
  }

  getMemberTypes() {
    return this.http.get<any>(`${this.base_url}/users/membertypes/getall`);
  }

  getSectorBusinessTypes(id) {
    return this.http.get<any>(`${this.base_url}/businesses/business_types/sector/get/${id}`);
  }

  getGroupsByGrouptypeId(id) {
    return this.http.get<any>(`${this.base_url}/users/groups/grouptype/get/${id}`);
  }

  getSubGroupsByGroupId(id) {
    return this.http.get<any>(`${this.base_url}/users/subgroups/group/get/${id}`);
  }

  getSellerGroupDetails(name) {
    return this.http.get<any>(`${this.base_url}/users/groups/group?name=${name}`);
  }

  getSubMemberTypes(id) {
    return this.http.get<any>(`${this.base_url}/users/submember_type/membertype/get/${id}`);
  }

  getMyBusinesses(grouptypeId){
    return this.http.get<any>(`${this.base_url}/users/user/organizations/get?grouptypeId=${grouptypeId}`);
  }

  getOrganizationRoles(id){
    return this.http.get<any>(`${this.base_url}/users/organizations/roles/get/${id}`);
  }
  getStatuses(){
    return this.http.get<any>(`${this.base_url}//users/statuses/getall`);
  }

  findMembers(searchText){
    return this.http.get<any>(`${this.base_url}/users/user/search?searchText=${searchText}`);
  }

  getMyBusinessStaffDetails(orgId){
    return this.http.get<any>(`${this.base_url}/users/organizations/staff/user/get/${orgId}`);
  }

  addBusinessStaff(organizationId, roleId, userId){
    return this.http.post<any>(`${this.base_url}/users/organizations/staff/add?organizationId=${organizationId}&roleId=${roleId}&userId=${userId}`,"");
  }

  editStaffRole(organizationId, roleId, userId){
    return this.http.put<any>(`${this.base_url}/users/organizations/staff/roles/change?organizationId=${organizationId}&userId=${userId}&roleId=${roleId}`,"");
  }

  editStaffStatus(orgId, staffId, statusId){
    return this.http.put<any>(`${this.base_url}/users/organizations/staff/status/change?organizationId=${orgId}&statusId=${statusId}&userId=${staffId}`, "");
  }

  createBusiness(business){
    return this.http.post<Response>(`${this.base_url}/users/organizations/create`, business);
  }

  getBusinessDetails(id){
    return this.http.get<any>(`${this.base_url}/businesses/business/organization/get/${id}`);
  }
  confirmEmail(verificationcode) {
    return this.http.put<any>(`${this.base_url}/users/user/organizations/email/activate?verificationcode=${verificationcode}`, "");
  }

  updateStaffStatus(orgId, staffId, statusId){
    return this.http.put<any>(`${this.base_url}/users/organizations/staff/status/change?organizationId=${orgId}&statusId=${statusId}&userId=${staffId}`, "");
  }

  removeOrganizationStaff(orgId, staffId){
    return this.http.put<any>(`${this.base_url}/users/organizations/staff/delete?organizationId=${orgId}&userId=${staffId}`, "");
  }

  getBusinessStaff(orgId){
    return this.http.get<any>(`${this.base_url}/users/organizations/staff/get/${orgId}`);
  }

  getBusinessPermissions(orgId){
    return this.http.get<any>(`${this.base_url}/permissions/organization/allpermissions/get/${orgId}`);
  }

  getStaffRolePermissions(roleId){
    return this.http.get<any>(`${this.base_url}/permissions/role/allpermissions/get/${roleId}`);
  }

  createOrganizationRoleWithPermissions(role, permissionIds){
    return this.http.post<Response>(`${this.base_url}/users/organization/roles/create?permissionIDs=${permissionIds}`, role);
  }

  setNavData(data) {
    this.navigationData = data;
  }
  getNavData() {
    return this.navigationData;
  }
}
