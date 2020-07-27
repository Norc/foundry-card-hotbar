import { cardHotbarSettingsForm } from './card-hotbar-settings-form.js';
import { cardHotbarFlagsForm } from './card-hotbar-flags-form.js';

export class cardHotbarSettings {
    /**
     * Provides functionality for interaction with module settings and Flags
     */

    static register(){
    //Global, GM-only settings menus
        game.settings.registerMenu("card-hotbar", 'chbSettingsMenu', {
            name: '(𝗚𝗠 𝗢𝗻𝗹𝘆) Default card Hotbar Settings for All Users',
            label: 'Global card Hotbar',
            icon: 'fas fa-bars',
            type: cardHotbarSettingsForm,
            restricted: true
        });

        //TO DO: add hotbarPageKeyEnabled and chbKeyEnabled and fix settings window formatting and add to localizations
        /*                                     module        key             options
        game.settings.register("card-hotbar", "chbKeyEnabled", {
            name: "cardHotbar.settings.chbKeyEnabled.name",      // The name of the setting in the settings menu
            hint: "cardHotbar.settings.chKeyEnabled.nameHint",   // A description of the registered setting and its behavior
            label: "Color Picker",         // The text label used in the button
            restricted: false,             // Restrict this setting to gamemaster only?
            config: false,                 // Disable display on the standard Foundry settings menu
            default: "#0000FF80",     // The default color of the setting
            type: String,
            scope: "world",               // The scope of the setting
            config: false,                 // Disable display on the standard Foundry settings menu
            onChange: (value) => {ui.cardHotbar.render();}        // A callback function which triggers when the setting is changed
        })
        */

        //User-only "settings" menu that uses flags instead
        game.settings.registerMenu("card-hotbar", 'chbFlagsMenu', {
            name: 'Your card Hotbar Settings',
            label: 'Your card Hotbar',
            icon: 'fas fa-bars',
            type: cardHotbarFlagsForm,
            restricted: false
        });

        //TO DO: add hotbarPageKeyEnabled and chbKeyEnabled
    
    //card HOTBAR SETTINGS    

        //                                     module        key             options
        game.settings.register("card-hotbar", "chbPrimaryColor", {
            name: "cardHotbar.settings.chbPrimaryColor.name",      // The name of the setting in the settings menu
            hint: "cardHotbar.settings.chbPrimaryColor.nameHint",   // A description of the registered setting and its behavior
            label: "Color Picker",         // The text label used in the button
            restricted: false,             // Restrict this setting to gamemaster only?
            config: false,                 // Disable display on the standard Foundry settings menu
            default: "#0000FF80",     // The default color of the setting
            type: String,
            scope: "world",               // The scope of the setting
            config: false,                 // Disable display on the standard Foundry settings menu
            onChange: (value) => {ui.cardHotbar.render();}        // A callback function which triggers when the setting is changed
        })
     
        //                                     module        key             options
        game.settings.register("card-hotbar", "chbBorderColor", {
            name: "cardHotbar.settings.chbBorderColor.name",      // The name of the setting in the settings menu
            hint: "cardHotbar.settings.chbBorderColor.nameHint",   // A description of the registered setting and its behavior
            label: "Color Picker",         // The text label used in the button
            restricted: false,             // Restrict this setting to gamemaster only?
            default: "#0000FFff",     // The default color of the setting
            type: String,
            scope: "world",               // The scope of the setting
            config: false,                 // Disable display on the standard Foundry settings menu
            onChange: (value) => {ui.cardHotbar.render();}        // A callback function which triggers when the setting is changed
        })

        //                                     module        key             options
        game.settings.register("card-hotbar", "chbBorderColorActive", {
            name: "cardHotbar.settings.chbBorderColorActive.name",      // The name of the setting in the settings menu
            hint: "cardHotbar.settings.chbBorderColorActive.nameHint",   // A description of the registered setting and its behavior
            label: "Color Picker",         // The text label used in the button
            restricted: false,             // Restrict this setting to gamemaster only?
            default: "#ffffffff",     // The default color of the setting
            type: String,
            scope: "world",               // The scope of the setting
            config: false,                 // Disable display on the standard Foundry settings menu
            onChange: (value) => {ui.cardHotbar.render();}        // A callback function which triggers when the setting is changed
        })  

        //                                     module        key             options
        game.settings.register("card-hotbar", "chbBorderColorInactive", {
            name: "cardHotbar.settings.chbBorderColorInactive.name",      // The name of the setting in the settings menu
            hint: "cardHotbar.settings.chbBorderColorInactive.nameHint",   // A description of the registered setting and its behavior
            label: "Color Picker",         // The text label used in the button
            restricted: false,             // Restrict this setting to gamemaster only?
            default: "#808080ff",     // The default color of the setting
            type: String,
            scope: "world",               // The scope of the setting
            config: false,                 // Disable display on the standard Foundry settings menu
            onChange: (value) => {ui.cardHotbar.render();}        // A callback function which triggers when the setting is changed
        })   

        game.settings.register("card-hotbar", "chbXPos", {
            name: "cardHotbar.settings.chbXPos.name",
            hint: "cardHotbar.settings.chbXPos.nameHint",
            scope: "world",
            config: false,
            default: "220",
            type: Number,
            onChange: value => {
                ui.cardHotbar.render();
            }
        }); 

        game.settings.register("card-hotbar", "chbYPos", {
            name: "cardHotbar.settings.chbYPos.name",
            hint: "cardHotbar.settings.chbYPos.nameHint",
            scope: "world",
            config: false,
            default: "63",
            type: Number,
            onChange: value => {
                ui.cardHotbar.render();
            }
        }); 

        //Add ZPos set to uneditable?

    //CORE HOTBAR SETTINGS
        //                                     module        key             options
        game.settings.register("card-hotbar", "corePrimaryColor", {
            name: "cardHotbar.settings.corePrimaryColor.name",      // The name of the setting in the settings menu
            hint: "cardHotbar.settings.corePrimaryColor.nameHint",   // A description of the registered setting and its behavior
            label: "Color Picker",         // The text label used in the button
            restricted: false,             // Restrict this setting to gamemaster only?
            default: "#00000080",     // The default color of the setting
            type: String,
            scope: "world",               // The scope of the setting
            config: false,                 // Disable display on the standard Foundry settings menu
            onChange: (value) => {ui.hotbar.render();}        // A callback function which triggers when the setting is changed
        })
     
        //                                     module        key             options
        game.settings.register("card-hotbar", "coreBorderColor", {
            name: "cardHotbar.settings.coreBorderColor.name",      // The name of the setting in the settings menu
            hint: "cardHotbar.settings.coreBorderColor.nameHint",   // A description of the registered setting and its behavior
            label: "Color Picker",         // The text label used in the button
            restricted: false,             // Restrict this setting to gamemaster only?
            default: "#000000ff",     // The default color of the setting
            type: String,
            scope: "world",               // The scope of the setting
            config: false,                 // Disable display on the standard Foundry settings menu
            onChange: (value) => {ui.hotbar.render();}        // A callback function which triggers when the setting is changed
        })

        //                                     module        key             options
        game.settings.register("card-hotbar", "coreBorderColorActive", {
            name: "cardHotbar.settings.coreBorderColorActive.name",      // The name of the setting in the settings menu
            hint: "cardHotbar.settings.coreBorderColorActive.nameHint",   // A description of the registered setting and its behavior
            label: "Color Picker",         // The text label used in the button
            restricted: false,             // Restrict this setting to gamemaster only?
            default: "#ff6400",     // The default color of the setting
            type: String,
            scope: "world",               // The scope of the setting
            config: false,                 // Disable display on the standard Foundry settings menu
            onChange: (value) => {ui.hotbar.render();}        // A callback function which triggers when the setting is changed
        })

        //                                     module        key             options
        game.settings.register("card-hotbar", "coreBorderColorInactive", {
            name: "cardHotbar.settings.coreBorderColorInactive.name",      // The name of the setting in the settings menu
            hint: "cardHotbar.settings.coreBorderColorInactive.nameHint",   // A description of the registered setting and its behavior
            label: "Color Picker",         // The text label used in the button
            restricted: false,             // Restrict this setting to gamemaster only?
            default: "#939799ff",     // The default color of the setting
            type: String,
            scope: "world",               // The scope of the setting
            config: false,                 // Disable display on the standard Foundry settings menu
            onChange: (value) => {ui.hotbar.render();}        // A callback function which triggers when the setting is changed
        })   

        game.settings.register("card-hotbar", "coreXPos", {
            name: "cardHotbar.settings.coreXPos.name",
            hint: "cardHotbar.settings.coreXPos.nameHint",
            scope: "world",
            config: false,
            default: "220",
            type: Number,
            onChange: value => {
                ui.hotbar.render();
            }
        }); 

        game.settings.register("card-hotbar", "coreYPos", {
            name: "cardHotbar.settings.coreYPos.name",
            hint: "cardHotbar.settings.coreYPos.nameHint",
            scope: "world",
            config: false,
            default: "10",
            type: Number,
            onChange: value => {
                ui.hotbar.render();
            }
        }); 
    }

