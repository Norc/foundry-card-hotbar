export class cardHotbarPopulator {
    constructor() { 
        this.macroMap = this.chbGetMacros();
    }

    addCardToHand(cardId){
        console.debug("Card Hotbar | Adding card to hand...");
        //generate macro for card
        //TODO: better consolidate with code in index.js in hotbarDrop hook (call hook? make function at least?)
        // Make a new macro for the Journal
        let journal = game.journal.get(cardId);
        let newMacro = Macro.create({
            name: `Card: ${journal.name}`,
            type: "script",
            flags: {
            "world": {
                "card-id": `${journal.id}`,
            }
            },
            scope: "global",
            //Change first argument to "text" to show the journal entry as default.
            //NOTE: In order for this macro to work (0.6.5 anyway) there MUST be text (content attribute must not be null).
            command: `game.journal.get("${journal.id}").show("image", false);`,

            img: `${game.journal.get(journal.id).data.img}`
        }).then(macro => {
            game.user.assignHotbarMacro(macro, ui.cardHotbar.getNextSlot());
        });
        console.debug(newMacro);
    }
        

    //TO DO: Create single chbGetMacro function for completeness and convenience.
    
    /**
     * Returns all cardHotbar macros
     * @return {string[]} [slot]: macroId
     */
    chbGetMacros() {
        return game.user.getFlag('card-hotbar', 'chbMacroMap') || [];
    }

    /**
     * Set or replace a macro on one of the card hotbar slots.
     * @param {string} macroId
     * @param {number} slot 
     * @return {Promise<unknown>} Promise indicating whether the macro was set and the hotbar was rendered.
     */
    async chbSetMacro(macroId, slot) {
        console.debug("card Hotbar |", "Setting macro", slot, macroId);
        this.macroMap[slot] = macroId;
        await this._updateFlags();
        return ui.cardHotbar.render();
    }

    /**
     * Replace all card hotbar slots.
     * @param {string[]} macros ([slot]: macroId)
     * @return {Promise<unknown>} Promise indicating whether the macros were set and the hotbar was rendered.
     */
    async chbSetMacros(macros) {
        /**
         * !
         * ! Assumes a single page card hotbar with slots 1-10
         * !
         */
        for (let slot = 1; slot < 11; slot++) {
            this.macroMap[slot] = macros[slot];
        }
        await this._updateFlags();
        return ui.cardHotbar.render();
    }

    /**
     * Remove the macro from the card hotbar slot.
     * @param {number} slot
     * @return {Promise<unknown>} Promise indicating whether the macro was removed.
     */
    chbUnsetMacro(slot) {
        this.macroMap[slot] = null;
        return this._updateFlags();
    }

    /**
     * Remove all macros from the card hotbar.
     * @return {Promise<unknown>} Promise indicating whether the macros were removed.
     */
    chbResetMacros() {
        this.macroMap = [];
        return this._updateFlags();
    }

    async _updateFlags() {
        await game.user.unsetFlag('card-hotbar', 'chbMacroMap');
        return game.user.setFlag('card-hotbar', 'chbMacroMap', this.macroMap);
    }
}
