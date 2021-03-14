import { DatePipe } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormationService } from '../services/formation.service';

@Component({
  selector: 'app-formation-form',
  templateUrl: './formation-form.component.html',
  styleUrls: ['./formation-form.component.scss']
})
export class FormationFormComponent implements OnInit {
  
  code:any;
  formationForm: FormGroup;
  test = false;
  constructor(private formBuilder: FormBuilder, private dialog: MatDialog,
              private formationService: FormationService, private datePipe: DatePipe,
              private router: Router) { }
 
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
    let data = {
      "codeFormation": formValue.codeFormation,
      "debutAccreditation": this.datePipe.transform(formValue.dateDebut, 'yyyy-MM-dd'),
      "doubleDiplome": formValue.doubleDiplome,
      "finAccreditation": this.datePipe.transform(formValue.dateFin, 'yyyy-MM-dd'),
      "n0Annee": formValue.numAnnee,
      "nomFormation": formValue.nomFormation,
      "diplome": formValue.diplome
    }


    this.formationService.addFormation(data).subscribe((res)=>{
      console.log(res);
    });
    /* this.router.navigate(['formation']) */
    this.dialog.closeAll();
  }
  fermer(){
    this.dialog.closeAll();
  }

}
