import { cardHotbarPopulator }  from './scripts/card-hotbar-populator.js';
import { cardHotbar }  from './card-hotbar.js';
import { cardHotbarSettings } from './scripts/card-hotbar-settings.js';

async function cardHotbarInit() {
  console.debug("Card Hotbar | Initializing...");
  window.cardHotbar = new cardHotbarPopulator();
  ui.cardHotbar = new cardHotbar(window.cardHotbar);
  ui.cardHotbar.macros = ui.cardHotbar.getData();
  let obj = {
      left: 100,
      top: 100,
      width: 502,
      height: 52,
      scale: 1.0,
      log: true,
      renderContext: "card-hotbar",
      renderData: "init"
  };


  cardHotbarSettings.register();

  //apply settings styles, first for card hotbar, then for core hotbar
  //For each setting, use flag if present, otherwise use game setting.

   var css =
      '#card-hotbar' 
    + ` { bottom: ${cardHotbarSettings.getCHBYPos()}px; ` 
    + `   left: ${cardHotbarSettings.getCHBXPos()}px; `
    + ' }'
/*
    + '#card-hotbar #card-macro-list' 
    + ` {` 
    + `   border: 1px solid ${cardHotbarSettings.getCHBBorderColor()};`
    + ' }'
*/    
    + '#card-hotbar .bar-controls' 
    + ` { background: ${cardHotbarSettings.getCHBPrimaryColor()};` 
    + `   border: 1px solid ${cardHotbarSettings.getCHBBorderColor()};`
    + ' }'

    + '#card-hotbar .macro' 
    + ` { background: ${cardHotbarSettings.getCHBPrimaryColor()};` 
    + `   border: 1px dashed ${cardHotbarSettings.getCHBBorderColor()};`
    + ' }'

    + '#card-hotbar .macro.active:hover' 
    + ' {' 
    + `     border: 1px solid ${cardHotbarSettings.getCHBBorderColorActive()};`
    + ' }'

    + '#card-hotbar .macro.inactive:hover' 
    + ' {' 
    + `     border: 1px solid ${cardHotbarSettings.getCHBBorderColorInactive()};`
    + ' }'



    + '#hotbar' 
    + ` { bottom: ${cardHotbarSettings.getCoreYPos()}px; ` 
    + `   left: ${cardHotbarSettings.getCoreXPos()}px; `
    + ' }'

    + '#hotbar #card-macro-list' 
    + ` {` 
    + `   border: 1px solid ${cardHotbarSettings.getCoreBorderColor()};`
    + ' }'
    
    + '#hotbar .bar-controls' 
    + ` { background: ${cardHotbarSettings.getCorePrimaryColor()};` 
    + `   border: 1px solid ${cardHotbarSettings.getCoreBorderColor()};`
    + ' }'

    + '#hotbar .macro' 
    + ` { background: ${cardHotbarSettings.getCorePrimaryColor()};` 
    + `   border: 1px solid ${cardHotbarSettings.getCoreBorderColor()};`
    + ' }'

    + '#hotbar .macro.active:hover' 
    + ' {' 
    + `     border: 1px solid ${cardHotbarSettings.getCoreBorderColorActive()};`
    + ' }'

    + '#hotbar .macro.inactive:hover' 
    + ' {' 
    + `     border: 1px solid ${cardHotbarSettings.getCoreBorderColorInactive()};`
    + ' }'
  , head = document.head || document.getElementsByTagName('head')[0]
  , style = document.createElement('style');

  head.appendChild(style);

  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));

  ui.hotbar.render();
  Array.from(document.getElementsByClassName("macro")).forEach(function (element) {
    element.ondragstart = ui.hotbar._onDragStart;
    element.ondragend = ui.hotbar._onDrop;
  });

  await ui.cardHotbar.render(true, obj);
}

Hooks.on("init", async () => {
  CONFIG.ui.hotbar = class extends Hotbar {
    _onDragStart(...arg) {
      document.getElementsByClassName("tooltip")[0].style.display = "none";
      super._onDragStart(...arg);
    }
  };
});

Hooks.on("renderHotbar", async () => {
  console.debug("Card Hotbar | The core hotbar just rendered!");
});

Hooks.on("rendercardHotbar", async () => {
  console.debug("Card Hotbar | The card hotbar just rendered!");
});


Hooks.once('ready', () => {
  console.debug("Card Hotbar | Foundry ready...");

  //Check to make sure that a hotbar rendered before initilizing so that PopOut module windows do not have unwanted card hotbars.
  let hotbarTest = ui.hotbar;
  console.debug("Card Hotbar | Core Foundry Hotbar Present?");
  console.debug(hotbarTest);
 
  if ( hotbarTest ) {
    cardHotbarInit();
  }


});


Hooks.on("renderSettingsConfig", async () => {
  //add CSS ids and classes to cardHotbar settings section for styling
  let settingsDiv = document.getElementById("client-settings");
  
  let chbSetDiv = $( `#${settingsDiv.id} div h2.module-header:contains("card Hotbar")` ).next();
  $(chbSetDiv).addClass('chb-setting');
  $(chbSetDiv).addClass('chb-global');
  $(chbSetDiv).attr('id', 'chbSetDiv');
  
  let coreSetDiv = $(chbSetDiv).next();
  $(coreSetDiv).addClass('chb-setting');
  $(coreSetDiv).addClass('chb-global');
  $(coreSetDiv).attr('id', 'coreSetDiv');

  let chbFlagDiv = $(coreSetDiv).next();
  $(chbFlagDiv).addClass('chb-setting');
  $(chbFlagDiv).addClass('chb-user');
  $(chbFlagDiv).attr('id', 'chbFlagDiv');
  
  let coreFlagDiv = $(chbFlagDiv).next();
  $(coreFlagDiv).addClass('chb-setting');
  $(coreFlagDiv).addClass('chb-user');
  $(coreFlagDiv).attr('id', 'coreFlagDiv');
});

Hooks.on("hotbarDrop", (hotbar, data, slot) => {
  console.debug("Card Hotbar | Creating Macro")
  if (data.type !== "JournalEntry") return true;
  const journal = game.journal.get(data.id);
  if (!journal) return true;
  // Make a new macro for the Journal
  Macro.create({
      name: `Card: ${journal.name}`,
      type: "script",
      scope: "global",
      command: `game.journal.get("${journal.id}").show();`,

      img: `${game.journal.get(journal.id).data.img}`
  }).then(macro => {
      game.user.assignHotbarMacro(macro, slot);
  });
  return false;
});

//FROM MQOL:
/* when fixed replace with Hooks.on("hotbarDrop", hotbarHandler)
Hooks._hooks.hotbarDrop = [hotbarHandler].concat(Hooks._hooks.hotbarDrop || []);
*/

/* NOTE: ERRORS/ISSUES WITH CORE HOTBAR (LOL, SHRUG)
0.6.4, DND 5E 0.93 (ALL MODS DISABLED)

1. file directory to canvas: 
foundry.js:29725 Uncaught (in promise) Error: No available Hotbar slot exists
at User.assignHotbarMacro (foundry.js:29725)
at Canvas._onDrop (foundry.js:11425)
at DragDrop.callback (foundry.js:13785)
at DragDrop._handleDrop (foundry.js:13836)

2. Macro execute for spell, than cancel : uncaught in promise, 5e error?)

3. Drag macro onto itself, it is removed

4. Sometimes when you drag off of core, a ghost set of slots to left and right of core slot is grabbed also. Seems to happen if you click near a border between macro slots.
*/