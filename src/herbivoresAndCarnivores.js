'use strict';

class Animal {
  static alive = [];

  constructor(name) {
    this.name = name;
    this.health = 100;
    this.hidden = false; // default false for herbivores,
    // harmless for carnivores

    Animal.alive.push(this);
  }

  // Remove animal from alive if health <= 0
  checkHealth() {
    if (this.health <= 0) {
      // Remove from Animal.alive
      const index = Animal.alive.indexOf(this);

      if (index !== -1) {
        Animal.alive.splice(index, 1);
      }
    }
  }
}

class Herbivore extends Animal {
  constructor(name) {
    super(name);
    this.hidden = false; // explicitly set hidden for herbivore
  }

  hide() {
    this.hidden = true;
  }
}

class Carnivore extends Animal {
  bite(target) {
    // Only affects Herbivore, not Carnivore
    if (!(target instanceof Herbivore)) {
      return;
    }

    // Does nothing if target is hidden
    if (target.hidden) {
      return;
    }

    target.health -= 50;

    if (target.health < 0) {
      target.health = 0; // don't go negative
    }

    target.checkHealth();
  }
}

module.exports = {
  Animal,
  Herbivore,
  Carnivore,
};
