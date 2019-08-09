import Barbarian from '../../../src/model/classes/barbarian';
import * as Race from '../../../src/model/race';
import Character from '../../../src/model/character';
import * as Types from '../../../src/types';
import * as Spells from '../../../src/model/spell';

test('Test Initial Char Creation', () => {
    const armor: Types.ArmorTypes = Types.ArmorTypes.LIGHT;
    const weapon = Types.MeleeWeapons.TWOHHEAVY;
    const ranged = Types.RangedWeapons.BOWLIGHT;
    const barbarian = new Barbarian(armor, false, weapon, ranged);
    const d = new Race.darkelf();

    const c = new Character(barbarian, d, 18, 16, 14, 6, 8, 10, 1);

    // Set Some Magic Items
    const magicitem = new Spells.magicitems(Types.ItemType.ARMOR, Types.Tiers.CHAMPION, true,"","");
    const magicitem1 = new Spells.magicitems(Types.ItemType.CLOAK, Types.Tiers.ADVENTURER, true,"","");
    const magicitem2 = new Spells.magicitems(Types.ItemType.HELM, Types.Tiers.EPIC, true,"","");
    c.setMagicItems([magicitem, magicitem1, magicitem2]);

    // Set the talents
    const numTalents = c.calcNumberofTalents;
    const talent = new Spells.talent(Types.AbilityRefresh.DAILY, Types.AbilityType.QUICK, Types.Tiers.ADVENTURER, true, 'Barbarian Rage', 'Once per day, use a quick action to start raging. A rage lasts until the end of battle, or about 5 minutes. While raging, you roll 2d20 to hit with your barbarian melee and thrown weapon attacks instead of 1d20. Use the higher roll for the attack. If you roll a natural 11+ with both dice and your highest attack roll is a hit, the attack is a critical hit! Recharge 16+: After a battle in which you rage, roll a d20 and add your Constitution modifier. On a 16+, you can use Barbarian Rage again later in the day.', 'https://www.13thagesrd.com/classes/barbarian/#Barbarian_Rage');
    const talent2 = new Spells.talent(Types.AbilityRefresh.BATTLE, Types.AbilityType.FREE, Types.Tiers.ADVENTURER, false, 'Barbaric Cleave', 'Once per battle as a free action, you can make a standard melee attack after having dropped any enemy to 0 hp with a standard melee attack. Mooks do not count for this, unless the mook you dropped was the last of its mook mob.', 'https://www.13thagesrd.com/classes/barbarian/#Barbaric_Cleave');
    c.setTalents([talent, talent2]);

    // Set the feats
    const numFeats = c.calcNumberofFeats;
    const feat = new Spells.feat(Types.Tiers.ADVENTURER, 'General', 'A: Add 2 total points to your backgrounds', 'Further Backgrounding');
    c.setFeats([feat]);

    // Set Name and unique thing
    c.setName('Bob');
    c.setUnique('test');

    // Set Icon
    // TODO Need character to calculate how many icons are allowed and the cap
    const icon = new Spells.icon('Ork King', 3);
    c.setIcons([icon]);


    // Set backgrounds
    const numbackgroundpoints = c.calcNumberofBackgrounds();
    const backgroundcap = c.calcBackgroundCap();
    const background = new Spells.background('Thief', 5);
    const background1 = new Spells.background('Farmer', 3);

    c.setBackgrounds([background, background1]);
});
