import Barbarian from '../../../src/model/classes/barbarian';
import * as Race from '../../../src/model/race';
import Character from '../../../src/model/character';
import * as Types from '../../../src/types';
import * as Spells from '../../../src/model/spell';

test('Character Defenses should be calculated', () => {
    const armor: Types.ArmorTypes = Types.ArmorTypes.LIGHT;
    const weapon = Types.MeleeWeapons.TWOHHEAVY;
    const ranged = Types.RangedWeapons.BOWLIGHT;
    const barbarian = new Barbarian(armor, false, weapon, ranged);
    const d = new Race.darkelf();

    const c = new Character(barbarian, d, 18, 16, 14, 6, 8, 10, 1);
    expect(c.ac).toBe(15);
    expect(c.md).toBe(10);
    expect(c.pd).toBe(15);

    const magicitem = new Spells.magicitems(Types.ItemType.ARMOR, Types.Tiers.CHAMPION, true,"","");
    const magicitem1 = new Spells.magicitems(Types.ItemType.CLOAK, Types.Tiers.ADVENTURER, true,"","");
    const magicitem2 = new Spells.magicitems(Types.ItemType.HELM, Types.Tiers.EPIC, true,"","");
    c.setMagicItems([magicitem, magicitem1, magicitem2]);
    expect(c.ac).toBe(17);
    expect(c.md).toBe(13);
    expect(c.pd).toBe(16);
});

test('Character Feats should be calculated', () => {
    const armor: Types.ArmorTypes = Types.ArmorTypes.LIGHT;
    const weapon = Types.MeleeWeapons.TWOHHEAVY;
    const ranged = Types.RangedWeapons.BOWLIGHT;
    const barbarian = new Barbarian(armor, false, weapon, ranged);
    let d = new Race.dwarf();
    let c = new Character(barbarian, d, 18, 16, 14, 6, 8, 10, 1);
    expect(c.calcNumberofFeats()).toEqual([1, 0, 0]);
    c = new Character(barbarian, d, 18, 16, 14, 6, 8, 10, 5);
    expect(c.calcNumberofFeats()).toEqual([4, 1, 0]);
    c = new Character(barbarian, d, 18, 16, 14, 6, 8, 10, 10);
    expect(c.calcNumberofFeats()).toEqual([4, 3, 3]);
    d = new Race.human();
    c = new Character(barbarian, d, 18, 16, 14, 6, 8, 10, 1);
    expect(c.calcNumberofFeats()).toEqual([2, 0, 0]);
});

test('Character background points should be calculated', () => {
    const armor: Types.ArmorTypes = Types.ArmorTypes.LIGHT;
    const weapon = Types.MeleeWeapons.TWOHHEAVY;
    const ranged = Types.RangedWeapons.BOWLIGHT;
    const barbarian = new Barbarian(armor, false, weapon, ranged);
    const d = new Race.dwarf();
    const c = new Character(barbarian, d, 18, 16, 14, 6, 8, 10, 1);
    expect(c.calcNumberofBackgrounds()).toBe(5);
    expect(c.calcBackgroundCap()).toBe(5);
    const f = new Spells.feat(Types.Tiers.ADVENTURER, '', 'bckgd', 'Further Backgrounding');
    c.setFeats([f]);
    expect(c.calcNumberofBackgrounds()).toBe(7);
    const f1 = new Spells.feat(Types.Tiers.CHAMPION, '', 'bckgd', 'Further Backgrounding');
    c.setFeats([f, f1]);
    expect(c.calcNumberofBackgrounds()).toBe(10);
    const f2 = new Spells.feat(Types.Tiers.EPIC, '', 'bckgd', 'Further Backgrounding');
    c.setFeats([f, f1, f2]);
    expect(c.calcNumberofBackgrounds()).toBe(12);
    expect(c.calcBackgroundCap()).toBe(7);
});

test('Character spell slots should be calculated', () => {
    const armor: Types.ArmorTypes = Types.ArmorTypes.LIGHT;
    const weapon = Types.MeleeWeapons.TWOHHEAVY;
    const ranged = Types.RangedWeapons.BOWLIGHT;
    const barbarian = new Barbarian(armor, false, weapon, ranged);
    const d = new Race.dwarf();
    const c = new Character(barbarian, d, 18, 16, 14, 6, 8, 10, 1);
    expect(c.calcNumberofSpells()).toEqual([0, 0, 0]);
});

test('Character initiative should be calculated', () => {
    const armor: Types.ArmorTypes = Types.ArmorTypes.LIGHT;
    const weapon = Types.MeleeWeapons.TWOHHEAVY;
    const ranged = Types.RangedWeapons.BOWLIGHT;
    const barbarian = new Barbarian(armor, false, weapon, ranged);
    const d = new Race.dwarf();
    const c = new Character(barbarian, d, 18, 16, 14, 6, 8, 10, 1);
    expect(c.initiative).toBe(3);
    const f = new Spells.feat(Types.Tiers.ADVENTURER, '', 'bckgd', 'Imp. Initiative');
    c.setFeats([f]);
    expect(c.initiative).toBe(7);
});

