import Barbarian from '../../../src/model/classes/barbarian';
import * as Race from '../../../src/model/race';
import Character from '../../../src/model/character';
import * as Types from '../../../src/types';

test('Barbarian Defenses should be calculated', () => {
    const barbarian = new Barbarian();
    barbarian.setarmor(Types.ArmorTypes.HEAVY);
    barbarian.setmeleeweapon(Types.MeleeWeapons.TWOHHEAVY);
    barbarian.setrangedweapon(Types.RangedWeapons.XBOWHEAVY);
    barbarian.setshield(true);

    expect(barbarian.calcac(18, 10, 16, 1)).toBe(18);
    expect(barbarian.calcac(18, 4, 6, 1)).toBe(13);
    expect(barbarian.calcpd(12, 12, 12, 2)).toBe(14);
    expect(barbarian.calcmd(8, 12, 6, 1)).toBe(10);
    expect(barbarian.calcinitiative(16, 4)).toBe(7);
});

test('Barbarian Recovery Info should be calculated', () => {

    const barbarian = new Barbarian();

    expect(barbarian.calcrecoveries()).toBe(8);
    expect(barbarian.calcrecoveryroll(12, 4)).toEqual([4, 10, 1]); // SM: Is toequal ok to use here?
});

test('Barbarian ranged info should be calculated', () => {
    let barbarian = new Barbarian();
    barbarian.setarmor(Types.ArmorTypes.HEAVY);
    barbarian.setmeleeweapon(Types.MeleeWeapons.TWOHHEAVY);
    barbarian.setrangedweapon(Types.RangedWeapons.BOWLIGHT);

    expect(barbarian.calcrangedhit(18, 4)).toBe(6);
    expect(barbarian.calcrangeddmg(12, 3)).toEqual([3, 6, 1]);
    expect(barbarian.calcrangeddmg(12, 6)).toEqual([6, 6, 2]);
    expect(barbarian.calcrangeddmg(12, 10)).toEqual([10, 6, 3]);

    barbarian.setrangedweapon(Types.RangedWeapons.XBOWHEAVY);
    expect(barbarian.calcrangedhit(18, 4)).toBe(1);
});

test('Barbarian HitPoint info should be calculated', () => {
    const barbarian = new Barbarian();

    expect(barbarian.calchp(12, 8)).toBe(128);
    expect(barbarian.baselineHP()).toBe(7);
});

test('Barbarian Talent/Spell info should be calculated', () => {
    const barbarian = new Barbarian();

    expect(barbarian.calctalents(8)).toEqual([3, 1, 1]);
    expect(barbarian.calcspells(5)).toEqual([0, 0, 0]);
});

test('Barbarian melee info should be calculated', () => {
    const barbarian = new Barbarian();
    barbarian.setarmor(Types.ArmorTypes.HEAVY);
    barbarian.setmeleeweapon(Types.MeleeWeapons.TWOHHEAVY);
    barbarian.setrangedweapon(Types.RangedWeapons.BOWLIGHT);

    expect(barbarian.calcmeleehit(18, 4)).toBe(6);
    expect(barbarian.calcmeleedmg(16, 4)).toEqual([4, 10, 3]);
    expect(barbarian.calcmeleedmg(16, 5)).toEqual([5, 10, 6]);
    expect(barbarian.calcmeleedmg(16, 8)).toEqual([8, 10, 9]);
});

test('Base Modifier', () => {
    const barbarian = new Barbarian();

    expect(barbarian.calculatebasemodifier(2)).toBe(-4);
    expect(barbarian.calculatebasemodifier(4)).toBe(-3);
    expect(barbarian.calculatebasemodifier(6)).toBe(-2);
    expect(barbarian.calculatebasemodifier(8)).toBe(-1);
    expect(barbarian.calculatebasemodifier(10)).toBe(0);
    expect(barbarian.calculatebasemodifier(12)).toBe(1);
    expect(barbarian.calculatebasemodifier(14)).toBe(2);
    expect(barbarian.calculatebasemodifier(16)).toBe(3);
    expect(barbarian.calculatebasemodifier(18)).toBe(4);
    expect(barbarian.calculatebasemodifier(20)).toBe(5);
});
