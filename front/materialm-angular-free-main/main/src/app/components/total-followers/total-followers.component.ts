import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import {
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexLegend,
    ApexStroke,
    ApexTooltip,
    ApexAxisChartSeries,
    ApexPlotOptions,
    ApexResponsive,
    ApexGrid,
    ApexXAxis,
    ApexYAxis,
    NgApexchartsModule,
} from 'ng-apexcharts';
import { MatButtonModule } from '@angular/material/button';
import { TablerIconsModule } from 'angular-tabler-icons';
import { UserService } from 'src/app/services/user/user.service';
import { DecimalPipe } from '@angular/common';


@Component({
    selector: 'app-total-followers',
    standalone: true,
    imports: [MaterialModule, NgApexchartsModule, MatButtonModule, TablerIconsModule],
    templateUrl: './total-followers.component.html',
})
export class AppTotalFollowersComponent implements OnInit {
    totalEmployees: number = 0; 

  constructor(private employeeService: UserService) {}

  ngOnInit(): void {
    this.employeeService.getTotalEmployees().subscribe(
      (data: number) => {
        this.totalEmployees = data;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération du nombre d\'employés:', error);
      }
    );
  }
}
