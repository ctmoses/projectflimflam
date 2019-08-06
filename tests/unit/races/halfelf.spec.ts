import * as Race from '../../../src/model/race';
import * as Types from '../../../src/types';

test('Half Elf should return correct stats', () => {
    let h = new Race.halfelf();
    expect(h.bonusstat1).toBe(Types.Attributes.CONSTITUTION);
    expect(h.bonusstat2).toBe(Types.Attributes.CHARISMA);
});