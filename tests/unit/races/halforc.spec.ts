import * as Race from '../../../src/model/race';
import * as Types from '../../../src/types';

test('Half Orc should return correct stats', () => {
    let o = new Race.halforc();
    expect(o.bonusstat1).toBe(Types.Attributes.STRENGTH);
    expect(o.bonusstat2).toBe(Types.Attributes.DEXTERITY);
});