    //getters that determine whether to grab the user flag or the setting
    //card Hotbar getters
    //refactor into one function with variable for what you are getting when get chance?
    static getCHBPrimaryColor(){
        var flag = game.user.getFlag("card-hotbar", "chbPrimaryColor");
        var sett = game.settings.get("card-hotbar","chbPrimaryColor");
        return (flag) ? flag : sett;
    }

    static getCHBBorderColor(){
        var flag = game.user.getFlag("card-hotbar", "chbBorderColor");
        var sett = game.settings.get("card-hotbar","chbBorderColor");
        return (flag) ? flag : sett;
    }

    static getCHBBorderColorActive(){
        var flag = game.user.getFlag("card-hotbar", "chbBorderColorActive");
        var sett = game.settings.get("card-hotbar","chbBorderColorActive");
        return (flag) ? flag : sett;
    }
    
    static getCHBBorderColorInactive(){
        var flag = game.user.getFlag("card-hotbar", "chbBorderColorInactive");
        var sett = game.settings.get("card-hotbar","chbBorderColorInactive");
        return (flag) ? flag : sett;
    }

    static getCHBXPos(){
        var flag = game.user.getFlag("card-hotbar", "chbXPos");
        var sett = game.settings.get("card-hotbar","chbXPos");
        return (flag) ? flag : sett;
    }

