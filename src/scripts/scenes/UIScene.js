import { clearDialogue, loadDialogue } from './UI/dialogue';
import { hideLoot, showLoot, buildLoot } from './UI/loot';
import { clearInventory, showInventory, selectItem } from './UI/inventory';
import { selectQuest, clearQuestLog, loadQuestLog } from './UI/quest';
import { clearActionBar, loadActionBar } from './UI/actionBar';

import XpBar from './UI/XpBar';


import CONST from './Const';



/**
 * UI:
 */
export default class UIScene extends Phaser.Scene {
  constructor() {
    super({ key: 'UIScene' });



  }

  create() {

    // xp bar:
    this.XpBar = new XpBar(this);

    // lootBox:
    this.lootBoxContainer = this.add.container(CONST.GAME_VIEW_CENTER_X, CONST.GAME_VIEW_CENTER_Y);

    // equipment:
    this.equipmentContainer = this.add.container(CONST.GAME_VIEW_CENTER_X, CONST.GAME_VIEW_CENTER_Y);

    // inventory:
    this.inventoryContainer = this.add.container(CONST.GAME_VIEW_CENTER_X, CONST.GAME_VIEW_CENTER_Y);

    // quest log:
    this.questLogContainer = this.add.container(CONST.GAME_VIEW_CENTER_X, CONST.GAME_VIEW_CENTER_Y);

    // dialogue box:
    this.dialogueBoxContainer = this.add.container(CONST.GAME_VIEW_CENTER_X, CONST.GAME_VIEW_CENTER_Y);

    // icons:
    this.icons = this.add.group();

    // events:
    this.registry.events.on('changedata', this.updateData, this);

  }


  updateData(parent, key, data) {

    if (key === 'reloadUI') {
      clearActionBar(this);
      const icons = data.keyMap.getIcons();
      loadActionBar(this, icons)

    } else if (key === 'openDialogueBox') {
      loadDialogue(this, data);

    } else if (key === 'closeDialogueBox') {
      clearDialogue(this);

    } else if (key === 'openQuestLog') {
      loadQuestLog(this, data);

    } else if (key === 'closeQuestLog') {
      clearQuestLog(this);

    } else if (key === 'selectQuest') {
      selectQuest(scene, data);

    } else if (key === 'openInventory') {
      showInventory(this, data);

    } else if (key === 'closeInventory') {
      clearInventory(this);

    } else if (key === 'openLootBox') {
      showLoot(this, data);

    } else if (key === 'closeLootBox') {
      hideLoot(this);

    } else if (key === 'openEquipment') {
      showEquipment(this, data.stats, data.equipment);

    } else if (key === 'closeEquipment') {
      clearEquipment(this);

    } else if (key === 'selectItem') {
      selectItem(this, data)
    } else if (key === 'showComparison') {
      showComparison(this, data);

    } else if (key === 'refreshXpBar') {
      this.XpBar.set(data);
    }
  }
}

function showComparison(scene, item) {
  if (!item) return;

  let name = item.name;
  let stats = '';
  let statKeys = '';

  switch(item.type) {
    case 'armor':
    stats = [ `${item.armor}`, item.armorType, item.levelRequirement, item.sellPrice, item.slot ];
    statKeys = ["AC: ", "Type: ", "Lvl: ", "$$$: ", "Slot: " ];
    break;
    case 'weapon':
    stats = [ `${item.damage.min}-${item.damage.max}`, item.speed, item.levelRequirement, '$' + item.sellPrice, item.slot ];
    statKeys = ["Dmg: ", "Spd: ", "Lvl: ", "$$$: ", "Slot: " ];
    break;
  }

  const title = scene.add.bitmapText( (-16 * 4), (12 * 4), 'font', 'equipped: ', 16)
  const itemName = scene.add.bitmapText( (-16 * 4), (18 * 4), 'font', name, 18);
  const itemStats = scene.add.bitmapText( (38 * 4), (26 * 4), 'font', stats, 16).setOrigin(1, 0).setRightAlign();
  const itemStatKeys = scene.add.bitmapText( (-16 * 4), (26 * 4), 'font', statKeys, 16);
  scene.inventoryContainer.add([title, itemName, itemStats, itemStatKeys])

}

