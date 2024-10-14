export class DnDCharacter {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  hitpoints: number;
  
  constructor() {
    this.strength = DnDCharacter.generateAbilityScore();
    this.dexterity = DnDCharacter.generateAbilityScore();
    this.constitution = DnDCharacter.generateAbilityScore();
    this.intelligence = DnDCharacter.generateAbilityScore();
    this.wisdom = DnDCharacter.generateAbilityScore();
    this.charisma = DnDCharacter.generateAbilityScore();
    this.hitpoints = 10 + DnDCharacter.getModifierFor(this.constitution);
  }
  /* 
   * The ability scores are the sum of the top 3 values of 4 rolls of a 6-sided die.
   * The range of ability scores is 3-18, inclusive, but not all values are equally 
   * probable. Therefore, we simulate all dice rolls to more accurately match
   * the real-life probability distribution for the sums.
   * 
   * https://www.statology.org/wp-content/uploads/2024/01/3dice1-768x520.png
  */
  public static generateAbilityScore(): number {
    const rolls: number[] = [];
    for(let i = 0; i < 4; i++) {
      rolls.push(rollDie(6));
    }
    rolls.sort((a, b) => a - b);
    
    return rolls[1] + rolls[2] + rolls[3];
  }
  // Note that "round down" for neg numbers increases their magnitude (more negative)
  public static getModifierFor(abilityValue: number): number {
    return Math.floor((abilityValue - 10) / 2);
  }
}

// Simulate a dice roll for any number of sides >= 4
// Returns int from 1 to sides, inclusive
export function rollDie(sides: number): number {
  if(sides < 4) {
    throw new Error('A die must have at least 4 sides');
  }
  
  return Math.floor(Math.random() * sides) + 1;
}