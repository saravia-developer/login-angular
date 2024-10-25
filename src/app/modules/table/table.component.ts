import { Component, ElementRef, ViewChild } from '@angular/core';
import { TableService } from 'src/app/services/table/table.service';
import { IResponseSuccessReadFile } from './interfaces/response.interface';
import { fileAllowed } from './utils/file.allowed';
import { ToasterService } from 'src/app/commons/toaster/toaster.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  file!: File;
  fileInformation: string[][] = [];
  fileTableHead: string[] = [];
  fileTableBody: string[][] = [];
  prohibitedFile: boolean = false;

  @ViewChild('uploadDocument')
  btnSubmitDocument!: ElementRef<HTMLButtonElement>;
  @ViewChild('uploadInput') inputSubmitDocument!: ElementRef<HTMLInputElement>;

  constructor(
    private tableServices: TableService,
    private toasterServices: ToasterService
  ) {}

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {
      this.file = target.files[0];
      this.prohibitedFile = !fileAllowed.includes(this.file.type);

      if (!this.prohibitedFile) {
        this.prohibitedFile = false;
        this.btnSubmitDocument.nativeElement.disabled = false;
        return;
      }
    }

    event.preventDefault();
    this.inputSubmitDocument.nativeElement.files = null;
    this.inputSubmitDocument.nativeElement.value = '';
    this.btnSubmitDocument.nativeElement.disabled = true;
    this.prohibitedFile = true;
  }

  fileUpload(event: Event): string | void {
    event.preventDefault();

    if (!this.file) return;

    const formData = new FormData();
    formData.append('file', this.file);

    this.tableServices.readFile(formData).subscribe({
      next: (res) => {
        const { message } = res as IResponseSuccessReadFile;
        this.btnSubmitDocument.nativeElement.disabled = true;
        this.fileInformation = (res as IResponseSuccessReadFile).formatData;
        this.fileTableHead = this.fileInformation[0];
        this.fileTableBody = this.fileInformation.filter((element, i) => i > 0);

        this.inputSubmitDocument.nativeElement.value = '';

        this.toasterServices.show(message, 'Operación exitosa')
      },
      error: (err) => {
        this.toasterServices.show('Ocurrio un error al intentar subir el archivo', 'Operación fallida')
      },
      complete: () => {
        console.log('Operación Culminada');
      },
    });
  }
}
