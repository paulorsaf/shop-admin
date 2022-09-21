import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Client } from 'src/app/model/user/client';
import { AppState } from 'src/app/store/app-state';
import { loadClients } from './store/clients.actions';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit, OnDestroy {

  isLoading$!: Observable<boolean>;
  clients$!: Observable<Client[]>;

  dataSource!: MatTableDataSource<Client[]>;
  displayedColumns = ['name', 'email', 'phone', 'cpfCnpj', 'date'];

  clientsSubscription!: Subscription;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Client[]>([]);

    this.isLoading$ = this.store.select(state => state.clients.isLoading);
    this.clients$ = this.store.select(state => state.clients.clients || []);

    this.onLoadedUsersChange();

    this.store.dispatch(loadClients());
  }

  ngOnDestroy(): void {
    this.clientsSubscription.unsubscribe();
  }

  goToUserDetail(client: Client) {

  }

  private onLoadedUsersChange() {
    this.clientsSubscription =
      this.store
        .select(state => state.clients.clients)
        .subscribe(users => {
          this.dataSource = new MatTableDataSource<any>(users);
        });
  }

}
