import Barbarian from '../../../src/model/barbarian';
import * as Race from '../../../src/model/race';
import Character from '../../../src/model/character';
import * as Types from '../../../src/types';
import * as Spells from '../../../src/model/spell'

test('Character Defenses should be calculated', () => {
    let armor: Types.ArmorTypes = Types.ArmorTypes.LIGHT;
    let weapon = Types.MeleeWeapons.TWOHHEAVY;
    let ranged = Types.RangedWeapons.BOWLIGHT;
    let barbarian = new Barbarian(armor, false, weapon, ranged);
    let d = new Race.darkelf();

    let c = new Character(barbarian,d,18,16,14,6,8,10,1);
    c.calcAC();
    c.calcMD();
    c.calcPD();
    expect(c.ac).toBe(15);
    expect(c.md).toBe(10);
    expect(c.pd).toBe(15);

    let magicitem = new Spells.magicitems(Types.ItemType.ARMOR,Types.Tiers.CHAMPION);
    let magicitem1 = new Spells.magicitems(Types.ItemType.CLOAK,Types.Tiers.ADVENTURER);
    let magicitem2 = new Spells.magicitems(Types.ItemType.HELM,Types.Tiers.EPIC);
    c.setMagicItems([magicitem,magicitem1,magicitem2]);
    c.calcAC();
    c.calcMD();
    c.calcPD();
    expect(c.ac).toBe(17);
    expect(c.md).toBe(13);
    expect(c.pd).toBe(16);

});
