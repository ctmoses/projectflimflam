import Barbarian from '../../../src/model/barbarian';
import * as Race from '../../../src/model/race';
import Character from '../../../src/model/character';
import * as Types from '../../../src/types';

test('Character AC should be calculated', () => {
    let armor: Types.ArmorTypes = Types.ArmorTypes.LIGHT;
    let weapon = Types.MeleeWeapons.TWOHHEAVY;
    let ranged = Types.RangedWeapons.BOWLIGHT;
    let barbarian = new Barbarian(armor, false, weapon, ranged);
    let d = new Race.darkelf();

    let c = new Character(barbarian,d,10,10,10,10,10,10,1);
    c.calcAC();
    expect(c.ac).toBe(13);
    
});
