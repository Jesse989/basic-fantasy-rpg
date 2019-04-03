

/**
 * load assets here:
 */
export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // bitmap data:
    this.load.bitmapFont('font',
    './assets/fonts/font.png',
    './assets/fonts/font.fnt');


    const loadingText = this.make.text({
    x: width / 2,
    y: height / 2,
    text: 'Loading...',
    style: {
        font: '28px monospace',
        fill: '#ffffff'
      }
    });

    loadingText.setOrigin(0.5, 0.5);

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();

    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(380, 270, 520, 50);

    // casting animations:
    this.load.spritesheet('mage-sword-frost-cast',
      './assets/anims/mage_sword_frost_cast_spritesheet.png',
      { frameWidth: 24, frameHeight: 36 }
    );

    this.load.spritesheet('priest-sword-nature-cast',
      './assets/anims/priest_sword_nature_cast_spritesheet.png',
      { frameWidth: 24, frameHeight: 36 }
    );

    // npc anims:
    this.load.spritesheet('npc-idle',
      './assets/anims/npc_idle_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    );

    this.load.spritesheet('npc-unarmed-idle',
      './assets/anims/npc_unarmed_idle_spritesheet.png',
      { frameWidth: 24, frameHeight: 36 }
    );


    // priest anims:
    this.load.spritesheet('priest-idle',
      './assets/anims/priest_idle_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    );

    // mage amims:
    this.load.spritesheet('mage-idle',
      './assets/anims/mage_idle_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    );

    this.load.spritesheet('mage-run',
      './assets/anims/mage_run_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    );

    this.load.spritesheet('mage-combat',
      './assets/anims/mage_combat_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    );

    // mage sword anims (i know, its not a sword, TODO: change character.ANIM):
    this.load.spritesheet('mage-sword-idle',
      './assets/anims/mage_sword_idle_spritesheet.png',
      { frameWidth: 24, frameHeight: 36 }
    );

    this.load.spritesheet('mage-sword-run',
      './assets/anims/mage_sword_run_spritesheet.png',
      { frameWidth: 24, frameHeight: 36 }
    );

    this.load.spritesheet('mage-sword-stab',
      './assets/anims/mage_sword_stab_spritesheet.png',
      { frameWidth: 36, frameHeight: 24 }
    );


    // barbarian anims:
    this.load.spritesheet('barbarian-idle',
      './assets/anims/barbarian_idle_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    );

    this.load.spritesheet('barbarian-run',
      './assets/anims/barbarian_run_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    );

    this.load.spritesheet('barbarian-combat',
      './assets/anims/barbarian_combat_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    );

    this.load.spritesheet('barbarian-die',
      './assets/anims/barbarian_die_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    );

    // barbarian sword anims:
    this.load.spritesheet('barbarian-sword-idle',
      './assets/anims/barbarian_sword_idle_spritesheet.png',
      { frameWidth: 24, frameHeight: 36 }
    );

    this.load.spritesheet('barbarian-sword-stab',
      './assets/anims/barbarian_sword_stab_spritesheet.png',
      { frameWidth: 36, frameHeight: 24 }
    );

    this.load.spritesheet('barbarian-sword-run',
      './assets/anims/barbarian_sword_run_spritesheet.png',
      { frameWidth: 24, frameHeight: 36 }
    );

    // orc anims:
    this.load.spritesheet('orc-mask-idle',
      './assets/anims/orc_mask_idle_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    );

    this.load.spritesheet('orc-mask-run',
      './assets/anims/orc_mask_run_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    );

    this.load.spritesheet('orc-mask-combat',
      './assets/anims/orc_mask_combat_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    );

    this.load.spritesheet('orc-mask-die',
      './assets/anims/orc_mask_die_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    );

    this.load.spritesheet('orc-mask-stun',
      './assets/anims/orc_mask_stun_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    );

    // orc sword anims:
    this.load.spritesheet('orc-sword-idle',
      './assets/anims/orc_sword_idle_spritesheet.png',
      { frameWidth: 24, frameHeight: 24 }
    );

    this.load.spritesheet('orc-sword-stab',
      './assets/anims/orc_sword_stab_spritesheet.png',
      { frameWidth: 36, frameHeight: 24 }
    );

    this.load.spritesheet('orc-sword-run',
      './assets/anims/orc_sword_run_spritesheet.png',
      { frameWidth: 24, frameHeight: 24 }
    );

    // drink anim:
    this.load.spritesheet('small-red',
      './assets/anims/red_potion_small_spritesheet.png',
      { frameWidth: 40, frameHeight: 16 }
    );

    // poly anim:
    this.load.spritesheet('polymorph',
      './assets/anims/poly_spritesheet.png',
      { frameWidth: 16, frameHeight: 16 }
    );


    // map data:
    this.load.tilemapTiledJSON('map', './assets/map/combat.json');
    this.load.image('v4', './assets/map/0x72_16x16DungeonTileset_extruded.v4.png');

    // icons:
    // barbarian:
    this.load.image('rush', './assets/icons/fast_icon.png');
    this.load.image('gore', './assets/icons/gore_icon.png');
    this.load.image('precision', './assets/icons/strike_icon.png');
    this.load.image('shout', './assets/icons/shout_icon.png');
    this.load.image('intimidate', './assets/icons/earth_column.png');
    this.load.image('hobble', './assets/icons/fire_sword_icon.png');

    // mage:
    this.load.image('wand', './assets/icons/wand.png');
    this.load.image('intellect', './assets/icons/eye_icon.png');
    this.load.image('missiles', './assets/icons/frost_ball.png');
    this.load.image('frostbolt', './assets/icons/ice_arrow_icon.png');
    this.load.image('poly', './assets/icons/poly_icon.png');

    //priest:
    this.load.image('heal', './assets/icons/heart_icon.png');
    this.load.image('renew', './assets/icons/renew_icon.png');

    // large item bg's:
    this.load.image('brown-bg', 'assets/items/brown_bg.png');
    this.load.image('green-bg', 'assets/items/green_bg.png');
    this.load.image('yellow-bg', 'assets/items/yellow_bg.png');
    this.load.image('blue-bg', 'assets/items/blue_bg.png');
    this.load.image('purple-bg', 'assets/items/purple_bg.png');
    this.load.image('red-bg', 'assets/items/red_bg.png');
    this.load.image('grey-bg', 'assets/items/grey_bg.png');

    // small item bg's:
    this.load.image('brown-sm-bg', 'assets/items/brown_small_bg.png');
    this.load.image('green-sm-bg', 'assets/items/green_small_bg.png');
    this.load.image('yellow-sm-bg', 'assets/items/yellow_small_bg.png');
    this.load.image('blue-sm-bg', 'assets/items/blue_small_bg.png');
    this.load.image('purple-sm-bg', 'assets/items/purple_small_bg.png');
    this.load.image('red-sm-bg', 'assets/items/red_small_bg.png');
    this.load.image('grey-sm-bg', 'assets/items/grey_small_bg.png');

    // items:
    for (let i = 1; i < 109; i++) {
      if (i < 10) {
        this.load.image('item-0' + i, './assets/items/icon_0' + i + '.png');
      } else {
        this.load.image('item-' + i, './assets/items/icon_' + i + '.png');
      }
    }

    this.load.image('nature-ball', './assets/anims/nature_ball.png');
    this.load.image('frost-ball', './assets/anims/frost_ball.png');
    this.load.image('fire-ball', './assets/anims/fire_ball.png');
    this.load.image('arcane-ball', './assets/anims/arcane_ball.png');
    this.load.image('shadow-ball', './assets/anims/shadow_ball.png');


    this.load.image('inventory', './assets/icons/backpack_icon.png');
    this.load.image('quest', './assets/icons/book_icon.png');
    this.load.image('equipment', './assets/icons/equip_icon.png');
    this.load.image('quest-marker', './assets/icons/quest.png');
    this.load.image('barbarian-trainer-marker', './assets/icons/barbarian_trainer.png');

    // ui:
    this.load.image('ui', './assets/ui/ui.png');
    this.load.image('dialogueBox', './assets/ui/dialogue.png');
    this.load.image('questLog', './assets/ui/quest_log.png');
    this.load.image('inventory-background', './assets/ui/inventory.png');
    this.load.image('equipment-background', './assets/ui/equipment.png');
    this.load.image('loot-box-background', './assets/ui/loot_box.png');

    // duplicates:
    this.load.image('green-quest', './assets/ui/green_quest_background.png');
    this.load.image('yellow-quest', './assets/ui/yellow_quest_background.png');
    this.load.image('red-quest', './assets/ui/red_quest_background.png');

    // character selection screen:
    this.load.image('character-select', './assets/ui/character_selection.png');

    this.load.on('progress', function (value) {
      progressBar.clear();
      progressBar.fillStyle(0xbf7b3f, 1);
      progressBar.fillRect(390, 280, 500 * value, 30);
    });


    // load event:
    this.load.on('complete', ()=> {
      loadingText.destroy();
      progressBar.destroy();
      progressBox.destroy();
      this.scene.start('CharacterSelectionScene')
    })

  }

}
