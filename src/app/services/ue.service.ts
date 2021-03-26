import { HttpClient, HttpHeaders } from '@angular/common/http';
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

getAllEnseignant(){
    return this.httpClient.get(this.mainUrl+"allEnseignants");
}

updateEnseignantUE(codeUE:any, ensCode:any){
    const headers = new HttpHeaders({
        "Content-Type": "application/json"
      });
    return this.httpClient.put(this.mainUrl+"updateUEEnseignant/code="+codeUE+"/ensCode="+ensCode,{headers: headers});
}



}