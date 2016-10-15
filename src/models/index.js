

export function Hero ({attack,health,level,x,y}) {

    this.attack = attack;
    this.maxHealth = health;
    this.currentHealth = health;
    this.level = level;
    this.x = x;
    this.y = y;
    this.xp = 0;
    this.neededXp = 100;

    return {
        position: {x: this.x, y: this.y},
        getCurrentHealth: () => this.currentHealth,
        getLevel: () => this.level,
        getAttack: () => this.attack,
        getMaxHealth: () => this.maxHealth,
        increaseHealth: (health) =>  {
          return  this.currentHealth + health > this.maxHealth ? this.currentHealth = this.maxHealth :  this.currentHealth += health * this.level;
        },
        increaseAttack: (attack) =>   this.attack += attack,
        decreaseHealth: (health) =>   this.currentHealth -= health,
        increaseXP: (xp) => this.xp += xp,
        getNeededXp: () => this.neededXp,
        getCurrentXp: () => this.xp,
        levelUp: () => {
            this.level += 1;
            this.attack += 3;
            this.maxHealth  += 20;
            this.currentHealth = this.maxHealth;
            this.xp = 0;
        }

    }

}

