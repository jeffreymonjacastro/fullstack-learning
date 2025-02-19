import { Component } from '@angular/core';

@Component({
  selector: 'app-games',
  imports: [],
  template: `
    <ul>
      @for (game of games; track game.id) {
        <li>{{ game.name }}</li>    
      }
    </ul>
  `,
  styles: ``
})
export class GamesComponent {
  games = [
    {
      id: 1,
      name: 'Super Mario Bros.',
    },
    {
      id: 2,
      name: 'The Legend of Zelda',
    },
    {
      id: 3,
      name: 'Metroid',
    },
    {
      id: 4,
      name: 'Donkey Kong',
    },
    {
      id: 5,
      name: 'Minecraft',
    },
  ]

}
