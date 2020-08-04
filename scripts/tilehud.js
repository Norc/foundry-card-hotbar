Hooks.on('renderTileHUD', (tileHUD, html, options) => {
  console.log(tileHUD)
  console.log(options.flags)
  /*
   let tileID = tileHUD.object.data._id;
  let tileImg = tileHUD.object.data.img;
  let tileX = tileHUD.object.data.x
  let tileY = tileHUD.object.data.y
  let tileZ = tileHUD.object.data.z
  let tileW = tileHUD.object.data.width
  let tileH = tileHUD.object.data.height 
  */

  let cardId = options.flags?.world['cardID'];
  if(!cardId){return;}

  const handDiv = $('<i class="control-icon fa fa-hand-paper" aria-hidden="true" title="Take"></i>')
  const flipDiv = $('<i class="control-icon fa fa-undo" aria-hidden="true" title="Flip"></i>')
  const discardDiv = $('<i class="control-icon fa fa-trash" aria-hidden="true" title="Discard"></i>')

  html.find('.left').append(handDiv);
  html.find('.left').append(flipDiv);
  html.find('.left').append(discardDiv);

  handDiv.click((ev) => {
    takeCard(tileHUD.object.data)
  })

  flipDiv.click((ev) => {
    flipCard(tileHUD.object.data)
  })

  discardDiv.click((ev) => {
    discardCard(cardId, tileHUD.object.data)
  })
})

const flipCard = async (tileData) => {
  // Get the card
  // Determine new time img
  // Create New tile
  // Delete old tile
}

const takeCard = async (tiledata) => {
  // Add Card to Card Hotbar
  // Delete Tile
}

const discardCard = async (cardId, tiledata) => {
  return new Promise((resolve,reject) => {
    // Add Card to Discard for the Deck
    let deckId = game.journal.get(cardId).data.folder;
    console.log("Deck ID: ", deckId);
    game.decks.get(deckId).discardCard(cardId);
    // Delete Tile
    canvas.tiles.get(tiledata._id).delete()
    resolve();
  })
}