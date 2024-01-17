import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { PokemonService } from "services/pokemon-service";
import "styles/animations.scss";
import "./pokemon-list.scss";

@autoinject
export class PokemonList {
  pokemonName = "";
  pokemonList: any[] = [];
  filteredPokemonList: string[] = [];

  constructor(private pokemonService: PokemonService, private router: Router) {}

  async attached(): Promise<void> {
    await this.pokemonService.getPokemonList();
    this.pokemonService.pokemonList$.subscribe((list) => {
      this.pokemonList = list;
      this.filteredPokemonList = list;
    });
  }

  searchPokemon(): void {
    const searchTerm = this.pokemonName.toLowerCase();
    this.filteredPokemonList = this.pokemonList.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm) ||
        pokemon.elements.some((element: string) =>
          element.toLowerCase().includes(searchTerm)
        )
    );
  }

  selectPokemon(name: string): void {
    this.pokemonName = name;
    this.router.navigateToRoute("pokemonDetail", { name: this.pokemonName });
  }
}
