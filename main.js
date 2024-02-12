
class Game {
    constructor() {
        this.populations = [];
    }

    addPopulation(population) {
        this.populations.push(population);
    }

    render() {
        return this.populations.map(pop => pop.render()).join('');
    }
}


let populationDisplay = document.getElementById('populationDisplay');

let algae = new Population('algae', 100, 1.5, null);
let bugs = new Population('bugs', 10, 1.2, 'algae');
let birds = new Population('birds', 5, 1.1, ['bugs', 'fish']);
let fish = new Population('fish', 2, 1.05, ['bugs', 'algae']);

let game = new Game();

game.addPopulation(algae);
game.addPopulation(bugs);
game.addPopulation(birds);
game.addPopulation(fish);

setInterval(() => {
    game.populations.forEach(pop => {
        pop.population *= pop.growthRate;
    });
    populationDisplay.innerHTML = game.render();
}, 1000);

populationDisplay.innerHTML = game.render();