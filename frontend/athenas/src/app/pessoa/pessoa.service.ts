import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private http: HttpClient) { }

  getPessoas() {
    return this.http.get('http://localhost:8000/pessoa')
  }

  postPessoa(pessoa) {


    return this.http.post<any>('http://localhost:8000/pessoa/', pessoa,);
  }

  patchPessoa(pessoa) {


    return this.http.patch<any>(pessoa.url, pessoa,);
  }

  deletePessoa(pessoa) {


    return this.http.delete<any>(pessoa.url,);
  }

}
