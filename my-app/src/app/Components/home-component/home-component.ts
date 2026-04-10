import { Component, signal } from '@angular/core';
import { GreetingComponent } from '../greeting-component/greeting-component';
import { CounterComponent } from '../counter-component/counter-component';
import { InputComponent } from '../input-component/input-component';

@Component({
  selector: 'app-home-component',
  imports: [GreetingComponent, CounterComponent,InputComponent],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {
  homeMessage = signal("Hello World! from home component");
}
