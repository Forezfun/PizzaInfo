import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { HistoryPageComponent } from './components/history-page/history-page.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { PriceComponent } from './components/price/price.component';
const routes: Routes = [
  {path:'',redirectTo:'/main',pathMatch:'full'},
  { path: 'main', component: MainPageComponent },
  { path: 'history', component: HistoryPageComponent },
  { path: 'calculator', component: CalculatorComponent },
  { path: 'price', component: PriceComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
