import Barbarian from '../../../src/model/barbarian';
import * as Race from '../../../src/model/race';
import Character from '../../../src/model/character';
import * as Types from '../../../src/types';

test('Barbarian AC should be calculated', () => {
    let armor: Types.ArmorTypes = Types.ArmorTypes.HEAVY;
    let weapon = Types.MeleeWeapons.TWOHHEAVY;
    let ranged = Types.RangedWeapons.BOWLIGHT;
    let barbarian = new Barbarian(armor, true, weapon, ranged);

    expect(barbarian.calcac(10, 10, 10, 1)).toBe(15);
});
