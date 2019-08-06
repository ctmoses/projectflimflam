import * as Race from '../../../src/model/race';
import * as Types from '../../../src/types';

test('Dark Elf should return correct stats', () => {
    let d = new Race.darkelf();
    expect(d.bonusstat1).toBe(Types.Attributes.DEXTERITY);
    expect(d.bonusstat2).toBe(Types.Attributes.CHARISMA);
});