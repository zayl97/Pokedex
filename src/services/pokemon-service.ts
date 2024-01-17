import axios from "axios";
import { BehaviorSubject, Observable } from "rxjs";

export class PokemonService {
  private baseUrl = "https://pokeapi.co/api/v2/pokemon/";

  private cache: Map<string, any> = new Map();

  private pokemonSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public pokemon$: Observable<any> = this.pokemonSubject.asObservable();

  async getPokemonDetails(name: string): Promise<any> {
    if (this.cache.has(name)) {
      return this.cache.get(name);
    } else {
      try {
        const response = await axios.get(
          `${this.baseUrl}${name.toLowerCase()}`
        );
        const details = response.data;

        this.cache.set(name, details);
        return details;
      } catch (error) {
        console.error("Error fetching Pokemon details:", error);
        return null;
      }
    }
  }

  private pokemonListSubject: BehaviorSubject<any[]> = new BehaviorSubject<
    any[]
  >([]);
  public pokemonList$: Observable<any[]> =
    this.pokemonListSubject.asObservable();

  async getPokemonList(): Promise<void> {
    if (this.cache.has("pokemonList")) {
      this.pokemonListSubject.next(this.cache.get("pokemonList"));
    } else {
      try {
        const response = await axios.get(`${this.baseUrl}?limit=200`);
        const pokemonList = await Promise.all(
          response.data.results.map(async (pokemon: any) => {
            const detailsResponse = await axios.get(pokemon.url);
            return {
              name: detailsResponse.data.name,
              image: detailsResponse.data.sprites.front_default,
              elements: detailsResponse.data.types.map(
                (type: any) => type.type.name
              ),
            };
          })
        );
        this.cache.set("pokemonList", pokemonList);
        this.pokemonListSubject.next(pokemonList);
      } catch (error) {
        console.error("Error fetching Pokemon list:", error);
      }
    }
  }

  searchPokemon(searchTerm: string): any[] {
    const cachedList: any[] = this.cache.get("pokemonList") || [];

    const searchTermLower = searchTerm.toLowerCase();

    return cachedList.filter((pokemon) => {
      return (
        pokemon.name.toLowerCase().includes(searchTermLower) ||
        pokemon.elements.some((element: string) =>
          element.toLowerCase().includes(searchTermLower)
        )
      );
    });
  }
}
