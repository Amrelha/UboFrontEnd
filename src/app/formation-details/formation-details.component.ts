import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { FormationService } from '../services/formation.service';


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
  recherche: any;
  data: any = new Object() ;
  constructor(private route: ActivatedRoute, private router: Router,
              private formationService: FormationService) { }

  ngOnInit() {
    this.recherche = history.state.data;

     this.code = this.route.snapshot.paramMap.get('Code');
      this.formationService.getDetailsFormation(this.code).subscribe((res)=>{
          this.data = {
            code: res["codeFormation"],
            diplome: res["diplome"],
            no_annee: res["n0Annee"],
            nom_formation: res["nomFormation"],
            double_diplome: res["doubleDiplome"],
            debut_habilitation: res["debutAccreditation"],
            fin_habilitation: res["finAccreditation"]
          };
        

      });

  }

/*   getDetails() : any {
    console.log(this.data);
    return Object({
      code: 'example',
      diplome: 'example',
      no_annee: 2,
      nom_formation: 'example',
      double_diplome: 'OUI',
      debut_habilitation: '25/11/2020',
      fin_habilitation: '25/11/2021'
    });
  } */

  retourner() {
    this.router.navigate(['formation'], {state: {data:  this.recherche}});
  }

  returnZero() {
    return 0;
}

}
