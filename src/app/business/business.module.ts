import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ChartsModule as chartjsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MorrisJsModule } from 'angular-morris-js';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressButtonsModule } from 'mat-progress-buttons';
import { NgxMaskModule } from 'ngx-mask';
import { ColorPickerModule } from 'ngx-color-picker';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CustomFormsModule } from 'ngx-custom-validators';
import { ArchwizardModule } from 'angular-archwizard';

import { BusinessRoutingModule } from './business-routing.module';
import { BusinessesComponent } from './businesses/businesses.component';
import { BusinessprofileComponent } from './businessprofile/businessprofile.component';
import { BusinessstaffComponent } from './businessstaff/businessstaff.component';
import { BusinesspermissionsComponent } from './businesspermissions/businesspermissions.component';

@NgModule({
    declarations: [
        BusinessesComponent,
        BusinessprofileComponent,
        BusinessstaffComponent,
        BusinesspermissionsComponent
    ],
    imports: [
      ArchwizardModule,
      DropzoneModule,
      CKEditorModule,
      CustomFormsModule,
      MatButtonToggleModule,
      MatRippleModule,
      MatDialogModule,
      MatDividerModule,
      MatGridListModule,
      MatMenuModule,
      MatPaginatorModule,
      MatRadioModule,
      MatSelectModule,
      MatSlideToggleModule,
      MatSortModule,
      MatStepperModule,
      MatTableModule,
      MatToolbarModule,
      MatTooltipModule,
      MatTreeModule,
      NgxMaskModule,
      ColorPickerModule,
      MaterialFileInputModule,
      CommonModule,
      chartjsModule,
      NgxEchartsModule,
      MorrisJsModule,
      PerfectScrollbarModule,
      MatIconModule,
      NgApexchartsModule,
      MatButtonModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatBadgeModule,
      MatChipsModule,
      MatAutocompleteModule,
      MatBottomSheetModule,
      MatListModule,
      MatSidenavModule,
      MatSnackBarModule,
      MatExpansionModule,
      MatDatepickerModule,
      MatCardModule,
      MatProgressSpinnerModule,
      MatProgressBarModule,
      MatSliderModule,
      MatTabsModule,
      MatCheckboxModule,
      ReactiveFormsModule,
      MatProgressButtonsModule,
      BusinessRoutingModule
    ],
  })
  export class BusinessModule {}
  