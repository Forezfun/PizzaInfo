import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CostComponent } from './components/cost/cost.component';
import { HistoryComponent } from './components/history/history.component';
import { ChooseComponent } from './components/choose/choose.component';
import { HistoryPageComponent } from './components/history-page/history-page.component';
import { FinderComponent } from './components/finder/finder.component';
import { HttpClientModule } from '@angular/common/http';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { StatusComponent } from './components/status/status.component';
import { PriceComponent } from './components/price/price.component';
import { AcceptCardComponent } from './components/accept-card/accept-card.component';
import { CostCardComponent } from './components/cost-card/cost-card.component';
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MainPageComponent,
    CostComponent,
    HistoryComponent,
    ChooseComponent,
    HistoryPageComponent,
    FinderComponent,
    ProgressBarComponent,
    CalculatorComponent,
    StatusComponent,
    PriceComponent,
    AcceptCardComponent,
    CostCardComponent
  ],
  imports: [AppRoutingModule,BrowserModule,HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
