Hooks.on('renderTileHUD', (tileHUD, html, options) => {
  console.log(tileHUD)

  /*
   let tileID = tileHUD.object.data._id;
  let tileImg = tileHUD.object.data.img;
  let tileX = tileHUD.object.data.x
  let tileY = tileHUD.object.data.y
  let tileZ = tileHUD.object.data.z
  let tileW = tileHUD.object.data.width
  let tileH = tileHUD.object.data.height 
  */

  let cardId = options.flags?.world['card-id'];
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
    discardCard(tileHUD.object.data)
  })
})

const flipCard = async (tileData) => {
  // Get the card
  // Determine new time img
  // Create New tile
  // Delete old tile
}

const takeCard = async () => {
  // Add Card to Card Hotbar
  // Delete Tile
}

const discardCard = async () => {
  // Add Card to Discard for the Deck
  // Delete Tile
}