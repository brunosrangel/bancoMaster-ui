import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private isOpen: boolean = false;

  constructor() { }

  openModal() {
    this.isOpen = true;
    document.body.classList.add('modal-open'); // Adiciona uma classe CSS ao corpo do documento
  }

  closeModal() {
    this.isOpen = false;
    // lógica para fechar o modal
  }

  isModalOpen(): boolean {
    return this.isOpen;
  }
}
