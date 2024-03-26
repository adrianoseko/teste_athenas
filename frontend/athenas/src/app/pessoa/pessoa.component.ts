import { Component, OnInit } from '@angular/core';
import { PessoaService } from './pessoa.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.scss']
})
export class PessoaComponent implements OnInit {
  id: any;
  pessoas: any;
  pessoaDialog: boolean = false;
  editDialog: boolean = false;
  pessoaForm: FormGroup;

  sexo = [
    { name: 'Masculino', code: 'M' },
    { name: 'Femenino', code: 'F' }
  ];
  selectedSexo: any;



  constructor(private pessoaService: PessoaService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder) {
    // Initialize pessoaForm inside the constructor
    this.pessoaForm = this.formBuilder.group({
      pNome: ['',],
      pData: ['',],
      pCpf: ['',],
      pSexo: ['',],
      pPeso: ['',],
      pAltura: ['',],
      url: ['',]
    });
  }

  ngOnInit() {
    this.listPessoa()
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

  }

  listPessoa() {
    this.pessoaService.getPessoas().subscribe(
      data => {
        this.pessoas = data;
        console.log(data);
      }
    );
  }

  addPessoa() {
    this.pessoaDialog = true;
  }

  public hidePreCad() {
    this.pessoaDialog = false;
    this.editDialog = false

  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;

  }

  savePessoa(pessoa) {
    pessoa.pData = this.formatDate(pessoa.pData)
    pessoa.pSexo = pessoa.pSexo.code
    console.log(pessoa)
    this.pessoaService.postPessoa(pessoa).subscribe(
      (res) => {
        alert("Dados salvos com sucesso!");
        this.listPessoa()
      },
      (error) => {
        alert("Ocorreu um erro ao tentar salvar os dados. Por favor, tente novamente mais tarde.");
        console.error("Erro ao salvar dados:", error);
      }
    )

  }

  editPessoa(pessoa) {
    this.editDialog = true
    console.log(pessoa)
    this.pessoaForm.patchValue({
      pNome: pessoa.pNome,
      pCpf: pessoa.pCpf,
      pSexo: pessoa.pSexo,
      pAltura: pessoa.pAltura,
      pPeso: pessoa.pPeso,
      url: pessoa.url
    });
  }

  patchPessoa(pessoa) {
    pessoa.pData = this.formatDate(pessoa.pData)
    pessoa.pSexo = pessoa.pSexo.code

    this.pessoaService.patchPessoa(pessoa).subscribe(
      (res) => {
        alert("Dados alterados com sucesso!");
        this.listPessoa()
      },
      (error) => {
        alert("Ocorreu um erro ao tentar alterar os dados. Por favor, tente novamente mais tarde.");
        console.error("Erro ao altera dados:", error);
      }

    )
  }

  deletePessoa(pessoa) {
    this.pessoaService.deletePessoa(pessoa).subscribe(
      (res) => {
        alert("Dados alterados com sucesso!");
        this.listPessoa()

      },
      (error) => {
        alert("Ocorreu um erro ao tentar alterar os dados. Por favor, tente novamente mais tarde.");
        console.error("Erro ao altera dados:", error);
      }

    )
  }



  calcularPesoIdeal(pessoa) {
    if (pessoa.pSexo === 'M') {
      const pesoIdeal = (72.7 * pessoa.pAltura) - 58;

      return pesoIdeal.toFixed(2);
    } else {
      const pesoIdeal = (62.1 * pessoa.pAltura) - 44.7;
      return pesoIdeal.toFixed(2);
    }
  }

  calcularPeso(pessoa) {
    console.log(pessoa)
    const pesoIdeal = this.calcularPesoIdeal(pessoa);
    alert("Seu peso Ideal é: " + pesoIdeal);
  }

}
