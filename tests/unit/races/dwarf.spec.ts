import * as Race from '../../../src/model/race';
import * as Types from '../../../src/types';

test('Dwarf should return correct stats', () => {
    let d = new Race.dwarf();
    expect(d.bonusstat1).toBe(Types.Attributes.WISDOM);
    expect(d.bonusstat2).toBe(Types.Attributes.CONSTITUTION);
});