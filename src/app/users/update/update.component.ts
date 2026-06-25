import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserPayload } from '../user.model';
import { UserService } from '../user.service';
import { ToastService } from '../../shared/toast.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  id!: string;
  request: UserPayload | null = null;
  loading = true;
  saving = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.userService.getUser(this.id).subscribe({
      next: user => {
        this.request = { firstName: user.firstName, lastName: user.lastName };
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toast.error('Usuário não encontrado.');
      }
    });
  }

  get valid(): boolean {
    return !!this.request && this.request.firstName.trim().length > 1 && this.request.lastName.trim().length > 1;
  }

  update() {
    if (!this.request || !this.valid || this.saving) return;
    this.saving = true;
    this.userService.updateUser(this.id, this.request).subscribe({
      next: () => {
        this.saving = false;
        this.toast.success('Usuário atualizado com sucesso!');
        this.router.navigate(['/users']);
      },
      error: () => {
        this.saving = false;
        this.toast.error('Não foi possível atualizar o usuário.');
      }
    });
  }
}
