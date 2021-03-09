import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-formation-form',
  templateUrl: './formation-form.component.html',
  styleUrls: ['./formation-form.component.scss']
})
export class FormationFormComponent implements OnInit {
  
  code:any;
  formationForm: FormGroup;
  test = false;
  constructor(private formBuilder: FormBuilder, private dialog: MatDialog) { }
 
  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.formationForm = this.formBuilder.group({
      codeFormation: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      diplome: ['',[Validators.required]],
      numAnnee: ['',[Validators.required,  ]],
      nomFormation: ['',[Validators.required]],
      doubleDiplome: ['false',[Validators.required]],
      dateDebut: ['',[]],
      dateFin: ['',[]],
    });
  }

  upperCase(){
    this.code = this.formationForm.value['codeFormation'].toUpperCase();
  }
  getErrocMessage(formControlName: string){
    if(this.formationForm.get(formControlName).hasError('required'))
      return "Ce champs est obligatoire";
    if(this.formationForm.get(formControlName).hasError('maxlength'))
      return "Le nombre Maximum de caractère est 10 ";
    else
      return "Le nombre Minimum de caractère est 10";
  }

  onSubmitForm(){
    const formValue = this.formationForm.value;
    console.log(formValue);
    this.dialog.closeAll();
  }
  fermer(){
    this.dialog.closeAll();
  }

}
