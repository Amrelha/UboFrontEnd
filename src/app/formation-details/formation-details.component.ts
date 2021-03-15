import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

export interface FormationDetails {
  code: string;
  diplome: string;
  no_annee: number;
  nom_formation: string;
  double_diplome: string;
  debut_habilitation: string;
  fin_habilitation: string;
}


@Component({
  selector: 'app-formation-details',
  templateUrl: './formation-details.component.html',
  styleUrls: ['./formation-details.component.scss']
})

export class FormationDetailsComponent implements OnInit {

  code: string;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
          this.code = params.code;
        }
      );
  }

  getDetails() : any {
    return Object({
      code: 'DOSI',
      diplome: 'Example',
      no_annee: 2,
      nom_formation: 'Développement logiciel des systèmes d\'information',
      double_diplome: 'OUI',
      debut_habilitation: '25/11/2020',
      fin_habilitation: '25/11/2021'
    });
  }

  retourner() {
    this.router.navigate(['formation']);
  }

  returnZero() {
    return 0;
}

}
