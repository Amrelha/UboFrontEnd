import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-formation-form',
  templateUrl: './formation-form.component.html',
  styleUrls: ['./formation-form.component.scss']
})
export class FormationFormComponent implements OnInit {
  disableSelect = new FormControl(false);
  constructor() { }

  ngOnInit(): void {
  }

}
