import * as Race from '../../../src/model/race';
import * as Types from '../../../src/types';

test('Human should return correct stats', () => {
    let h = new Race.human();
    expect(h.bonusstat1).toBe(Types.Attributes.ALL);
    expect(h.bonusstat2).toBe(NaN);
});