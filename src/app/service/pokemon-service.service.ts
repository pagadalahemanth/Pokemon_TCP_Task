import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PokemonServiceService {
  //url:string = "http://localhost:8083/pokemon";
  private apiUrl = "https://pokeapi.co/api/v2/pokemon/?offset=30&limit=30";
  private pageSize = 2; // Adjust the page size as needed
  private currentPage = 1;
  url1 = "https://pokeapi.co/api/v2/pokemon/";
  url2 = "https://pokeapi.co/api/v2/ability/";
  constructor(private http:HttpClient) { }

  getPokemon(pokemon: any):Observable<any[]>{
    return this.http.get<any[]>(this.url1 + pokemon);
  }
  // savePokemon1():Observable<any[]>{
  //   return this.http.get<any[]>(this.url2);
  // }

  getAll(page: number = 2):Observable<any[]>{
    //console.log(this.url);
    const url = `${this.apiUrl}?_page=${page}&_limit=${this.pageSize}`;
    return this.http.get<any[]>(url);
  }


  }
