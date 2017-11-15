// 全部小球的个数, 取值为 3 ~ 999
const ballNum = 7;

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

// 获取对应的逆序码或者正序码
function getReverseNum(numStr) {
  const n = numStr.split('');
  const reverseNum = n.map(e => {
    if (e === '0') {
      return '2';
    } else if (e === '2') {
      return '0';
    }
    return e;
  });
  return reverseNum.join('');
}

// 获取三个一组的正序码
function convertFunc(e) {
  if (e === '0') {
    return '1';
  } else if (e === '2') {
    return '0';
  }
  return '2';
}
function getGroupNum(numStr) {
  const n0 = numStr.split('');
  const n1 = n0.map(convertFunc);
  const n2 = n1.map(convertFunc);

  return [n0, n1, n2].map(e => e.join(''));
}

let count = 0;
function convertNum(num, n = 3) {
  let t = num;
  let result = '';
  while (t >= n) {
    count++;
    result = t % n + result;
    t = Math.floor(t / n);
  }
  return parseInt(t + result);
}

// 得到所有可能的组合
function getAllNum(t, n = 3) {
  const num = '0123456789';
  const allSingleNum = num.slice(0, n).split('');

  const result = [];
  function fn(str) {
    if (str.length === t) {
      result.push(str);
      return str;
    }

    allSingleNum.map(e => `${str}${e}`).map(fn);
  }
  allSingleNum.forEach(fn);
  return result;
  
  // const times = Math.pow(n, t);
  // const result = [0];
  
  // for (let i = 1; i < times; i++) {
  //   count++;
  //   result.push(result[i - 1] + 1);
  // }
  // return result.map(e => convertNum(e));

}

// 生成首位为 0 的所有组合
function generateZeroNum(times) {
  let result = [];
  let t = times;
  if (t - 2 === 0) {
    return ['01', '00'];
  }
  while (t - 2 > 0) {
    const num = getAllNum(t - 2);
    num.forEach((e) => {
      result.push('0'.repeat(times - t) + '01' + e);
    })
    t--;
  }
  result.push('0'.repeat(times - 2) + '01');
  return result;
}

// 分配编码
function setNum(balls, times) {
  const len = balls.length;
  const zeroNum = generateZeroNum(times)
  let result = [];
  if (len % 3 === 0) {
    const t = len / 3;
    const num = zeroNum.slice(0, t);
    num.forEach((e) => {
      result = result.concat(getGroupNum(e))
    });
    return result;
  } else if (len % 3 === 1) {
    const t = Math.floor(len / 3);
    const num = zeroNum.slice(0, t);
    num.forEach((e) => {
      result = result.concat(getGroupNum(e))
    });
    const n0 = zeroNum.slice(t, t + 1)[0].split('');
    result.push(n0.map(convertFunc).join(''))
  } else if (len % 3 === 2) {
    const t = Math.floor(len / 3);
    const num = zeroNum.slice(0, t);
    num.forEach((e) => {
      result = result.concat(getGroupNum(e))
    });
    const n0 = zeroNum.slice(t, t + 1)[0].split('');
    result.push(n0.join(''));
    result.push(n0.map(convertFunc).map(convertFunc).join(''));
  }

  return result;
}

// console.log(setNum(balls, times));

// test
// const nums = getGroupNum('012');

// console.log(nums);

// nums.forEach((e) => {
//   console.log(getReverseNum(e));
// })
