import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class UeService {

  constructor(private httpClient: HttpClient) {
  }

  private mainUrl = 'https://projetagile.cleverapps.io/';

  getAllUe() {
    return this.httpClient.get(this.mainUrl + 'allUniteEnseignement');
  }

  getFormationUE(code: any) {
    console.log(code);
    return this.httpClient.get(this.mainUrl + 'UniteEnseignements/Formation/code=' + code);
  }

  /* not done yet */
  getAllEnseignant() {
    return this.httpClient.get(this.mainUrl);
  }

  getUE(code: any) {
    return this.httpClient.get(this.mainUrl + 'UniteEnseignements/UE/code=' + code);
  }

  modifUe(code: any, designation: any, nbhCm: any, nbhTd: any, nbhTp: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.httpClient.put(this.mainUrl + 'UniteEnseignements/UE/code=' + code + '/designation=' + designation + '/nbhCm=' + nbhCm + '/nbhTd=' + nbhTd + '/nbhTp=' + nbhTp, {headers: headers});
  }


}
