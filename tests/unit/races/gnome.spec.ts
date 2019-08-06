import * as Race from '../../../src/model/race';
import * as Types from '../../../src/types';

test('Gnome should return correct stats', () => {
    let g = new Race.gnome();
    expect(g.bonusstat1).toBe(Types.Attributes.DEXTERITY);
    expect(g.bonusstat2).toBe(Types.Attributes.INTELLIGENCE);
});