import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:"",
        pathMatch: "full",
        loadComponent: () => {
            return import('./Components/home-component/home-component').then((m) => m.HomeComponent)
        },
    },
    {
        path: "todos",
        loadComponent: () => {
            return import('./todos-component/todos-component').then((m) => m.TodosComponent)
        },        
    }
];