    static getCHBYPos(){
        var flag = game.user.getFlag("card-hotbar", "chbYPos");
        var sett = game.settings.get("card-hotbar","chbYPos");
        return (flag) ? flag : sett;
    }

    //Core Hotbar getters
    static getCorePrimaryColor(){
        var flag = game.user.getFlag("card-hotbar", "corePrimaryColor");
        var sett = game.settings.get("card-hotbar","corePrimaryColor");
        return (flag) ? flag : sett;
    }

    static getCoreBorderColor(){
        var flag = game.user.getFlag("card-hotbar", "coreBorderColor");
        var sett = game.settings.get("card-hotbar","coreBorderColor");
        return (flag) ? flag : sett;
    }

    static getCoreBorderColorActive(){
        var flag = game.user.getFlag("card-hotbar", "coreBorderColorActive");
        var sett = game.settings.get("card-hotbar","coreBorderColorActive");
        return (flag) ? flag : sett;
    }
    
    static getCoreBorderColorInactive(){
        var flag = game.user.getFlag("card-hotbar", "coreBorderColorInactive");
        var sett = game.settings.get("card-hotbar","coreBorderColorInactive");
        return (flag) ? flag : sett;
    }

    static getCoreXPos(){
        var flag = game.user.getFlag("card-hotbar", "coreXPos");
        var sett = game.settings.get("card-hotbar","coreXPos");
        return (flag) ? flag : sett;
    }

    static getCoreYPos(){
        var flag = game.user.getFlag("card-hotbar", "coreYPos");
        var sett = game.settings.get("card-hotbar","coreYPos");
        return (flag) ? flag : sett;
    }
}