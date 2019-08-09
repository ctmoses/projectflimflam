import Fighter from '../../../src/model/classes/fighter';
import * as Types from '../../../src/types';
import * as Spells from '../../../src/model/spell';

test('Fighter Maneuvers', () => {
    const armor: Types.ArmorTypes = Types.ArmorTypes.HEAVY;
    const weapon = Types.MeleeWeapons.TWOHHEAVY;
    const ranged = Types.RangedWeapons.BOWLIGHT;
    const fighter = new Fighter(armor, false, weapon, ranged);

    expect(fighter.calcspells(1)).toEqual([3,0,0,0,0]);
    expect(fighter.calcspells(3)).toEqual([0,4,0,0,0]);
    expect(fighter.calcspells(5)).toEqual([0,0,5,0,0]);
});

test('Fighter Talents', () => {
    const armor: Types.ArmorTypes = Types.ArmorTypes.HEAVY;
    const weapon = Types.MeleeWeapons.TWOHHEAVY;
    const ranged = Types.RangedWeapons.BOWLIGHT;
    const fighter = new Fighter(armor, false, weapon, ranged);

    expect(fighter.calctalents(1)).toEqual([3,0,0]);
    expect(fighter.calctalents(6)).toEqual([4,0,0]);

});
test('Fighter BaseHP', () => {
    const armor: Types.ArmorTypes = Types.ArmorTypes.HEAVY;
    const weapon = Types.MeleeWeapons.TWOHHEAVY;
    const ranged = Types.RangedWeapons.BOWLIGHT;
    const fighter = new Fighter(armor, false, weapon, ranged);

    expect(fighter.baselineHP()).toBe(8);

});

test('Fighter AC', () => {
    const armor: Types.ArmorTypes = Types.ArmorTypes.HEAVY;
    const weapon = Types.MeleeWeapons.TWOHHEAVY;
    const ranged = Types.RangedWeapons.BOWLIGHT;
    const fighter = new Fighter(armor, false, weapon, ranged);

    expect(fighter.calcac(10,12,14,4)).toBe(20);

});

test('Fighter Recovery Roll', () => {
    const armor: Types.ArmorTypes = Types.ArmorTypes.HEAVY;
    const weapon = Types.MeleeWeapons.TWOHHEAVY;
    const ranged = Types.RangedWeapons.BOWLIGHT;
    const fighter = new Fighter(armor, false, weapon, ranged);

    expect(fighter.calcrecoveryroll(14,5)).toEqual([5,10,2]);

});

test('Fighter Recovery', () => {
    const armor: Types.ArmorTypes = Types.ArmorTypes.HEAVY;
    const weapon = Types.MeleeWeapons.TWOHHEAVY;
    const ranged = Types.RangedWeapons.BOWLIGHT;
    const fighter = new Fighter(armor, false, weapon, ranged);

    expect(fighter.calcrecoveries()).toEqual(9);

    const feat = new Spells.feat(Types.Tiers.ADVENTURER, "Test","Test","Extra Tough");
    expect(fighter.calcrecoveries([feat])).toEqual(10);
    
    const feat2 = new Spells.feat(Types.Tiers.CHAMPION, "Test","Test","Tough as Iron");
    expect(fighter.calcrecoveries([feat, feat2])).toEqual(12);

    const feat3 = new Spells.feat(Types.Tiers.EPIC, "Test","Test","Tough as Iron");
    expect(fighter.calcrecoveries([feat, feat3])).toEqual(10);
    
});

test('Fighter Ranged', () => {
    const armor: Types.ArmorTypes = Types.ArmorTypes.HEAVY;
    const weapon = Types.MeleeWeapons.TWOHHEAVY;
    const ranged = Types.RangedWeapons.BOWLIGHT;
    const fighter = new Fighter(armor, false, weapon, ranged);

    expect(fighter.calcrangedmiss(4)).toEqual(0);
    const talent = new Spells.talent(Types.AbilityRefresh.ATWILL, Types.AbilityType.FREE, Types.Tiers.ADVENTURER, false, "Deadeye Archer", "Test", "test");
    expect(fighter.calcrangedmiss(4,undefined,[talent])).toEqual(4);
    expect(fighter.calcrangeddmg(14,4,undefined,[talent])).toEqual([4,8,2]);
    
});