test('Character hitpoints should be calculated', () => {
    const armor: Types.ArmorTypes = Types.ArmorTypes.LIGHT;
    const weapon = Types.MeleeWeapons.TWOHHEAVY;
    const ranged = Types.RangedWeapons.BOWLIGHT;
    const barbarian = new Barbarian(armor, false, weapon, ranged);
    const d = new Race.dwarf();
    let c = new Character(barbarian, d, 18, 16, 14, 6, 8, 10, 1);

    expect(c.maxHp).toBe(30);

    c = new Character(barbarian, d, 18, 16, 14, 6, 8, 10, 5);
    let f = new Spells.feat(Types.Tiers.ADVENTURER, '', 'bckgd', 'Toughness');
    c.setFeats([f]);
    expect(c.maxHp).toBe(87);

    c = new Character(barbarian, d, 18, 16, 14, 6, 8, 10, 10);
    let magicitem = new Spells.magicitems(Types.ItemType.SHIELD, Types.Tiers.CHAMPION, true,"","");
    c.setMagicItems([magicitem]);
    expect(c.maxHp).toBe(250);

    c = new Character(barbarian, d, 18, 16, 14, 6, 8, 10, 10);
    magicitem = new Spells.magicitems(Types.ItemType.SHIELD, Types.Tiers.CHAMPION, true,"","");
    f = new Spells.feat(Types.Tiers.ADVENTURER, '', 'bckgd', 'Toughness');
    c.setMagicItems([magicitem]);
    c.setFeats([f]);
    expect(c.maxHp).toBe(264);
});

test('Character recoveries should be calculated', () => {
    const armor: Types.ArmorTypes = Types.ArmorTypes.LIGHT;
    const weapon = Types.MeleeWeapons.TWOHHEAVY;
    const ranged = Types.RangedWeapons.BOWLIGHT;
    const barbarian = new Barbarian(armor, false, weapon, ranged);
    const d = new Race.dwarf();
    const c = new Character(barbarian, d, 18, 16, 14, 6, 8, 10, 1);

    expect(c.maxRec).toBe(8);
    expect(c.recRoll).toEqual([1, 10, 3]);

    const magicitem = new Spells.magicitems(Types.ItemType.BELT, Types.Tiers.CHAMPION, true,"","");
    c.setMagicItems([magicitem]);
    expect(c.maxRec).toBe(10);

    const talent = new Spells.talent(Types.AbilityRefresh.ATWILL, Types.AbilityType.FREE, Types.Tiers.ADVENTURER, false, 'Strongheart', 'Does stuff', 'http://test.com');
    c.setTalents([talent]);
    expect(c.recRoll).toEqual([1, 12, 3]);

    const feat = new Spells.feat(Types.Tiers.ADVENTURER, '', '', 'Strongheart');
    const feat2 = new Spells.feat(Types.Tiers.EPIC, '', '', 'Strongheart');
    c.setFeats([feat, feat2]);
    expect(c.maxRec).toBe(12);
});

test('Character hit values should be calculated', () => {
    const armor: Types.ArmorTypes = Types.ArmorTypes.LIGHT;
    const weapon = Types.MeleeWeapons.TWOHHEAVY;
    const ranged = Types.RangedWeapons.BOWLIGHT;
    const barbarian = new Barbarian(armor, false, weapon, ranged);
    const d = new Race.dwarf();
    let c = new Character(barbarian, d, 18, 16, 14, 6, 8, 10, 1);

    expect(c.meleeToHit).toBe(5);
    expect(c.rangedToHit).toBe(3);

    const magicitem = new Spells.magicitems(Types.ItemType.MELEE, Types.Tiers.CHAMPION, true,"","");
    const magicitem2 = new Spells.magicitems(Types.ItemType.RANGED, Types.Tiers.EPIC, true,"","");
    c.setMagicItems([magicitem, magicitem2]);
    expect(c.meleeToHit).toBe(7);
    expect(c.rangedToHit).toBe(6);

    // TODO unequiping doesn't kick off a recalc...need a cleaner way to do this
    // c.magicItems[0].equipped=false;

    magicitem.unequip();
    c.setMagicItems([magicitem]);
    expect(c.meleeToHit).toBe(5);

    c = new Character(barbarian, d, 6, 6, 4, 6, 6, 6, 1);
    expect(c.meleeToHit).toBe(-1);
    expect(c.rangedToHit).toBe(-2);
});
