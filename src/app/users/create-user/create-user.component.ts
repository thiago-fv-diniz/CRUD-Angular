import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserPayload } from '../user.model';
import { UserService } from '../user.service';
import { ToastService } from '../../shared/toast.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {

  // inicializado (antes era `request!` => undefined => quebrava o [(ngModel)])
  request: UserPayload = { firstName: '', lastName: '' };
  saving = false;

  constructor(
    private userService: UserService,
    private toast: ToastService,
    private router: Router
  ) {}

  get valid(): boolean {
    return this.request.firstName.trim().length > 1 && this.request.lastName.trim().length > 1;
  }

  save() {
    if (!this.valid || this.saving) return;
    this.saving = true;
    this.userService.createUser(this.request).subscribe({
      next: () => {
        this.toast.success(`${this.request.firstName} criado com sucesso!`);
        this.request = { firstName: '', lastName: '' };
        this.saving = false;
        this.router.navigate(['/users']);
      },
      error: () => {
        this.saving = false;
        this.toast.error('Não foi possível criar o usuário.');
      }
    });
  }
}
