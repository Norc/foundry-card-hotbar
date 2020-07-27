export class CoreHotbarSettingsForm extends FormApplication {

    constructor(object, options = {}) {
        super(object, options);
    }

    /**
    * Default Options for this FormApplication
    */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "core-hotbar-settings-form",
            title: "(𝗚𝗠 𝗢𝗻𝗹𝘆) Set Default Global Core Hotbar",
            template: "./modules/card-hotbar/templates/coreHotbarSettings.html",
            classes: ["sheet"],
            width: 500,
            closeOnSubmit: true
        });
    }

    getData() {
        let data = {        
            corePrimaryColor: game.settings.get("card-hotbar", "corePrimaryColor"), 
            coreBorderColor: game.settings.get("card-hotbar", "coreBorderColor"),
            coreBorderColorActive: game.settings.get("card-hotbar", "coreBorderColorActive"),
            coreBorderColorInactive: game.settings.get("card-hotbar", "coreBorderColorInactive"),

            coreXPos: game.settings.get("card-hotbar", "coreXPos"),
            coreYPos: game.settings.get("card-hotbar", "coreYPos")
        };
        if (this.reset == true) {
            data = {    
                corePrimaryColor: game.settings.settings.get("card-hotbar.corePrimaryColor").default,
                coreBorderColor: game.settings.settings.get("card-hotbar.coreBorderColor").default,
                coreBorderColorActive: game.settings.settings.get("card-hotbar.coreBorderColorActive").default,
                coreBorderColorInactive: game.settings.settings.get("card-hotbar.coreBorderColorInactive").default,

                coreXPos: game.settings.settings.get("card-hotbar.coreXPos").default,
                coreYPos: game.settings.settings.get("card-hotbar.coreYPos").default
            };
        }
        this.render;
        return data;
    }

    /** 
     * Executes on form submission.
     * @param {Object} e - the form submission event
     * @param {Object} d - the form data
     *
     *  'name': entry.metadata.label+' ['+entry.metadata.package+']',
     *  'type':'pack',
     *  'submenu':submenu.toLowerCase(),
     *  'key':entry.metadata.package+'.'+entry.metadata.name
     */

    async _updateObject(e, d) {
        console.debug("card Hotbar | Attempting to update settings with form values...");
        game.settings.set("card-hotbar", "corePrimaryColor", d.corePrimaryColor);
        game.settings.set("card-hotbar", "coreBorderColor", d.coreBorderColor);
        game.settings.set("card-hotbar", "coreBorderColorActive", d.coreBorderColorActive);
        game.settings.set("card-hotbar", "coreBorderColorInactive", d.coreBorderColorInactive);
        game.settings.set("card-hotbar", "coreXPos", d.coreXPos);
        game.settings.set("card-hotbar", "coreYPos", d.coreYPos);
        this.render();
        ui.notifications.notify("Saving... Please refresh Foundry to apply changes.");                                                     
    }

    onReset() {
        console.debug("card Hotbar | Attempting to reset coreSettingsForm to defaults");
        this.reset = true;
        this.render();
    }

    onCorePrimaryColorClick() {
        console.debug("card Hotbar | corePrimaryColor button click detected");
        $( event.target ).addClass("expanded");
    }

    onCoreBorderColorClick() {
        console.debug("card Hotbar | coreBorderColor button click detected");
        $( event.target ).addClass("expanded");
    }

    onCoreBorderColorActiveClick() {
        console.debug("card Hotbar | coreBorderColorActive button click detected");
        $( event.target ).addClass("expanded");
    }

    onCoreBorderColorInactiveClick() {
        console.debug("card Hotbar | coreBorderColorInactive button click detected");
        $( event.target ).addClass("expanded");
    }

    activateListeners(html) {
        console.debug("card Hotbar | Attempting to activate Core Settings Form listeners");
        super.activateListeners(html);
        //bind buttons and inputs 
        html.find('button[name="reset"]').on('click', this.onReset.bind(this));
        html.find('input[name="corePrimaryColor"]').on('click',this.onCorePrimaryColorClick.bind(this));
        html.find('input[name="coreBorderColor"]').on('click',this.onCoreBorderColorClick.bind(this));
        html.find('input[name="coreBorderColorActive"]').on('click',this.onCoreBorderColorActiveClick.bind(this));
        html.find('input[name="coreBorderColorInactive"]').on('click',this.onCoreBorderColorInactiveClick.bind(this));
        this.reset = false;
    }
}

Hooks.on("renderCoreHotbarSettingsForm", (a, b, c) => {
    console.debug( "card Hotbar | Initializing current color values..." );
    $( "#corePrimaryColorSplash" ).css("background-color", c.corePrimaryColor);
    $( "#coreBorderColorSplash" ).css("background-color", c.coreBorderColor);
    $( "#coreBorderColorActiveSplash" ).css("background-color", c.coreBorderColorActive);
    $( "#coreBorderColorInactiveSplash" ).css("background-color", c.coreBorderColorInactive);
});

Hooks.on("pickerDone", (parentDiv, hexColor) => {
    console.debug("card Hotbar | pickerDone hook detected");
    $( parentDiv ).find("input").removeClass("expanded");
    $( parentDiv ).css("background-color", hexColor);
});