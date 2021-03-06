import Character from '../../Character';
import { getWeaponByName } from '../../../loot/weaponAPI';
import { getArmorByName } from '../../../loot/armorAPI';
import barbarianAI from './barbarianAI';
import RageMechanic from '../Rage';
import ResourceBar from '../../Managers/ResourceBar';
import BarbarianAbilities from './BarbarianAbilities';
import KeyMap from '../../../player/KeyMap';
import Anims from '../../Managers/Anims';
import QuestLog from '../../Managers/QuestLog';

/**
 *
 */
export default class Barbarian extends Character {
  constructor(scene = {}, x = 0, y = 0, name = 'barbarian') {
    super(scene, x, y)
    // barbarian specific abilities
    this.ability = new BarbarianAbilities(this);
    this.questLog = new QuestLog(this);

    // coordinate which animations to play:
    this.animations = new Anims(this, 'barbarian', 'barbarian-sword');

        //set starting texture and size:
        this.setTexture('mage-run', 0).setSize(22, 22).setOrigin(0.5);

    // config keymap for barbarian abilities

    // enable sending config object as second arg to keymap?
    this.keyMap = new KeyMap(this);

    // faction, default 'alliance'
    this.setTeam('alliance');

    // placement on the map
    this.movement.setMoveTargetCoords([x, y]);

    // name and class specific stats
    this.setName(name);
    this.setCharacterClass('barbarian');
    this.stat.setCrit(5);
    this.stat.setDodgeRating(0);
    this.stat.setAgilityToDodgeRatio(10);
    this.stat.setAgilityToCritRatio(10);
    this.stat.setStrAPR(1)

    // barbarians start with bonus to strength:
    const baseStrength = this.stat.baseStrength();
    const barbarianStrengthBonus = 3;
    this.stat.setStrength(baseStrength + barbarianStrengthBonus);
    this.stat.setPrimary(['strength', 'stamina']);
    this.stat.setSecondary(['spirit', 'agility', 'intellect'])

    // and bonus to stamina:
    const baseStamina = this.stat.baseStamina();
    const barbarianStaminaBonus = 2;
    this.stat.setStamina(baseStamina + barbarianStaminaBonus);

    // starting skills:
    this.skills.learnSkill('twoHandSword');
    this.skills.learnSkill('mail');

    this.equipment.equip(getWeaponByName("Tarnished Sword"));
    this.equipment.equip(getArmorByName("Recruit's Vest"));
    this.equipment.equip(getArmorByName("Recruit's Pants"));
    this.equipment.equip(getArmorByName("Recruit's Boots"));

    // starting hp
    this.stat.setBaseHp(20);
    this.stat.setHp(this.stat.maxHp());

    // rage system
    this.rage = new RageMechanic(this);

    // new resource bar, positioned to float above the character:
    this.rageBar = new ResourceBar(scene, 'rage', 100);

    // ai system
    this.AI = barbarianAI();

    // class specific updates e.g. rage, mana, energy
    this.classUpdate = function() {
      // after 5 seconds start regen hp according to spirit
      if(!this.combat.isInCombat()) this.rage.rageDecay();
    };

  }
}
