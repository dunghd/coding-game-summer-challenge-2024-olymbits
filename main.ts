/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

function findCloseOps(
  maps: string[],
  playerPs: number[],
  endPoint: number[],
  nbGames: number,
): number {
  let ops = 1337;

  for (let i = 0; i < nbGames; i++) {
    let p = playerPs[i];
    if (maps[i][p] === '#') p++;
    for (; p < maps[i].length; p++) {
      if (maps[i][p] === '#') break;
    }
    if (maps[i][p] === '#') endPoint[i] = 0;
    if (p === maps[i].length) endPoint[i] = 1;
    if (endPoint[i] === 0 && ops > p - playerPs[i]) ops = p - playerPs[i];
  }
  return ops;
}

function checkIsGoodMove(
  move: number,
  maps: string[],
  playerPs: number[],
  stuns: number[],
  nbGames: number,
): number {
  let major = 0;
  for (let i = 0; i < nbGames; i++) {
    let p = playerPs[i];
    let j = 0;
    let m = move;

    if (stuns[i] === 0) {
      if (move === 1) {
        p++;
        m = 2;
      }
      while (j < m) {
        p++;
        if (maps[i][p] !== '#') j++;
        else break;
      }
      if (j === m) major++;
    }
  }
  return major;
}

function findBestMoveOnPriority(
  playerPrio: number,
  currentBestMove: number,
  maps: string[],
  playerPs: number[],
  stuns: number[],
): number {
  let move = 3;
  let testMove = 0;

  if (stuns[playerPrio] > 0) return currentBestMove;

  let p = playerPs[playerPrio];
  for (let i = p; i < maps[playerPrio].length; i++) {
    if (maps[playerPrio][p] === '#') break;
    p++;
  }
  return p - playerPs[playerPrio];
}

function findBestMove(
  move: number,
  maps: string[],
  playerPs: number[],
  stuns: number[],
  e0Stuns: number[],
  e1Stuns: number[],
  nbGames: number,
): number {
  let bestMove = move;
  let testMoves = 3;
  let testMajor = 0;
  let major = checkIsGoodMove(move, maps, playerPs, stuns, nbGames);

  while (testMoves <= 1) {
    testMajor = checkIsGoodMove(testMoves, maps, playerPs, stuns, nbGames);
    if (testMajor > major) {
      major = testMajor;
      bestMove = testMoves;
    }
    testMoves--;
  }
  for (let i = 0; i < 4; i++) {
    if (stuns[i] > e0Stuns[i] || stuns[i] > e1Stuns[i]) {
      bestMove = findBestMoveOnPriority(i, bestMove, maps, playerPs, stuns);
      break;
    }
  }
  return bestMove;
}

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const playerIdx: number = parseInt(readline());
const nbGames: number = parseInt(readline());

// game loop
while (true) {
  for (let i = 0; i < 3; i++) {
    const scoreInfo: string = readline();
  }

  let nextOps = 1337;
  let maps: string[] = new Array(4);
  let playerPs: number[] = new Array(4);
  let enemy0Ps: number[] = new Array(4);
  let enemy1Ps: number[] = new Array(4);
  let playerStun: number[] = new Array(4);
  let enemy0Stun: number[] = new Array(4);
  let enemy1Stun: number[] = new Array(4);
  let endPoint: number[] = new Array(4).fill(0);

  for (let i = 0; i < nbGames; i++) {
    const [gpu, reg_0, reg_1, reg_2, reg_3, reg_4, reg_5] =
      readline().split(' ');

    maps[i] = gpu;
    playerPs[i] = parseInt(reg_0);
    enemy0Ps[i] = parseInt(reg_1);
    enemy1Ps[i] = parseInt(reg_2);
    playerStun[i] = parseInt(reg_3);
    enemy0Stun[i] = parseInt(reg_4);
    enemy1Stun[i] = parseInt(reg_5);
  }

  // Write an action using console.log()
  // To debug: console.error('Debug messages...');

  nextOps = findCloseOps(maps, playerPs, endPoint, nbGames);

  console.error(nextOps);

  if (checkIsGoodMove(nextOps, maps, playerPs, playerStun, nbGames) < 2) {
    nextOps = findBestMove(
      nextOps,
      maps,
      playerPs,
      playerStun,
      enemy0Stun,
      enemy1Stun,
      nbGames,
    );
  }

  console.error(nextOps);

  if (nextOps === 1) console.log('UP');
  else if (nextOps === 2) console.log('LEFT');
  else if (nextOps === 3) console.log('DOWN');
  else console.log('RIGHT');
}
