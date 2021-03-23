import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormationFormComponent } from '../formation-form/formation-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormationService } from '../services/formation.service';
import { UeService } from '../services/ue.service';
import {SuppressionDialogComponent} from '../suppression-dialog/suppression-dialog.component';
import {UeFormComponent} from '../ue-form/ue-form.component';


export interface FormationInterface {
  Code: string;
  Diplôme: string;
  Libellé: string;
}

export interface UEInterface {
  Nom: string;
  Semestre: string;
  Description: string;
}



const UE_DATA: UEInterface[] = [
  { Nom: "JAVA", Semestre: "S5", Description: "Programmation en Java" },
  { Nom: "JEE", Semestre: "S6", Description: "Programmation en J2EE" }
];


@Component({
  selector: 'app-formations-table',
  templateUrl: './formations-table.component.html',
  styleUrls: ['./formations-table.component.css']
})
export class FormationsTableComponent implements AfterViewInit, OnInit {
  displayedColumns: string[];
  ElementData: FormationInterface[] = new Array();
  UElementData: UEInterface[] = new Array();
  dataSource: any ;
  recherche: any;
  etat: string = "";


  constructor(private cdref: ChangeDetectorRef, private dialog: MatDialog,
              private router: Router, public route: ActivatedRoute,
              private formationService: FormationService, private ueService: UeService) { }

  @ViewChild(MatSort) sort: MatSort;
  @Input() isClickable = true;
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.sort = this.sort;

      const sortState: Sort = { active: this.displayedColumns[0], direction: 'asc' };
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);
      this.cdref.detectChanges();
      if (this.route.snapshot.url[0].path === 'formation' && history.state.data != undefined){

        this.recherche = history.state.data;
        this.dataSource.filter = this.recherche.trim().toLowerCase();
      }
    }, 0);

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isNiveau(column: string): boolean {
    return column === 'Diplôme';
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(FormationFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res =>{

      if( res.data == true ){
        console.log(res);
        this.renderRowFunction();
        console.log("data ajoutée");
        this.etat = "ajouter";
        setTimeout(() => {
          this.etat = "";
        }, 4000);
      }if( res.data == false ){
        console.log("existe deja");
        console.log(res)
        this.etat = "existe";
        setTimeout(() => {
          this.etat = "";
        }, 4000);
      }
    })
  }

  openDialogModif(elementElement: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(UeFormComponent, dialogConfig);
    dialogRef.componentInstance.code= elementElement;
    dialogRef.afterClosed().subscribe(res =>{

      if( res.data == true ){
        console.log(res);
        this.renderRowFunction();
        console.log("UE modifié");
        this.etat = "modifier";
        setTimeout(() => {
          this.etat = "";
        }, 4000);
      }if( res.data == false ){
        console.log("noModif");
        console.log(res)
        this.etat = "Nomodif";
        setTimeout(() => {
          this.etat = "";
        }, 4000);
      }
    })
  }

  ngOnInit(){

    if (this.route.snapshot.url[0].path === 'formation'){
      this.displayedColumns = ['Diplôme', 'Code', 'Libellé','Détails'];
      this.formationService.getAllFormation().subscribe((data: any[]) => {
        data.forEach((element, index) => {
          this.ElementData.push(
            {
              Code:  element.codeFormation.toUpperCase(),
              Diplôme: element.diplome,
              Libellé: element.nomFormation
            }
          );
        }, );
      });
      this.dataSource = new MatTableDataSource(this.ElementData);
    }
    else if (this.route.snapshot.url[0].path === 'formationDetails'){
      this.displayedColumns = ['Nom', 'Semestre', 'Description', 'DétailsUE'];
      console.log('codeFormation ' + this.route.snapshot.paramMap.get('Nom'));
   /*  this.ueService.getFormationUE(this.route.snapshot.paramMap.get('Nom')).subscribe((data: any[]) => {
        data.forEach((element, index) => {
          this.UElementData.push(
            {
              Nom:  element.id.codeUe,
              Semestre: element.semestre,
              Description: element.description
            }
          );
        }, );
      });
      this.dataSource = new MatTableDataSource(this.UElementData); */

      this.dataSource = UE_DATA;




      /* this.CodeF = this.route.snapshot.params['Code']; */
  }}

/*   Details(code: any){
    this.router.navigate(['/formationDetails/code']);
    console.log(code);

 } */




  Details(code){
    if (this.route.snapshot.url[0].path === 'formation') {

      this.router.navigate(['formationDetails/' + code], {state: {data:  this.recherche}});


    }
  }

  renderRowFunction(){
    this.ElementData = [];
    this.formationService.getAllFormation().subscribe((data: any[]) => {
      data.forEach((element, index) => {
        this.ElementData.push(
          {
            Code:  element.codeFormation,
            Diplôme: element.diplome,
            Libellé: element.nomFormation
          }
        );
      }, );
    });
    this.dataSource = new MatTableDataSource(this.ElementData);
    setTimeout(() => {
      this.table.renderRows();
    }, 2000);
    /* this.table.renderRows(); */

  }

  supprimerDialog(code){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(SuppressionDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res =>{
      console.log(res);
      if( res.data == 'supprimer' ){
        console.log(res);
        this.renderRowFunction();
        console.log("Formation supprimée");
        this.etat = "supprimer";
        setTimeout(() => {
          this.etat = "";
        }, 4000);
      }if( res.data == 'nosupprimer' ){
        console.log("existe deja");
        console.log(res)
        this.etat = "nosupprimer";
        setTimeout(() => {
          this.etat = "";
        }, 4000);
      }
    })
  }

}
