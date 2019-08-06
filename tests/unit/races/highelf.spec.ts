import * as Race from '../../../src/model/race';
import * as Types from '../../../src/types';

test('High Elf should return correct stats', () => {
    let h = new Race.highelf();
    expect(h.bonusstat1).toBe(Types.Attributes.INTELLIGENCE);
    expect(h.bonusstat2).toBe(Types.Attributes.CHARISMA);
});