import { DatePipe } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormationService } from '../services/formation.service';
import { UeService } from '../services/ue.service';

export interface UEInterface{
  designation: string,
  id:{
    codeFormation: string,
    codeUe: string
  }
}

export interface UniteEnseignements{
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
    elementConstitutifs: [{ }],
    enseignant: {}
   

  }



@Component({
  selector: 'app-formation-form',
  templateUrl: './formation-form.component.html',
  styleUrls: ['./formation-form.component.scss']
})
export class FormationFormComponent implements OnInit {
  
  code:any;
  formationForm: FormGroup;
  added: boolean = false;
  ueList: UEInterface[] = new Array();
  constructor(private formBuilder: FormBuilder, private dialog: MatDialogRef<FormationFormComponent>,
              private formationService: FormationService, private datePipe: DatePipe,
              private router: Router, private ueService: UeService) { }
 
  ngOnInit(): void {
    this.initForm();
    this.ueService.getAllUe().subscribe((res: any[])=>{
      res.forEach(element => {
        this.ueList.push({
          designation: element.designation,
          id:{
            codeFormation: element.id.codeFormation,
            codeUe: element.id.codeUe
          }
        })
      });
    });
    console.log(this.ueList);


  }

  initForm(){
    this.formationForm = this.formBuilder.group({
      codeFormation: ['',[Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      diplome: ['',[Validators.required]],
      numAnnee: ['',[Validators.required,  ]],
      nomFormation: ['',[Validators.required]],
      doubleDiplome: ['n',[Validators.required]],
      dateDebut: ['',[]],
      dateFin: ['',[]],
      ueFormation:['',[Validators.required]]
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
      return "Le nombre Minimum de caractère est 6";
  }

  onSubmitForm(){
    console.log('submit');
    const formValue = this.formationForm.value;
    const idList:UniteEnseignements[] = new Array();
    formValue.ueFormation.forEach(element => {
      idList.push({
        id: {
          codeFormation: element.codeFormation,
          codeUe: element.codeUe
        },
          description: "",
          designation: "",
          nbhCm: null,
          nbhTd: null,
          nbhTp: null,
          semestre: "",
          elementConstitutifs: [{ }],
          enseignant: {}
      })
    });
    console.log(idList)
    let data = {
      "codeFormation": formValue.codeFormation,
      "debutAccreditation": this.datePipe.transform(formValue.dateDebut, 'yyyy-MM-dd'),
      "doubleDiplome": formValue.doubleDiplome,
      "finAccreditation": this.datePipe.transform(formValue.dateFin, 'yyyy-MM-dd'),
      "n0Annee": formValue.numAnnee,
      "nomFormation": formValue.nomFormation,
      "diplome": formValue.diplome,
      "uniteEnseignements":idList
    }


    this.formationService.addFormation(data).subscribe((res)=>{
      this.added = res;
      this.dialog.close({data:this.added});
    });
    
    
  }

  fermer(){
    console.log('fermer');
    this.dialog.close({data:null});
  }

}
