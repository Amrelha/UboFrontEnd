import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UeService } from '../services/ue.service';

@Component({
  selector: 'app-uenseignant-modif',
  templateUrl: './uenseignant-modif.component.html',
  styleUrls: ['./uenseignant-modif.component.scss']
})
export class UEnseignantModifComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = new Array();
  filteredOptions: Observable<string[]>;
  profValue: string = "";
  profmap: Map<string, number> = new Map();
  profEns: string = "";
  etat: string = "";
  constructor(private dialog: MatDialogRef<UEnseignantModifComponent>,
    private ueService: UeService, @Inject(MAT_DIALOG_DATA) private data: any) {

  }


  ngOnInit(): void {
console.log("*********************************")
    this.ueService.getAllEnseignant().subscribe((res: any[]) => {
      res.forEach(element => {
        this.options.push(element.nom.toUpperCase() + " " + element.prenom + " Heures de travail : " + element.nombreHeuresTD);
        this.profmap.set(element.nom.toUpperCase() + " " + element.prenom + " Heures de travail : " + element.nombreHeuresTD, element.id);
        if (element.nom.toUpperCase() + " " + element.prenom == this.data.nomPrenom) {
          this.myControl.setValue(element.nom.toUpperCase() + " " + element.prenom + " Heures de travail : " + element.nombreHeuresTD);
          this.profEns = element.nom.toUpperCase() + " " + element.prenom + " Heures de travail : " + element.nombreHeuresTD;
        }
      });
    });
    console.log("*** " + this.data.nomPrenom);
    console.log(this.options);

    setTimeout(() => {
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    }, 1000);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  fermer() {
    console.log('fermer');
    this.dialog.close({data:null});
  }
  verify(event: any) {
    console.log(event.target.value)
  }
  onSubmitForm() {

   /*  console.log(this.profmap.get("LL MM Heures de travail : 126.68")); */
    if (this.profmap.get(this.myControl.value) == undefined) {
      console.log("prof n'existe pas");
      this.etat = "existePas";
     setTimeout(() => {
       this.etat = "";
     }, 3000);
      
    }
    else if (this.myControl.value == this.profEns) {
      console.log("rien a modif");
      this.etat = "existe";
      setTimeout(() => {
        this.etat = "";
      }, 3000);
    } else {
     this.ueService.updateEnseignantUE(this.data.codeUE,this.profmap.get(this.myControl.value)).subscribe(res=>{
       console.log(res);
       if(res == true){
         this.profEns = this.myControl.value;
         this.dialog.close({data: true, UE: this.data.UE});
       }else{

       }
     })
/* change this.profEns value */
    }


  }



}
