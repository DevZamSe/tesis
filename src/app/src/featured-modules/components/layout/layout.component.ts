import { Component, OnInit } from '@angular/core';
import { superadmin } from 'src/app/src/shared/data/layout';
import { permission } from 'src/app/src/shared/interfaces/authLogin';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  public data: Array<permission> = superadmin;
  public now: number = superadmin[0].id;

  constructor() {}

  ngOnInit(): void {}

  nowClick(data: number): void {
    this.now = data;
  }
}
