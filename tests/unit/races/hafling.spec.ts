import * as Race from '../../../src/model/race';
import * as Types from '../../../src/types';

test('Halfing should return correct stats', () => {
    let h = new Race.halfling();
    expect(h.bonusstat1).toBe(Types.Attributes.CONSTITUTION);
    expect(h.bonusstat2).toBe(Types.Attributes.DEXTERITY);
});