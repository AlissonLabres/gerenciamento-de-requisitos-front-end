import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-artefato-card',
  templateUrl: './artefato-card.component.html',
  styleUrls: ['./artefato-card.component.css']
})
export class ArtefatoCardComponent implements OnChanges {

  @Input()
  public edit: boolean;
  protected artefatoForm: FormGroup;
  protected uploadedFiles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    this.cdr.detectChanges();
    if (changes) {
      this.initForm();
      this.cdr.detectChanges();
    }
    this.cdr.detectChanges();
  }

  /**
   * Seta arquivos para inviar.
   *
   * @param event Evento de upload.
   */
  protected onUpload(event): void {
    for (const file of event.files) {
        this.uploadedFiles.push(file);
    }
  }

  /**
   * Inicia formulário.
   */
  protected initForm(): void {
    this.artefatoForm = this.fb.group({
      nome: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
    });
  }

}
