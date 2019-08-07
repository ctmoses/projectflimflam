import Paladin from '../../../src/model/paladin';
import * as Race from '../../../src/model/race';
import Character from '../../../src/model/character';
import * as Types from '../../../src/types';


// Need to add tests for paladin specific talents and feats: Bastion & Implacable

test('Paladin Defenses should be calculated', () => {
    const armor: Types.ArmorTypes = Types.ArmorTypes.HEAVY;
    const weapon = Types.MeleeWeapons.TWOHHEAVY;
    const ranged = Types.RangedWeapons.XBOWHEAVY;
    const paladin = new Paladin(armor, true, weapon, ranged);

    expect(paladin.calcac(18, 10, 16, 1)).toBe(16 + 1 + 1 + 3); // Base 16 + Level 1 + Shield 1 + Mod 3
    expect(paladin.calcac(18, 4, 6, 1)).toBe(16 + 1 + 1 + -2); // Base 16 + Level 1 + Shield 1 + Mod -2
    expect(paladin.calcpd(12, 12, 12, 2)).toBe(10 + 1 + 2); // Base 10 + Level 2 + Mod 1
    expect(paladin.calcmd(8, 12, 6, 1)).toBe(12 + -1 + 1); // Base 12 + Level 1 + Mod -1
    expect(paladin.calcinitiative(16, 4)).toBe(7);
});

test('Paladin Recovery Info should be calculated', () => {
    const armor: Types.ArmorTypes = Types.ArmorTypes.LIGHT;
    const weapon = Types.MeleeWeapons.TWOHHEAVY;
    const ranged = Types.RangedWeapons.BOWLIGHT;
    const paladin = new Paladin(armor, false, weapon, ranged);

    expect(paladin.calcrecoveries()).toBe(8);
    expect(paladin.calcrecoveryroll(12, 4)).toEqual([4, 10, 1]);
});

test('Paladin ranged info should be calculated', () => {
    const armor: Types.ArmorTypes = Types.ArmorTypes.HEAVY;
    const weapon = Types.MeleeWeapons.TWOHHEAVY;
    let ranged = Types.RangedWeapons.BOWLIGHT;
    let paladin = new Paladin(armor, false, weapon, ranged);

    expect(paladin.calcrangedhit(18, 4)).toBe(8); // Mod 4+ level 4
    expect(paladin.calcrangeddmg(12, 3)).toEqual([3, 6, 1]);
    expect(paladin.calcrangeddmg(12, 6)).toEqual([6, 6, 2]);
    expect(paladin.calcrangeddmg(12, 10)).toEqual([10, 6, 3]);

    ranged = Types.RangedWeapons.XBOWHEAVY;
    paladin = new Paladin(armor, false, weapon, ranged);
    expect(paladin.calcrangedhit(18, 4)).toBe(8);
});

test('Paladin HitPoint info should be calculated', () => {
    const armor: Types.ArmorTypes = Types.ArmorTypes.HEAVY;
    const weapon = Types.MeleeWeapons.TWOHHEAVY;
    const ranged = Types.RangedWeapons.BOWLIGHT;
    const paladin = new Paladin(armor, false, weapon, ranged);

    expect(paladin.calchp(12, 8)).toBe((8 + 1) * 16); // (8+1)*16
    expect(paladin.baselineHP()).toBe(8);
});

test('Paladin Talent/Spell info should be calculated', () => {
    const armor: Types.ArmorTypes = Types.ArmorTypes.HEAVY;
    const weapon = Types.MeleeWeapons.TWOHHEAVY;
    const ranged = Types.RangedWeapons.BOWLIGHT;
    const paladin = new Paladin(armor, false, weapon, ranged);

    expect(paladin.calctalents(8)).toEqual([5, 0, 0]);
    expect(paladin.calcspells(5)).toEqual([0, 0, 0, 0, 0]);
});

test('Paladin melee info should be calculated', () => {
    const armor: Types.ArmorTypes = Types.ArmorTypes.HEAVY;
    const weapon = Types.MeleeWeapons.TWOHHEAVY;
    const ranged = Types.RangedWeapons.BOWLIGHT;
    const paladin = new Paladin(armor, false, weapon, ranged);

    expect(paladin.calcmeleehit(18, 4)).toBe(8);
    expect(paladin.calcmeleedmg(16, 4)).toEqual([4, 10, 3]);
    expect(paladin.calcmeleedmg(16, 5)).toEqual([5, 10, 6]);
    expect(paladin.calcmeleedmg(16, 8)).toEqual([8, 10, 9]);
});

test('Base Modifier', () => {
    const armor: Types.ArmorTypes = Types.ArmorTypes.HEAVY;
    const weapon = Types.MeleeWeapons.TWOHHEAVY;
    const ranged = Types.RangedWeapons.BOWLIGHT;
    const paladin = new Paladin(armor, false, weapon, ranged);

    expect(paladin.calculatebasemodifier(2)).toBe(-4);
    expect(paladin.calculatebasemodifier(4)).toBe(-3);
    expect(paladin.calculatebasemodifier(6)).toBe(-2);
    expect(paladin.calculatebasemodifier(8)).toBe(-1);
    expect(paladin.calculatebasemodifier(10)).toBe(0);
    expect(paladin.calculatebasemodifier(12)).toBe(1);
    expect(paladin.calculatebasemodifier(14)).toBe(2);
    expect(paladin.calculatebasemodifier(16)).toBe(3);
    expect(paladin.calculatebasemodifier(18)).toBe(4);
    expect(paladin.calculatebasemodifier(20)).toBe(5);
});
