import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '../../_services';
import { Account } from '../../_models';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
  accounts!: any[];

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.getAll()
      .pipe(first())
      .subscribe(accounts => this.accounts = accounts);
  }

  deleteAccount(id: string) {
    const account = this.accounts.find(x => x.id === id);
    if (!account) return;

    account.isDeleting = true;
    this.accountService.delete(id)
      .pipe(first())
      .subscribe(() => this.accounts = this.accounts.filter(x => x.id !== id));
  }

  activateAccount(id: string) {
    const account = this.accounts.find(x => x.id === id);
    if (!account) return;
  
    account.isActive = true; // Update the local state
    this.accountService.update(id, { isActive: true })
      .pipe(first())
      .subscribe(() => {
        console.log(`Account with ID ${id} activated successfully.`);
      });
  }
  
  deactivateAccount(id: string) {
    const account = this.accounts.find(x => x.id === id);
    if (!account) return;
  
    account.isActive = false; // Update the local state
    this.accountService.update(id, { isActive: false })
      .pipe(first())
      .subscribe(() => {
        console.log(`Account with ID ${id} deactivated successfully.`);
      });
  }
}