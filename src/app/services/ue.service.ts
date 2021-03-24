import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UeService{

constructor(private httpClient: HttpClient){}

private mainUrl = "https://projetagile.cleverapps.io/";

getAllUe(){
    return this.httpClient.get(this.mainUrl+"allUniteEnseignement");
}

getFormationUE(code:any){
    console.log(code);
    return this.httpClient.get(this.mainUrl+"UniteEnseignements/Formation/code="+code);
}
/* not done yet */
getAllEnseignant(){
    return this.httpClient.get(this.mainUrl)
}

getUE(code:any){
    console.log(code);
    return this.httpClient.get(this.mainUrl+"UniteEnseignements/UE/code="+code);
  }


}
