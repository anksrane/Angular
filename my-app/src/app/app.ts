import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Components/header-component/header-component';
import { HomeComponent } from './Components/home-component/home-component';
import { InputComponent } from './Components/input-component/input-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, InputComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Ankit');
}
