import Character from '../Character';
import { getWeaponByName } from '../../loot/weaponAPI';
import { getArmorByName } from '../../loot/armorAPI';
import OrcAI from './OrcAI';
import MobAbilities from './MobAbilities';
import createLoot from '../../loot/createLoot';
import Anims from '../Managers/Anims';


/**
 *
 */
export default class Orc extends Character {
  constructor(scene = {}, x = 0, y = 0) {
    super(scene, x, y)
    this.ability = new MobAbilities(this);
    this.animations = new Anims(this, 'orc-mask', 'orc-sword');

        //set starting texture and size:
        this.setTexture('mage-run', 0).setSize(22, 22).setOrigin(0.5);
    this.setTeam('mob');
    this.setName('orc');
    this.setCharacterClass('mob');
    this.stat.setDodgeRating(0);
    this.stat.setAgilityToDodgeRatio(20);
    this.stat.setAgilityToCritRatio(10);
    this.stat.setStrAPR(1)


    // starting equipment
    this.skills.learnSkill('dagger');

    this.equipment.equip(getWeaponByName("Deadman Dagger"))



    // starting hp
    this.stat.setBaseHp(10);
    this.stat.setHp(this.stat.maxHp());


    // starting loot
    this.setLoot(createLoot(this.getName()));

    this.AI = OrcAI();
    this.classUpdate = function() {
      // block in case update runs extra tick before
    }
  }
}
