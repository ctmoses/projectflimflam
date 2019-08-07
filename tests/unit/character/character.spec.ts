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
    expect(c.ac).toBe(15);
    expect(c.md).toBe(10);
    expect(c.pd).toBe(15);

    let magicitem = new Spells.magicitems(Types.ItemType.ARMOR,Types.Tiers.CHAMPION);
    let magicitem1 = new Spells.magicitems(Types.ItemType.CLOAK,Types.Tiers.ADVENTURER);
    let magicitem2 = new Spells.magicitems(Types.ItemType.HELM,Types.Tiers.EPIC);
    c.setMagicItems([magicitem,magicitem1,magicitem2]);
    expect(c.ac).toBe(17);
    expect(c.md).toBe(13);
    expect(c.pd).toBe(16);

});

test('Character Feats should be calculated', () =>{
    let armor: Types.ArmorTypes = Types.ArmorTypes.LIGHT;
    let weapon = Types.MeleeWeapons.TWOHHEAVY;
    let ranged = Types.RangedWeapons.BOWLIGHT;
    let barbarian = new Barbarian(armor, false, weapon, ranged);
    let d = new Race.dwarf();
    let c = new Character(barbarian,d,18,16,14,6,8,10,1);
    expect(c.calcNumberofFeats()).toEqual([1,0,0]);
    c = new Character(barbarian,d,18,16,14,6,8,10,5);
    expect(c.calcNumberofFeats()).toEqual([4,1,0]);
    c = new Character(barbarian,d,18,16,14,6,8,10,10);
    expect(c.calcNumberofFeats()).toEqual([4,3,3]);
    d = new Race.human();
    c = new Character(barbarian,d,18,16,14,6,8,10,1);
    expect(c.calcNumberofFeats()).toEqual([2,0,0]);


});

test('Character background points should be calculated', () =>{
    let armor: Types.ArmorTypes = Types.ArmorTypes.LIGHT;
    let weapon = Types.MeleeWeapons.TWOHHEAVY;
    let ranged = Types.RangedWeapons.BOWLIGHT;
    let barbarian = new Barbarian(armor, false, weapon, ranged);
    let d = new Race.dwarf();
    let c = new Character(barbarian,d,18,16,14,6,8,10,1);
    expect(c.calcNumberofBackgrounds()).toBe(5);
    expect(c.calcBackgroundCap()).toBe(5);
    let f = new Spells.feat(Types.Tiers.ADVENTURER,"","bckgd","Further Backgrounding");
    c.setFeats([f]);
    expect(c.calcNumberofBackgrounds()).toBe(7);
    let f1 = new Spells.feat(Types.Tiers.CHAMPION,"","bckgd","Further Backgrounding");
    c.setFeats([f,f1]);
    expect(c.calcNumberofBackgrounds()).toBe(10);
    let f2 = new Spells.feat(Types.Tiers.EPIC,"","bckgd","Further Backgrounding");
    c.setFeats([f,f1,f2]);
    expect(c.calcNumberofBackgrounds()).toBe(12);
    expect(c.calcBackgroundCap()).toBe(7);
});

test('Character spell slots should be calculated', () =>{
    let armor: Types.ArmorTypes = Types.ArmorTypes.LIGHT;
    let weapon = Types.MeleeWeapons.TWOHHEAVY;
    let ranged = Types.RangedWeapons.BOWLIGHT;
    let barbarian = new Barbarian(armor, false, weapon, ranged);
    let d = new Race.dwarf();
    let c = new Character(barbarian,d,18,16,14,6,8,10,1);
    expect(c.calcNumberofSpells()).toEqual([0,0,0]);

});

test('Character initiative should be calculated', () =>{
    let armor: Types.ArmorTypes = Types.ArmorTypes.LIGHT;
    let weapon = Types.MeleeWeapons.TWOHHEAVY;
    let ranged = Types.RangedWeapons.BOWLIGHT;
    let barbarian = new Barbarian(armor, false, weapon, ranged);
    let d = new Race.dwarf();
    let c = new Character(barbarian,d,18,16,14,6,8,10,1);
    expect(c.initiative).toBe(3);
    let f = new Spells.feat(Types.Tiers.ADVENTURER,"","bckgd","Imp. Initiative");
    c.setFeats([f]);
    expect(c.initiative).toBe(7);

});

test('Character hitpoints should be calculated', () =>{
    let armor: Types.ArmorTypes = Types.ArmorTypes.LIGHT;
    let weapon = Types.MeleeWeapons.TWOHHEAVY;
    let ranged = Types.RangedWeapons.BOWLIGHT;
    let barbarian = new Barbarian(armor, false, weapon, ranged);
    let d = new Race.dwarf();
    let c = new Character(barbarian,d,18,16,14,6,8,10,1);
    
    expect(c.maxHp).toBe(30);
    
    c = new Character(barbarian,d,18,16,14,6,8,10,5);
    let f = new Spells.feat(Types.Tiers.ADVENTURER,"","bckgd","Toughness");
    c.setFeats([f]);
    expect(c.maxHp).toBe(87);

    c = new Character(barbarian,d,18,16,14,6,8,10,10);
    let magicitem = new Spells.magicitems(Types.ItemType.SHIELD,Types.Tiers.CHAMPION);
    c.setMagicItems([magicitem]);
    expect(c.maxHp).toBe(250);

    c = new Character(barbarian,d,18,16,14,6,8,10,10);
    magicitem = new Spells.magicitems(Types.ItemType.SHIELD,Types.Tiers.CHAMPION);
    f = new Spells.feat(Types.Tiers.ADVENTURER,"","bckgd","Toughness");
    c.setMagicItems([magicitem]);
    c.setFeats([f]);
    expect(c.maxHp).toBe(264);

});

test('Character hitpoints should be calculated', () =>{
    let armor: Types.ArmorTypes = Types.ArmorTypes.LIGHT;
    let weapon = Types.MeleeWeapons.TWOHHEAVY;
    let ranged = Types.RangedWeapons.BOWLIGHT;
    let barbarian = new Barbarian(armor, false, weapon, ranged);
    let d = new Race.dwarf();
    let c = new Character(barbarian,d,18,16,14,6,8,10,1);
    
    expect(c.maxRec).toBe(8);
    
    let magicitem = new Spells.magicitems(Types.ItemType.BELT,Types.Tiers.CHAMPION);
    c.setMagicItems([magicitem]);
    expect(c.maxRec).toBe(10);
});

test('Character hit values should be calculated', () =>{
    let armor: Types.ArmorTypes = Types.ArmorTypes.LIGHT;
    let weapon = Types.MeleeWeapons.TWOHHEAVY;
    let ranged = Types.RangedWeapons.BOWLIGHT;
    let barbarian = new Barbarian(armor, false, weapon, ranged);
    let d = new Race.dwarf();
    let c = new Character(barbarian,d,18,16,14,6,8,10,1);
    
    expect(c.meleeToHit).toBe(5);
    expect(c.rangedToHit).toBe(3)

    let magicitem = new Spells.magicitems(Types.ItemType.MELEE,Types.Tiers.CHAMPION);
    let magicitem2 = new Spells.magicitems(Types.ItemType.RANGED,Types.Tiers.EPIC);
    c.setMagicItems([magicitem,magicitem2]);
    expect(c.meleeToHit).toBe(7);
    expect(c.rangedToHit).toBe(6);
    
    c = new Character(barbarian,d,6,6,4,6,6,6,1);
    expect(c.meleeToHit).toBe(-1);
    expect(c.rangedToHit).toBe(-2);
});