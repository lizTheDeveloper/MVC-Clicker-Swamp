
class Game {
    constructor() {
        this.populations = [];
        this.resources = [];
    }

    addPopulation(population) {
        this.populations.push(population);
    }

    addResource(resource) {
        this.resources.push(resource);
    }

    tick() {
        // first check for carrying capacity
        // then apply growth rates up to carrying capacity
        this.populations.forEach(pop => {
            let prey = pop.prey;
            let totalPreyPopulation = 0;
            prey.forEach(preySpecies => {
                let preyPop = this.populations.find(p => p.species === preySpecies);
                if (!preyPop) {
                    // if the prey species doesn't exist, it's a resource
                    let resource = this.resources.find(r => r.name === preySpecies);
                    if (resource) {
                        totalPreyPopulation += resource.quantity;
                        // reduce the resource quantity by the population growth rate
                        resource.quantity -= pop.population * pop.growthRate;
                    }
                    return;
                }
                totalPreyPopulation += preyPop.population;
            });
            if (totalPreyPopulation >= pop.population) {
                pop.population *= pop.growthRate;
            }

            // now apply predation
            prey.forEach(preySpecies => {
                let preyPop = this.populations.find(p => p.species === preySpecies);
                if (!preyPop) {
                    // if the prey species doesn't exist, it's a resource
                    let resource = this.resources.find(r => r.name === preySpecies);
                    if (resource) {
                        resource.quantity -= pop.population * pop.growthRate;
                    }
                    return;
                }
                preyPop.population -= pop.population * pop.growthRate;
            });
        });
    }

    render() {
        let populationStr = this.populations.map(pop => pop.render()).join('');
        let resourceStr = this.resources.map(res => res.render()).join('');
        return `${populationStr}${resourceStr}`;
    }
}


let populationDisplay = document.getElementById('populationDisplay');

let algae = new Population('algae', 100, 1.5, 'phosphorus');
let bugs = new Population('bugs', 10, 1.2, 'algae');
let birds = new Population('birds', 5, 1.1, ['bugs', 'fish']);
let fish = new Population('fish', 2, 1.05, ['bugs', 'algae']);
let phosphorus = new Resource('phosphorus', 1000000);

let game = new Game();

game.addPopulation(algae);
game.addPopulation(bugs);
game.addPopulation(birds);
game.addPopulation(fish);
game.addResource(phosphorus);

setInterval(() => {
    game.populations.forEach(pop => {
        pop.population *= pop.growthRate;
    });
    populationDisplay.innerHTML = game.render();
}, 1000);

populationDisplay.innerHTML = game.render();