import utils from './utils';

function generateBalls(ballNum, ballWeight, theBallWeight) {
  const balls = [];
  for (let i = 0; i < ballNum; i++) {
    balls.push(ballWeight);
  }
  const index = utils.getRandomInt(ballNum);
  balls.splice(index, 1, theBallWeight);

  return balls;
}

function isTimes(times, ballNumbar) {
  return (
    utils.getMaxBall(times) >= ballNumbar &&
    utils.getMaxBall(times - 1) < ballNumbar
  );
}

function getTimes(ballNumbar) {
  let result = utils.getMathLog(ballNumbar * 2 + 3, 3);
  if (Number.isInteger(result)) {
    return result;
  }
  result = Math.floor(result);
  if (isTimes(result, ballNumbar)) {
    return result;
  } else if (isTimes(result - 1, ballNumbar)) {
    return result - 1;
  } else if (isTimes(result + 1, ballNumbar)) {
    return result + 1;
  }
}

// 分配编码
function setNum(balls, times) {
  const len = balls.length;
  const zeroNum = utils.generateZeroNum(times);
  let result = [];
  const t = Math.floor(len / 3);
  const num = zeroNum.slice(0, t);
  num.forEach((e) => {
    result = result.concat(utils.getGroupNum(e));
  });
  if (len % 3 === 1) {
    const n0 = zeroNum.slice(t, t + 1)[0].split('');
    result.push(n0.map(utils.convertFunc).join(''));
    result.push(n0.join(''));
    result.push(n0
      .map(utils.convertFunc)
      .map(utils.convertFunc)
      .join(''));
  } else if (len % 3 === 2) {
    const n0 = zeroNum.slice(t, t + 1)[0].split('');
    result.push(n0.join(''));
    result.push(n0
      .map(utils.convertFunc)
      .map(utils.convertFunc)
      .join(''));
    result.push(n0.map(utils.convertFunc).join(''));
  }

  return result;
}

// 称重
function weigh(balls, times, num, ballWeight) {
  const result = [];

  for (let i = 0; i < times; i++) {
    const left = [];
    const right = [];
    num.forEach((e, index) => {
      if (e[i] === '0') {
        left.push(index);
      } else if (e[i] === '2') {
        right.push(index);
      }
    });
    const reduceFunc = (pre, curr) => {
      const currWeight = balls[curr] === undefined ? ballWeight : balls[curr];

      return pre + currWeight;
    };

    const leftWeight = left.reduce(reduceFunc, 0);
    const rightWeight = right.reduce(reduceFunc, 0);

    if (leftWeight > rightWeight) {
      result.push('0');
      console.log(`第${i + 1}次称量：左边重`);
    } else if (leftWeight < rightWeight) {
      result.push('2');
      console.log(`第${i + 1}次称量：右边重`);
    } else if (leftWeight === rightWeight) {
      result.push('1');
      console.log(`第${i + 1}次称量：一样重`);
    }
  }

  return result;
}

function findBall(balls, times, ballWeight) {
  // 编号
  const num = setNum(balls, times);

  // 称量
  const result = weigh(balls, times, num, ballWeight);

  // 找到小球
  let theNum = result.join('');
  const index = num.findIndex(e => e === theNum);
  if (index >= 0) {
    return index;
  }
  theNum = utils.getReverseNum(theNum);
  return num.findIndex(e => e === theNum);
}

export default findBall;
export { generateBalls, getTimes };

// console.log(balls);
// console.log(findBall(balls, times) + 1);
