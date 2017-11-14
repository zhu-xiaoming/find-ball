// 全部小球的个数, 取值为 3 ~ 999
const ballNum = 12;

// 正常小球的重量
const ball = 1;

// 特殊小球的重量
const theBall = 2;

// 通过小球数量计算得到的需要的次数
const times = getTimes(ballNum);

// 随机生成一组小球, 其中有一个为特殊小球
const balls = (function() {
  const balls = [];
  for (let i = 0; i < ballNum; i++) {
    balls.push(ball);
  }
  const index = getRandomInt(ballNum);
  balls.splice(index, 1, theBall);

  return balls;
})();

function getRandomInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// 求一个数的对数, base 为底数，x 为真数
function getMathLog(x, base) {
  return Math.log2(x) / Math.log2(base);
}

// 通过称量次数可以分辨的最大的球数
function getMaxBall(times) {
  return (Math.pow(3, times) - 3) / 2;
}

function isTimes(times, ballNumbar) {
  return getMaxBall(times) >= ballNumbar && getMaxBall(times - 1) < ballNumbar;
}

function getTimes(ballNumbar) {
  let result = getMathLog(ballNumbar * 2 + 3, 3);
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


