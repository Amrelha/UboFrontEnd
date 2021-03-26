import {DatePipe} from '@angular/common';
import {HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormControlName, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {FormationService} from '../services/formation.service';
import {UeService} from '../services/ue.service';
import {TextMaskModule} from 'angular2-text-mask';
import {DateAdapter} from '@angular/material/core';
import {FormationFormComponent} from '../formation-form/formation-form.component';

export interface UEInterface {
  designation: string,
  id: {
    codeFormation: string,
    codeUe: string
  }
}

export interface UniteEnseignements {
  id: {
    codeFormation: string,
    codeUe: string
  },
  description: string,
  designation: string,
  nbhCm: number,
  nbhTd: number,
  nbhTp: number,
  semestre: string,
  elementConstitutifs: [{}],
  enseignant: {}


}

@Component({
  selector: 'app-ue-form',
  templateUrl: './ue-form.component.html',
  styleUrls: ['./ue-form.component.scss']
})
export class UeFormComponent implements OnInit {

  code: any;
  designation: any;
  nbhCm: number;
  nbhTd: number;
  nbhTp: number;
  nbt: any;
  formationForm: FormGroup;
  added: boolean = false;
  checked: string = 'n';
  ueList: UEInterface[] = new Array();

  constructor(private formBuilder: FormBuilder, private dialog: MatDialogRef<FormationFormComponent>,
              private formationService: FormationService, private datePipe: DatePipe,
              private router: Router, private ueService: UeService, private adapter: DateAdapter<any>) {
  }

  ngOnInit(): void {
    this.initForm();
    this.ueService.getUE(this.code).subscribe((res: any[]) => {
      this.designation = res['designation'];
      this.nbhCm = res['nbhCm'];
      this.nbhTd = res['nbhTd'];
      this.nbhTp = res['nbhTp'];
      this.nbt= +this.nbhCm + 1.5*this.nbhTd + 2/3*this.nbhTp;
      this.nbt = this.nbt.toFixed(1);

    });

    this.adapter.setLocale('fr');

  }

  initForm() {
    this.formationForm = this.formBuilder.group({
      Nom: [{value: '', disabled: true}],
      designation: ['', [Validators.required]],
      nbhCm: ['', [Validators.required, Validators.min(0),  Validators.pattern('^[0-9]*$')]],
      nbhTd: ['', [Validators.required, Validators.min(0),  Validators.pattern('^[0-9]*$')]],
      nbhTp: ['', [Validators.required, Validators.min(0),  Validators.pattern('^[0-9]*$')]],
      nbt: [{value: '', disabled: true}],
    });
  }

  upperCase() {
    this.code = this.formationForm.value['Code UE'].toUpperCase();
  }

  getErrocMessage(formControlName: string) {
    if (this.formationForm.get(formControlName).hasError('required')) {
      return 'Ce champs est obligatoire';
    }
    if (this.formationForm.get(formControlName).hasError('min')) {
      return 'Le nombre d\'heures doit être supérieur à 0';
    }
    if (this.formationForm.get(formControlName).hasError('pattern')) {
      return 'Ce champs n\'admet que des nombres entiers';
    }
  }

  onSubmitForm() {
    const formValue = this.formationForm.value;
    const idList: UniteEnseignements[] = new Array();

    this.ueService.modifUe(this.code,this.designation,this.nbhCm,this.nbhTd,this.nbhTp).subscribe((res) => {
      this.added = !!res;
      this.dialog.close({data: this.added});
    });


  }

  fermer() {
    console.log('fermer');
    this.dialog.close({data: null});
  }

  onChangeEvent(event: any){

    this.nbt = +this.nbhCm + 1.5*this.nbhTd + 2/3*this.nbhTp;
    this.nbt = this.nbt.toFixed(1);

  }

}
