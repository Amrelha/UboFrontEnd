import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {FormationService} from '../services/formation.service';
import {DatePipe} from '@angular/common';
import {Router} from '@angular/router';
import {UeService} from '../services/ue.service';
import {DateAdapter} from '@angular/material/core';
import {UEInterface, UniteEnseignements} from '../formation-form/formation-form.component';

@Component({
  selector: 'app-suppression-dialog',
  templateUrl: './suppression-dialog.component.html',
  styleUrls: ['./suppression-dialog.component.scss']
})
export class SuppressionDialogComponent implements OnInit {
  private formationForm: any;
  code: any;
  constructor(private dialog: MatDialogRef<SuppressionDialogComponent>,
              private router: Router, private adapter: DateAdapter<any>, private formationService: FormationService) { }

  ngOnInit(): void {

  }


  onSubmitForm(){
    this.formationService.deleteFormation(this.code).subscribe((res)=> {
      console.log('supprimer');
      this.dialog.close({data: "supprimer"});
    });

  }

  fermer(){
    console.log('fermer');
    this.dialog.close({data:null});
  }

}
