import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UeService{

constructor(private httpClient: HttpClient){}

private mainUrl = "https://projetagile.cleverapps.io/";

getAllUe(){
    return this.httpClient.get(this.mainUrl+"allUniteEnseignement");
}


}