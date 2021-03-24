import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  constructor(private dialog: MatDialogRef<UEnseignantModifComponent>, private ueService: UeService) { }


  ngOnInit(): void {
    
/*     this.ueService.getAllEnseignant().subscribe(res=>{

    }); */

    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  
  fermer(){
    console.log('fermer');
    this.dialog.close();
  }



}
