/*
 * NOTES
 *
 * High level goals - Kill everyone on other team or get more diamonds
 *
 * Movement choices - "North", "South", "East", "West", "Stay"
 *
 * MAX HEALTH: 100
 *
 * Mined are owned. Each turn you own a mind is 1 diamond
 *
 * When moving
 *  1) If target tile is grave, rob it
 *  2) If target diamond, captured but take 20 damage
 *  3) If target is health, receive 30 health
 *  4) If target is enemy, deal 10 damage
 *  5) If target is friend, heal 40
 *
 * After moving
 *  1) 20 damage to each enemy in an adjacent tile
 */
var healSafely = function(gameData, helpers) {
  var myHero = gameData.activeHero;

  var x = myHero.distanceFromLeft;
  var y = myHero.distanceFromTop;

  //Get stats on the nearest health well
  var healthWellStats = helpers.findNearestObjectDirectionAndDistance(gameData.board, myHero, function(boardTile) {
    if (boardTile.type === 'HealthWell') {
      return true;
    }
  });

  var distanceToHealthWell = healthWellStats.distance;
  var directionToHealthWell = healthWellStats.direction;

  if (helpers.willMoveResultInAdjacentEnemies(gameData, directionToHealthWell)) {
    console.log("DANGEROUS MOVE I'M MAKING!");
  } else {
    console.log("SAFE MOVE");
  }

  return directionToHealthWell;
};

var move = function(gameData, helpers) {
  var myHero = gameData.activeHero;

  if (myHero.health < 40) {
    //Heal no matter what if low health
    return healSafely(gameData, helpers);
  } else {
    //If healthy, go capture a diamond mine!
    return helpers.findNearestNonTeamDiamondMine(gameData);
  }
};

// Export the move function here
module.exports = move;
