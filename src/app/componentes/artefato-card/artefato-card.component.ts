import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-artefato-card',
  templateUrl: './artefato-card.component.html',
  styleUrls: ['./artefato-card.component.css']
})
export class ArtefatoCardComponent implements OnChanges {

  @Input()
  public edit: boolean;

  protected uploadedFiles: any[] = [];

  constructor(private messageService: MessageService) { }

  ngOnChanges(changes: SimpleChanges) {
  }

  protected onUpload(event) {
    for (const file of event.files) {
        this.uploadedFiles.push(file);
    }

    this.messageService.add(
      {
        severity: 'info',
        summary: 'Arquivo enviado!',
        detail: ''
      }
    );
  }

}
