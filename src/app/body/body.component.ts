import { Component, OnInit } from '@angular/core';
import { PokemonServiceService } from '../service/pokemon-service.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  pokemons1: any[] = [];
  pokemons: any[] = [];
  products: any[] = [];
  constructor(private pokemon: PokemonServiceService){ }
  
  getPokemon(data:any){
    this.pokemon.getPokemon(data).subscribe((data: any) => {
      if(Array.isArray(data.abilities)){
     data.abilities.forEach((ability:any)=>{
      if (!this.products.some((product) => product.name === ability.name)) {
        this.products = this.products.concat(ability);
      }
     })
      }else{
      //this.products = data.abilities.filter((ability:any)=> ability.name);
      this.products = data.abilities;
      }
      //console.log(data.abilities);
      //console.log(this.products);
    });
  }

  deleteAbility(ability: any): void {
    const index = this.products.findIndex((product) => product.name === ability.name);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }
  // getPokemon1(data:any){
  //   this.pokemon.getPokemon(data).subscribe((data: any) => {
  //     if(Array.isArray(data.effect_entries)){
  //    data.effect_entries.forEach((effectentries:any)=>{
  //     if (!this.products.some((product) => product.effect === effectentries.effect)) {
  //       this.products = this.products.concat(effectentries);
  //     }
  //    })
  //     }else{
  //     //this.products = data.abilities.filter((ability:any)=> ability.name);
  //     this.products = data.effect_entries;
  //     }
  //   });
  // }

  currentPage: number = 2;
  loadProducts() {
    this.pokemon.getPokemon(this.currentPage).subscribe((data: any) => {
      if(Array.isArray(data.abilities)){
        data.abilities.forEach((data:any)=>{
          this.products = this.products.concat(data);
          this.currentPage++;
        })
         }
      // this.products = this.products.concat(data);
      // console.log(this.pokemons);
      // this.currentPage++;
    });
  }

  ngOnInit(): void {
    this.pokemon.getAll().subscribe((data: any) => {
      this.pokemons = data.results;
      console.log(data.results);
      for(let i=0; i<this.pokemons.length;i++){
        this.getPokemon(this.pokemons[i].name);
      }
      //console.log(this.pokemons);
    });
    // this.pokemon.savePokemon1().subscribe((data: any)=>{
    //   this.pokemons = data.effect_entries;
    //   console.log(data.effect_entries);
    //   for(let i=0; i<this.pokemons.length;i++){
    //     this.getPokemon(this.pokemons[i].effect);
    //   }
    // })
  }



}