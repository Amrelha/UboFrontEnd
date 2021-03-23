import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormationFormComponent } from '../formation-form/formation-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormationService } from '../services/formation.service';
import { UeService } from '../services/ue.service';


export interface FormationInterface {
  Code: string;
  Niveau: string;
  Libelle: string;
}

export interface UEInterface {
  Code: string;
  Semestre: string;
  Description: string;
}



const UE_DATA: UEInterface[] = [
  { Code: "JAVA", Semestre: "S5", Description: "Programmation en Java" },
  { Code: "JEE", Semestre: "S6", Description: "Programmation en J2EE" }
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
  component: string = "";

  
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

        console.log("tessst")
        this.recherche = history.state.data;
        this.dataSource.filter = this.recherche.trim().toLowerCase();
      }
    }, 2000);

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isNiveau(column: string): boolean {
    return column === "Niveau";
  }
  openDialog() {
    console.log("test");
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(FormationFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(res =>{
      
      if( res.data == true ){
        console.log(res);
        this.renderRowFunction();
        console.log("data est ajouter");
        this.etat = "ajouter";
        setTimeout(() => {
          this.etat = "";
        }, 6000);
      }if( res.data == false ){
        console.log("existe deja");
        console.log(res)
        this.etat = "existe";
        setTimeout(() => {
          this.etat = "";
        }, 6000);
      }
    })
  }

  ngOnInit(){

    if (this.route.snapshot.url[0].path === 'formation'){
      this.component = "formation";
      this.displayedColumns = ['Niveau', 'Code', 'Libelle'];
      this.formationService.getAllFormation().subscribe((data: any[])=>{

        data.forEach((element, index) => {
          this.ElementData.push(
            {
              Code:  element.codeFormation,
              Niveau: element.diplome,
              Libelle: element.nomFormation
            }
          );
        },);
      });
        this.dataSource = new MatTableDataSource(this.ElementData);
    }
    else if (this.route.snapshot.url[0].path === 'formationDetails'){
      this.component = "formationDetails";
      this.displayedColumns = ['Code', 'Semestre', 'Description', 'Modifier enseignant'];
      console.log("codeFormation "+this.route.snapshot.paramMap.get('Code'));
      this.ueService.getFormationUE(this.route.snapshot.paramMap.get('Code')).subscribe((data: any[])=>{

        console.log(data)
        data.forEach((element, index) => {
          this.UElementData.push(
            {
              Code:  element.id.codeUe,
              Semestre: element.semestre,
              Description: element.description
            }
          );
        },);
      });
        this.dataSource = new MatTableDataSource(this.UElementData);

    }


      /* this.CodeF = this.route.snapshot.params['Code']; */
  }

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
    this.formationService.getAllFormation().subscribe((data: any[])=>{

      data.forEach((element, index) => {
        this.ElementData.push(
          {
            Code:  element.codeFormation,
            Niveau: element.diplome,
            Libelle: element.nomFormation
          }
        );
      },);
    });
      this.dataSource = new MatTableDataSource(this.ElementData);
    setTimeout(() => {
      this.table.renderRows();
    }, 2000);
    /* this.table.renderRows(); */
      
  }

}
