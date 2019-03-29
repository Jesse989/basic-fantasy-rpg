import CONST from '../Const';

const QUEST_LIST_X = -256;
const QUEST_LIST_Y = -156;

const TITLE_SIZE = 16;
const DESCRIPTION_SIZE = 16;
const STATUS_SIZE = 16;

function selectQuest(scene, quest) {
  // set active indicator for quest list:
  clearQuestLog(scene);

  const questLogBackground = scene.add.image( 0, 0, 'questLog');
  questLogBackground.scaleX = CONST.SCALE;
  questLogBackground.scaleY = CONST.SCALE;

  const questDescription = scene.add.bitmapText( 48,-178, 'font', quest.description, DESCRIPTION_SIZE);
  const questStatus = scene.add.bitmapText( 48, 128, 'font', `${quest.getType()} ${quest.getCount()} ${quest.getUIName()}`, STATUS_SIZE);

  scene.questLogContainer.add([questLogBackground, questDescription, questStatus])

}

function clearQuestLog(scene) {
  scene.questLogContainer.removeAll(true);

}

function loadQuestLog(scene, quests) {


  const questLogBackground = scene.add.image( 0, 0, 'questLog');
  questLogBackground.scaleX = CONST.SCALE;
  questLogBackground.scaleY = CONST.SCALE;
  scene.questLogContainer.add(questLogBackground);

  quests.forEach(quest => {
    if (quest.isActive()) {
      selectQuest(scene, quest);
    }
  })

  let _x = QUEST_LIST_X;
  let _y = QUEST_LIST_Y;
  const _yIncrement = 76;

  if (!quests[0]) return;


  quests.forEach(quest => {


    // add background:
    const difficultyColor = quest.getColor();
    const bg = scene.add.image(_x, _y, difficultyColor + "-quest");
    // add text:
    const title = scene.add.bitmapText(bg.x, bg.y, 'font', quest.title, TITLE_SIZE)
      .setOrigin(0.5)
    bg.scaleX = CONST.SCALE;
    bg.scaleY = CONST.SCALE;
    scene.questLogContainer.add(bg);
    scene.questLogContainer.add(title);

    _y += _yIncrement;

  })


}




export { selectQuest, clearQuestLog, loadQuestLog }