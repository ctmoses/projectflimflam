import * as Race from '../../../src/model/race';
import * as Types from '../../../src/types';

test('Dwarf should return correct stats', () => {
    let d = new Race.dwarf();
    expect(d.bonusstat1).toBe(Types.Attributes.WISDOM);
    expect(d.bonusstat2).toBe(Types.Attributes.CONSTITUTION);
});

test('Dark Elf should return correct stats', () => {
    let d = new Race.darkelf();
    expect(d.bonusstat1).toBe(Types.Attributes.DEXTERITY);
    expect(d.bonusstat2).toBe(Types.Attributes.CHARISMA);
});

test('Gnome should return correct stats', () => {
    let g = new Race.gnome();
    expect(g.bonusstat1).toBe(Types.Attributes.DEXTERITY);
    expect(g.bonusstat2).toBe(Types.Attributes.INTELLIGENCE);
});

test('Half Elf should return correct stats', () => {
    let h = new Race.halfelf();
    expect(h.bonusstat1).toBe(Types.Attributes.CONSTITUTION);
    expect(h.bonusstat2).toBe(Types.Attributes.CHARISMA);
});

test('Halfing should return correct stats', () => {
    let h = new Race.halfling();
    expect(h.bonusstat1).toBe(Types.Attributes.CONSTITUTION);
    expect(h.bonusstat2).toBe(Types.Attributes.DEXTERITY);
});

test('Half Orc should return correct stats', () => {
    let o = new Race.halforc();
    expect(o.bonusstat1).toBe(Types.Attributes.STRENGTH);
    expect(o.bonusstat2).toBe(Types.Attributes.DEXTERITY);
});

test('High Elf should return correct stats', () => {
    let h = new Race.highelf();
    expect(h.bonusstat1).toBe(Types.Attributes.INTELLIGENCE);
    expect(h.bonusstat2).toBe(Types.Attributes.CHARISMA);
});

test('Human should return correct stats', () => {
    let h = new Race.human();
    expect(h.bonusstat1).toBe(Types.Attributes.ALL);
    expect(h.bonusstat2).toBe(NaN);
});

test('Wood Elf should return correct stats', () => {
    let w = new Race.woodelf();
    expect(w.bonusstat1).toBe(Types.Attributes.DEXTERITY);
    expect(w.bonusstat2).toBe(Types.Attributes.WISDOM);
});