function showEquipment(scene, stats, equipment) {
  if (!stats) return;

  const equipmentBackground = scene.add.image(0, 0, 'equipment-background');
  equipmentBackground.scaleX = CONST.SCALE;
  equipmentBackground.scaleY = CONST.SCALE;


  const statsHeader = scene.add.bitmapText(-51 * 4, 12 * 4, 'font', ['Str: ', 'Agi: ', 'Sta: ', 'Int: ', 'Spi: ', 'Crt: ', 'POW: '], 18)
  const statsInfo = scene.add.bitmapText(-12 * 4, 12 * 4, 'font', [stats.str, stats.agi, stats.sta, stats.int, stats.spi, stats.crit * 100 + '%', stats.ap], 18)
  statsInfo.setRightAlign().setOrigin( 1, 0)
  // add equipped items:
  scene.equipmentContainer.add([equipmentBackground, statsHeader, statsInfo]);
  buildCharacter(scene, equipment);


}

function buildCharacter(scene, equipment) {
  const _xLeft = -93 * 4;
  const _xRight = -71 * 4;

  const _y1 = -32 * 4;
  const _y2 = -12 * 4;
  const _y3 = 8 * 4;
  const _y4 = 28 * 4;




  for (let item in equipment) {

    if (equipment[item].hasOwnProperty('slot')) {
      let bg = {};
      switch (equipment[item].slot()) {
        case 'head':
          const head = scene.add.image(_xLeft, _y1, equipment[item].getIcon()).setOrigin(.5);
          head.scaleX = 4;
          head.scaleY = 4;

          bg = scene.add.image(_xLeft, _y1, equipment[item].getColor() + '-sm-bg');
          bg.scaleX = 4;
          bg.scaleY = 4;

          scene.equipmentContainer.add([bg, head]);
        break;
        case 'chest':
          const chest = scene.add.image(_xLeft, _y2, equipment[item].getIcon()).setOrigin(.5);
          chest.scaleX = 4;
          chest.scaleY = 4;

          bg = scene.add.image(_xLeft, _y2, equipment[item].getColor() + '-sm-bg');
          bg.scaleX = 4;
          bg.scaleY = 4;


          scene.equipmentContainer.add([bg, chest]);
        break;
        case 'legs':
          const legs = scene.add.image(_xRight, _y2, equipment[item].getIcon()).setOrigin(.5);
          legs.scaleX = 4;
          legs.scaleY = 4;

          bg = scene.add.image(_xRight, _y2, equipment[item].getColor() + '-sm-bg');
          bg.scaleX = 4;
          bg.scaleY = 4;

          scene.equipmentContainer.add([bg, legs]);
        break;
        case 'feet':
          const feet = scene.add.image(_xRight, _y4, equipment[item].getIcon()).setOrigin(.5);
          feet.scaleX = 4;
          feet.scaleY = 4;

          bg = scene.add.image(_xRight, _y4, equipment[item].getColor() + '-sm-bg');
          bg.scaleX = 4;
          bg.scaleY = 4;


          scene.equipmentContainer.add([bg, feet]);
        break;
        case 'mainHand':
          const mainHand = scene.add.image(_xLeft, _y3, equipment[item].getIcon()).setOrigin(.5);
          mainHand.scaleX = 4;
          mainHand.scaleY = 4;

          bg = scene.add.image(_xLeft, _y3, equipment[item].getColor() + '-sm-bg');
          bg.scaleX = 4;
          bg.scaleY = 4;


          scene.equipmentContainer.add([bg, mainHand]);
        break;
        case 'offHand':
          const offHand = scene.add.image(_xRight, _y3, equipment[item].getIcon()).setOrigin(.5);
          offHand.scaleX = 4;
          offHand.scaleY = 4;

          bg = scene.add.image(_xRight, _y3, equipment[item].getColor() + '-sm-bg');
          bg.scaleX = 4;
          bg.scaleY = 4;

          scene.equipmentContainer.add([bg, offHand]);
        break;
        case 'ranged':
          const ranged = scene.add.image(_xRight, _y1, equipment[item].getIcon()).setOrigin(.5);
          ranged.scaleX = 4;
          ranged.scaleY = 4;

          bg = scene.add.image(_xRight, _y1, equipment[item].getColor() + '-sm-bg');
          bg.scaleX = 4;
          bg.scaleY = 4;

          scene.equipmentContainer.add([bg, ranged]);
        break;
        case 'ring':
          const ring = scene.add.image(_xLeft, _y4, equipment[item].getIcon()).setOrigin(.5);
          ring.scaleX = 4;
          ring.scaleY = 4;

          bg = scene.add.image(_xLeft, _y4, equipment[item].getColor() + '-sm-bg');
          bg.scaleX = 4;
          bg.scaleY = 4;

          scene.equipmentContainer.add([bg, ring]);
        break;
      }

    }


  }


}

function clearEquipment(scene) {
  scene.equipmentContainer.removeAll(true);

}
