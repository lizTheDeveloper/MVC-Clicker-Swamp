
// Models for Swamp Game

// Population Model
    // eg, algae, fish, birds - tracks how many of them there are, their growth rate & what species they prey on

class Population {
    constructor(species, population, growthRate, prey=[]) {
        this.species = species;
        this.population = population;
        this.growthRate = growthRate;
        // if prey is a string, convert it to an array
        if (typeof prey === 'string') {
            prey = [prey];
        }
        if (!prey) {
            prey = [];
        }
        this.prey = prey;
    }

    render() {
        let templatestr = `
<div class="population">
    <h2>${this.species}</h2>
    <p>Population: ${this.population}</p>
    <p>Growth Rate: ${this.growthRate}</p>
    <p>Prey: ${this.prey.join(', ')}</p>
</div>
        `;
        return templatestr
    }
}

class Resource {
    constructor(name, quantity) {
        this.name = name;
        this.quantity = quantity;
    }

    render() {
        return `
<div class="resource">
    <h2>${this.name}</h2>
    <p>Quantity: ${this.quantity}</p>
</div>
        `;
    }
}


// Population Item
    // Modifies the population of a given species by some factor- either growth, or predation

class PopulationItem {
    constructor(species, factor) {
        this.species = species;
        this.factor = factor;
    }
}