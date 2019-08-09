import Rogue from '../../../src/model/classes/rogue';
import * as Types from '../../../src/types';
import * as Spells from '../../../src/model/spell';

test('Rogue ', () => {
    const armor: Types.ArmorTypes = Types.ArmorTypes.HEAVY;
    const weapon = Types.MeleeWeapons.TWOHHEAVY;
    const ranged = Types.RangedWeapons.BOWLIGHT;
    const rogue = new Rogue(armor, false, weapon, ranged);

});
