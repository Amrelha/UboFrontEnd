import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  Code: string;
  Niveau: string;
  Libelle: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Niveau:"M2",Code:"Smart",Libelle:"imperdiet nec, leo. Morbi"},{Niveau:"L2",Code:"General Motors",Libelle:"lectus sit amet luctus vulputate,"},{Niveau:"M1",Code:"Mahindra and Mahindra",Libelle:"Aliquam erat volutpat. Nulla facilisis."},{Niveau:"M2",Code:"JLR",Libelle:"orci, adipiscing non, luctus sit amet, faucibus ut, nulla. Cras"},{Niveau:"L3",Code:"Toyota",Libelle:"Sed malesuada augue ut lacus. Nulla tincidunt, neque vitae semper"},{Niveau:"L3",Code:"Dodge",Libelle:"nulla. Integer"},{Niveau:"M1",Code:"Peugeot",Libelle:"auctor, nunc"},{Niveau:"M2",Code:"Honda",Libelle:"placerat, orci lacus vestibulum lorem,"},{Niveau:"L2",Code:"RAM Trucks",Libelle:"id, blandit at, nisi. Cum sociis natoque penatibus"},{Niveau:"M1",Code:"Mitsubishi Motors",Libelle:"non dui nec"},{Niveau:"L3",Code:"Ferrari",Libelle:"vitae, erat."},{Niveau:"L1",Code:"Cadillac",Libelle:"iaculis"},{Niveau:"L2",Code:"JLR",Libelle:"mi. Duis risus odio, auctor vitae, aliquet nec, imperdiet"},{Niveau:"L2",Code:"Mercedes-Benz",Libelle:"aliquet odio. Etiam"},{Niveau:"M1",Code:"Acura",Libelle:"aliquet vel, vulputate eu, odio. Phasellus at augue id"},{Niveau:"M1",Code:"Honda",Libelle:"velit dui, semper et, lacinia vitae, sodales at, velit."},{Niveau:"L1",Code:"Citroën",Libelle:"cubilia Curae; Donec tincidunt."},{Niveau:"L1",Code:"Honda",Libelle:"malesuada augue ut lacus. Nulla tincidunt, neque vitae semper egestas,"},{Niveau:"M2",Code:"Acura",Libelle:"felis ullamcorper viverra."},{Niveau:"L1",Code:"Renault",Libelle:"at, nisi."},{Niveau:"L2",Code:"Mahindra and Mahindra",Libelle:"ac, fermentum"},{Niveau:"M1",Code:"Maruti Suzuki",Libelle:"bibendum sed, est. Nunc laoreet lectus quis massa. Mauris"},{Niveau:"M1",Code:"Maruti Suzuki",Libelle:"euismod ac, fermentum vel, mauris. Integer sem elit, pharetra"},{Niveau:"L1",Code:"BMW",Libelle:"mollis. Phasellus libero mauris, aliquam"},{Niveau:"L1",Code:"Dacia",Libelle:"Etiam vestibulum massa rutrum magna."},{Niveau:"L1",Code:"Hyundai Motors",Libelle:"orci luctus et"},{Niveau:"L3",Code:"Jeep",Libelle:"parturient montes, nascetur ridiculus mus. Proin vel arcu eu odio"},{Niveau:"L2",Code:"Maruti Suzuki",Libelle:"Nulla facilisi. Sed neque. Sed eget lacus. Mauris"},{Niveau:"M1",Code:"Citroën",Libelle:"enim. Suspendisse aliquet, sem ut"},{Niveau:"L1",Code:"Subaru",Libelle:"feugiat placerat"},{Niveau:"M1",Code:"Suzuki",Libelle:"ante dictum mi, ac mattis velit justo nec ante."},{Niveau:"L1",Code:"Kenworth",Libelle:"sagittis lobortis mauris."},{Niveau:"M1",Code:"Isuzu",Libelle:"eget, ipsum. Donec sollicitudin adipiscing ligula. Aenean gravida nunc sed"},{Niveau:"M1",Code:"Vauxhall",Libelle:"In at pede. Cras vulputate velit"},{Niveau:"L1",Code:"Dongfeng Motor",Libelle:"et netus et malesuada fames ac"},{Niveau:"L3",Code:"Jeep",Libelle:"condimentum. Donec at arcu. Vestibulum ante"},{Niveau:"M1",Code:"FAW",Libelle:"vitae, erat. Vivamus nisi."},{Niveau:"M1",Code:"MINI",Libelle:"semper pretium neque. Morbi quis"},{Niveau:"L2",Code:"Mercedes-Benz",Libelle:"metus vitae velit egestas lacinia. Sed congue, elit sed"}
];

/**
 * @title Sorting overview
 */
@Component({
  selector: 'app-formations-table',
  templateUrl: './formations-table.component.html',
  styleUrls: ['./formations-table.component.css']
})
export class FormationsTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['Niveau', 'Code', 'Libelle'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
