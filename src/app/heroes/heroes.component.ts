import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
 // hero: Hero | undefined;
  heroes: Hero[]=[];

  constructor(private service: HeroService){}

  ngOnInit(): void {
      this.getHeroes();
  }
  getHeroes() {
     this.service.getHeroes().subscribe(
      hs=> this.heroes = hs
    );
  }
  add(name: string){
    if(!name) return;

    this.service.addHero({name} as Hero).subscribe(
      h=> this.heroes.push(h)
    );
  }

  delete(hero:Hero){
    this.heroes = this.heroes.filter(h=>h!== hero);
    this.service.deleteHero(hero.id).subscribe();
  }

}
