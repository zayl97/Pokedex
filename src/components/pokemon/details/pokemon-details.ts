import { autoinject, bindable } from "aurelia-framework";
import { Router, activationStrategy } from "aurelia-router";
import { PokemonService } from "services/pokemon-service";
import "styles/animations.scss";
import "../list/pokemon-list.scss";
import "./pokemon-details.scss";

@autoinject
export class PokemonDetails {
  @bindable name: string;
  pokemonDetails: any | null = null;

  constructor(private pokemonService: PokemonService, private router: Router) {}

  async activate(params: any): Promise<void> {
    this.name = params.name || "";

    if (this.name) {
      try {
        const details = await this.pokemonService.getPokemonDetails(this.name);
        this.pokemonDetails = details;
      } catch (error) {
        console.error("Error fetching Pokemon details:", error);
      }
    } else {
      console.log("Invalid name parameter:", this.name);
    }
  }

  determineActivationStrategy(): string {
    return activationStrategy.replace;
  }

  goBack(): void {
    this.router.navigateBack();
  }
}
