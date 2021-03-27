import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class FormationService{

constructor(private httpClient: HttpClient){

}
private mainUrl = "https://projetagile.cleverapps.io/";

getAllFormation(){
    return this.httpClient.get(this.mainUrl+"allFormations");
}
addFormation(data: any): Observable<any>{
    const headers = new HttpHeaders({
        "Content-Type": "application/json"
      });
    return this.httpClient.post(this.mainUrl+"formation", data, {headers: headers});
}

getDetailsFormation(code:any){
    return this.httpClient.get(this.mainUrl+"Formations/code="+code);
}

deleteFormation(code:any){
  return this.httpClient.delete(this.mainUrl+"Formations/delete/code="+code);
}

}
