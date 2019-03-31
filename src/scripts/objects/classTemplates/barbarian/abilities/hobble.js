import CombatObject from '../../../CombatSystem/CombatObject';
import abilityRequirements from '../../abilityRequirements';
import CONST from '../../../Managers/Const';

/**
 * hobble - Maims the enemy, causing 5 damage and slowing
 * the enemy's movement by 40% for 15 seconds.
 * Requires Battle Stance/Berserker Stance
 *
 * level: 1
 *
 * requires: level 8
 *
 * @returns {void}
 */
 export default function hobble() {
   // pre ability requirements:
   const config = {
     beneficial: false,
     resourceAmount: 10,
     resource: 'rage',
     range: CONST.MELEE_RANGE,
     needsTarget: true
   }

   if(!abilityRequirements(this, config)) return;

  const target = this.target.currentTarget();

  // setup combat object:
  const combatObject = new CombatObject(this, target);
  combatObject.setType('special');
  combatObject.setAmount(5);

  // send object to be used
  combatObject.process();
  // create combat object for 5 dmg, send it to be processed
  const debuff = {
    name: 'hobble',
    duration: 15 * 60,
    statObject: {
      moveSpeed: .6
    },
    attacker: this
  }
  // create debuff for * .6 movement speed, send it to buff
  if (target.buffs.has('hobble'))
    target.buffs.replace(debuff);
  else
    target.buffs.add(debuff);
  // placeholder animation, will make specific one for rend
  this.animations.swing();
}
