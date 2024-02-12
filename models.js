
// Models for Swamp Game

// Population Model
    // eg, algae, fish, birds - tracks how many of them there are, their growth rate & what species they prey on

class Population {
    constructor(species, population, growthRate, prey) {
        this.species = species;
        this.population = population;
        this.growthRate = growthRate;
        this.prey = prey;
    }
}

let algae = new Population('algae', 100, 1.5, null);
let bugs = new Population('bugs', 10, 1.2, 'algae');


// Population Item
    // Modifies the population of a given species by some factor- either growth, or predation

class PopulationItem {
    constructor(species, factor) {
        this.species = species;
        this.factor = factor;
    }
}