import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import { UserService } from './user.service';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  loading = true;
  error = false;
  search = '';
  page = 1;
  totalPages = 1;
  removingId: number | null = null;
  confirmId: number | null = null;
  skeletons = [1, 2, 3, 4, 5, 6];

  constructor(private userService: UserService, private toast: ToastService) {}

  ngOnInit() { this.load(); }

  load(page: number = this.page) {
    this.loading = true;
    this.error = false;
    this.confirmId = null;
    this.userService.getUsers(page).subscribe({
      next: res => {
        this.users = res.users;
        this.page = page;
        this.totalPages = Math.max(1, Math.ceil(res.total / res.limit));
        this.loading = false;
      },
      error: () => { this.error = true; this.loading = false; }
    });
  }

  get filtered(): User[] {
    const q = this.search.trim().toLowerCase();
    if (!q) return this.users;
    return this.users.filter(u =>
      `${u.firstName} ${u.lastName}`.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q));
  }

  prev() { if (this.page > 1) this.load(this.page - 1); }
  next() { if (this.page < this.totalPages) this.load(this.page + 1); }

  askDelete(id: number) { this.confirmId = id; }
  cancelDelete() { this.confirmId = null; }

  confirmDelete(u: User) {
    this.confirmId = null;
    this.removingId = u.id;
    this.userService.deleteUser(u.id).subscribe({
      next: () => {
        // deixa a animação de saída rodar antes de remover do array
        setTimeout(() => {
          this.users = this.users.filter(x => x.id !== u.id);
          this.removingId = null;
          this.toast.success(`${u.firstName} ${u.lastName} foi removido(a).`);
        }, 380);
      },
      error: () => {
        this.removingId = null;
        this.toast.error('Não foi possível remover o usuário.');
      }
    });
  }

  /* spotlight (luz seguindo o mouse) + leve tilt 3D */
  onMove(ev: MouseEvent) {
    const el = ev.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    const x = ev.clientX - r.left;
    const y = ev.clientY - r.top;
    el.style.setProperty('--mx', `${x}px`);
    el.style.setProperty('--my', `${y}px`);
    el.style.setProperty('--rx', `${((y / r.height) - 0.5) * -7}deg`);
    el.style.setProperty('--ry', `${((x / r.width) - 0.5) * 7}deg`);
  }
  onLeave(ev: MouseEvent) {
    const el = ev.currentTarget as HTMLElement;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  }

  trackById(_i: number, u: User) { return u.id; }
}
