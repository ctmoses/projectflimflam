import Barbarian from '../../../src/model/barbarian';
import * as Race from '../../../src/model/race';
import Character from '../../../src/model/character';
import * as Types from '../../../src/types';

test('Barbarian Defenses should be calculated', () => {
    let armor: Types.ArmorTypes = Types.ArmorTypes.HEAVY;
    let weapon = Types.MeleeWeapons.TWOHHEAVY;
    let ranged = Types.RangedWeapons.XBOWHEAVY;
    let barbarian = new Barbarian(armor, true, weapon, ranged);

    expect(barbarian.calcac(18, 10, 16, 1)).toBe(18);
    expect(barbarian.calcpd(12,12,12,2)).toBe(14);
    expect(barbarian.calcmd(12,12,12,4)).toBe(15);
    expect(barbarian.calcinitiative(16,4)).toBe(7);
    
});

test('Barbarian Recovery Info should be calculated', () => {
    let armor: Types.ArmorTypes = Types.ArmorTypes.LIGHT;
    let weapon = Types.MeleeWeapons.TWOHHEAVY;
    let ranged = Types.RangedWeapons.BOWLIGHT;
    let barbarian = new Barbarian(armor, false, weapon, ranged);

    expect(barbarian.calcrecoveries()).toBe(8);
    expect(barbarian.calcrecoveryroll(12,4)).toEqual([4,10,1]);  //SM: Is toequal ok to use here?
});

test('Barbarian ranged info should be calculated', () => {
    let armor: Types.ArmorTypes = Types.ArmorTypes.HEAVY;
    let weapon = Types.MeleeWeapons.TWOHHEAVY;
    let ranged = Types.RangedWeapons.BOWLIGHT;
    let barbarian = new Barbarian(armor, false, weapon, ranged);

    expect(barbarian.calcrangedhit(18,4)).toBe(8);
    expect(barbarian.calcrangeddmg(12,3)).toEqual([3,6,1]);
    expect(barbarian.calcrangeddmg(12,6)).toEqual([6,6,2]);
    expect(barbarian.calcrangeddmg(12,10)).toEqual([10,6,3]);
    
});

test('Barbarian HitPoint info should be calculated', () => {
    let armor: Types.ArmorTypes = Types.ArmorTypes.HEAVY;
    let weapon = Types.MeleeWeapons.TWOHHEAVY;
    let ranged = Types.RangedWeapons.BOWLIGHT;
    let barbarian = new Barbarian(armor, false, weapon, ranged);

    expect(barbarian.calchp(12,8)).toBe(128);
    expect(barbarian.baselineHP()).toBe(7);
    
});

test('Barbarian Talent/Spell info should be calculated', () => {
    let armor: Types.ArmorTypes = Types.ArmorTypes.HEAVY;
    let weapon = Types.MeleeWeapons.TWOHHEAVY;
    let ranged = Types.RangedWeapons.BOWLIGHT;
    let barbarian = new Barbarian(armor, false, weapon, ranged);

    expect(barbarian.calctalents(8)).toEqual([3,1,1])
    expect(barbarian.calcspells(5)).toEqual([]);
    
});

test('Barbarian melee info should be calculated', () => {
    let armor: Types.ArmorTypes = Types.ArmorTypes.HEAVY;
    let weapon = Types.MeleeWeapons.TWOHHEAVY;
    let ranged = Types.RangedWeapons.BOWLIGHT;
    let barbarian = new Barbarian(armor, false, weapon, ranged);

    expect(barbarian.calcmeleehit(18,4)).toBe(8);
    expect(barbarian.calcmeleedmg(16,4)).toEqual([4,10,3]);
    expect(barbarian.calcmeleedmg(16,5)).toEqual([5,10,6]);
    expect(barbarian.calcmeleedmg(16,8)).toEqual([8,10,9]);
    
});