import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Observable, Subject } from 'rxjs';
import { debounce, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit{
  // hero: Hero | undefined;
  // heroes$!: Observable<Hero[]>;
  // private searchItems = new Subject<string>();

   constructor(private route: ActivatedRoute, private service: HeroService){}

  // ngOnInit(): void {
  //   this.heroes$ = this.searchItems.pipe(
  //     debounceTime(300),
  //     distinctUntilChanged(),
     
  //     switchMap((term:string)=>this.service.searchHeroes(term))
      
  //   );
  // }
  // search(item: string) {
  //   this.searchItems.next(item);
  // }

  heroes$!: Observable<Hero[]>;
  private searchItem = new Subject<string>();

  ngOnInit(): void {
    this.heroes$ = this.searchItem.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((item:string)=> this.service.searchHeroes(item))
    )
  }

  search(item: string){
    this.searchItem.next(item);
  }

}
