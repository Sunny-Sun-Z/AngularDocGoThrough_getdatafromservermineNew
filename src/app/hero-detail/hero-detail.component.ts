import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../hero';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;
  constructor(private service: HeroService, 
    private route: ActivatedRoute,
    private location: Location
    ) { }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.service.getHero(id).subscribe(hero => this.hero = hero);
  }

  save(): void {
    if (this.hero) {
      this.service.updateHero(this.hero).subscribe(
        () => this.goBack()
      );
    }
  }
  goBack(): void {
    this.location.back();
  }
}
