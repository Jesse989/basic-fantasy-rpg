import Character from '../../Character';
import { getWeaponByName } from '../../../loot/weaponAPI';
import { getArmorByName } from '../../../loot/armorAPI';
import priestAI from './priestAI';
import ManaMechanic from '../Mana';
import ResourceBar from '../../Managers/ResourceBar';
import PriestAbilities from './PriestAbilities';
import KeyMap from '../../../player/KeyMap';
import Anims from '../../Managers/Anims';
import QuestLog from '../../Managers/QuestLog';

/**
 *
 */
export default class Priest extends Character {
  constructor(scene = {}, x = 0, y = 0, name = 'priest') {
    super(scene, x, y);
    // mage specific abilities
    this.ability = new PriestAbilities(this);
    this.questLog = new QuestLog(this);


        //set starting texture and size:
        this.setTexture('mage-run', 0).setSize(22, 22).setOrigin(0.5);

    // coordinate which animations to play:
    this.animations = new Anims(this, 'priest', 'priest-sword');

    // config keymap for mage abilities
    this.keyMap = new KeyMap(this);
    this.keyMap.set('one', { ability: this.ability.wand, icon: 'wand' });
    this.keyMap.set('two', { ability:this.ability.lesserHeal, icon: 'heal' });
    this.keyMap.set('three', { ability: this.ability.renew, icon: 'renew' });

    // set faction, default 'alliance'
    this.setTeam('alliance');

    // placement on map, sync the move target coords
    this.movement.setMoveTargetCoords([x, y]);

    // name and class specific stats
    this.setName(name);
    this.setCharacterClass('priest');
    this.stat.setCrit(5);
    this.stat.setSpellCrit(10);
    this.stat.setDodgeRating(.032);
    this.stat.setAgilityToDodgeRatio(19.444);

    // mages start with bonus to intellect:
    const baseIntellect = this.stat.baseIntellect();
    const priestIntellectBonus = 3;
    this.stat.setIntellect(baseIntellect + priestIntellectBonus);

    // and spirit:
    const baseSpirit = this.stat.baseSpirit();
    const priestSpiritBonus = 2;
    this.stat.setSpirit(baseSpirit + priestSpiritBonus);

    // starting equipment
    const equipped = this.equipment.equipped();
    equipped.mainHand = getWeaponByName("Crooked Staff");
    equipped.ranged = getWeaponByName("Shadow Wand");
    equipped.chest = getArmorByName("Apprentice's Robe");
    equipped.legs = getArmorByName("Apprentice's Pants");
    equipped.feet = getArmorByName("Apprentice's Boots");
    this.equipment.setEquipped(equipped);

    // starting hp
    this.stat.setBaseHp(31);
    this.stat.setHp(this.stat.maxHp());


    // mana system
    this.mana = new ManaMechanic(this);

    // new resource bar, positioned to float above the character:
    this.mana.setMana(this.mana.maxMana());
    this.manaBar = new ResourceBar(scene, 'mana', this.mana.mana());

    // ai system
    this.AI = priestAI();

    // class specific updates
    this.classUpdate = function() {
      // when out of combat or if havenet casted
      // in 5 seconds, start mana and hp regen
    }
  }
}
