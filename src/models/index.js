

export function Hero ({attack,health,level,x,y}) {

    this.attack = attack;
    this.maxHealth = health;
    this.currentHealth = health;
    this.level = level;
    this.x = x;
    this.y = y;
    this.xp = 0;

    return {
        position: {x: this.x, y: this.y},
        getCurrentHealth: () => this.currentHealth,
        getLevel: () => this.level,
        getAttack: () => this.attack,
        getMaxHealth: () => this.maxHealth,
        increaseHealth: (health) =>  currentHealth + health,
        decreaseHealth: (health) =>   currentHealth - health,
        increaseXP: (xp) => this.xp + xp

    }

}

