import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HeaderComponent } from './header/header.component';
import { FormationsTableComponent } from './formations-table/formations-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormationFormComponent} from './formation-form/formation-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DateAdapter, MatDateFormats, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FormationDetailsComponent } from './formation-details/formation-details.component';
import {MatCardModule} from '@angular/material/card';
import { FormationService } from './services/formation.service';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { UeService } from './services/ue.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { UEnseignantModifComponent } from './uenseignant-modif/uenseignant-modif.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
/* import {SuppressionDialogComponent} from './suppression-dialog/suppression-dialog.component';
import {UeFormComponent} from './ue-form/ue-form.component'; */
/* import { SuppressionDialogComponent } from './suppression-dialog/suppression-dialog.component';
import { UeFormComponent } from './ue-form/ue-form.component'; */

export const MY_FORMAT: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HeaderComponent,
    FormationsTableComponent,
    FormationFormComponent,
    FormationDetailsComponent,
    UEnseignantModifComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatDialogModule,
    RouterModule,
    AppRoutingModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatAutocompleteModule

  ],
  providers: [
    FormationService,
    DatePipe,
    UeService,
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMAT},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {width: '648px', scrollStrategy: new NoopScrollStrategy()}} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
