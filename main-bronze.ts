/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

// 1 UP
// 2 LEFT
// 3 DOWN
// 4 RIGHT

class MiniGame {
  private gpu: string;
  private reg0: number;
  private reg1: number;
  private reg2: number;
  private reg3: number;
  private reg4: number;
  private reg5: number;
  private reg6: number;

  constructor(
    gpu: string,
    r0: number,
    r1: number,
    r2: number,
    r3: number,
    r4: number,
    r5: number,
    r6: number,
  ) {
    this.gpu = gpu;
    this.reg0 = r0;
    this.reg1 = r1;
    this.reg2 = r2;
    this.reg3 = r3;
    this.reg4 = r4;
    this.reg5 = r5;
    this.reg6 = r6;
  }

  getMap(): string {
    return this.gpu;
  }

  getReg0(): number {
    return this.reg0;
  }

  getReg1(): number {
    return this.reg1;
  }

  getReg2(): number {
    return this.reg2;
  }

  getReg3(): number {
    return this.reg3;
  }

  getReg4(): number {
    return this.reg4;
  }

  getReg5(): number {
    return this.reg5;
  }

  getReg6(): number {
    return this.reg6;
  }
}

function miniGame1(game: MiniGame): number {
  const distanceWithOps =
    game.getMap().indexOf('#', game.getReg0()) - game.getReg0();
  return distanceWithOps < 0 ? 1337 : distanceWithOps;
}

function miniGame2(game: MiniGame): number {
  const windStrength = parseInt(game.getMap()[0], 10);

  if (windStrength > 9) return -1;

  if (Math.abs(game.getReg0()) > Math.abs(game.getReg1())) {
    return game.getReg0() > 0 ? 2 : 4;
  }
  return game.getReg1() > 0 ? 1 : 3;
}

function translatePlay(play: string): number {
  if (play === 'U') return 1;
  if (play === 'L') return 2;
  if (play === 'D') return 3;
  return 4;
}

function miniGame3(game: MiniGame): number {
  const noRisk = game.getMap()[1];
  return translatePlay(noRisk);
}

function miniGame4(game: MiniGame): number {
  return translatePlay(game.getMap()[0]);
}

function distance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function bestPlay(games: MiniGame[], isResetting: number): number {
  const bestMg1 = miniGame1(games[0]);
  const bestMg2 = miniGame2(games[1]);
  const bestMg4 = miniGame4(games[3]);

  const distancePAim = distance(games[1].getReg0(), games[1].getReg1(), 0, 0);
  const distanceE0Aim = distance(games[1].getReg2(), games[1].getReg3(), 0, 0);
  const distanceE1Aim = distance(games[1].getReg4(), games[1].getReg5(), 0, 0);

  console.error(`IS RESETTING ${isResetting} mg1 ${bestMg1} mg2 ${bestMg2}`);

  if (
    games[0].getReg0() < games[0].getReg1() &&
    games[0].getReg0() < games[0].getReg2()
  ) {
    return bestMg1;
  }
  if (isResetting === 1) {
    isResetting = 0;
    if (games[0].getReg3() === 0) {
      return bestMg2;
    }
    return bestMg1;
  }
  if (games[3].getMap().length === 1) {
    isResetting = 1;
  }
  return bestMg4;
}

const playerIdx: number = parseInt(readline());
const nbGames: number = parseInt(readline());

// game loop
while (true) {
  const games: MiniGame[] = new Array(4)
    .fill(null)
    .map(() => new MiniGame('0', 0, 0, 0, 0, 0, 0, 0));
  let isResetting = 0;

  for (let i = 0; i < 3; i++) {
    const scoreInfo = readline();
    // process scoreInfo if needed
  }

  for (let i = 0; i < nbGames; i++) {
    const [gpu, reg0, reg1, reg2, reg3, reg4, reg5, reg6] =
      readline().split(' ');
    games[i] = new MiniGame(
      gpu,
      parseInt(reg0),
      parseInt(reg1),
      parseInt(reg2),
      parseInt(reg3),
      parseInt(reg4),
      parseInt(reg5),
      parseInt(reg6),
    );
  }

  const bestMove = bestPlay(games, isResetting);
  console.error(`${games[3].getMap().length} isResting ${isResetting}`);

  if (bestMove === 1) console.log('UP');
  else if (bestMove === 2) console.log('LEFT');
  else if (bestMove === 3) console.log('DOWN');
  else console.log('RIGHT');
}
