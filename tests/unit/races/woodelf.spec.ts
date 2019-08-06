import * as Race from '../../../src/model/race';
import * as Types from '../../../src/types';

test('Wood Elf should return correct stats', () => {
    let w = new Race.woodelf();
    expect(w.bonusstat1).toBe(Types.Attributes.DEXTERITY);
    expect(w.bonusstat2).toBe(Types.Attributes.WISDOM);
});