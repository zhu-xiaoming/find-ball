// '0' => '1', '1' => '2', '2' => '0'
function convertFunc(e) {
  if (e === '0') {
    return '1';
  } else if (e === '2') {
    return '0';
  }
  return '2';
}

// 得到所有可能的组合, t 为位数，n 为进制数
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
  // return result.map(e => utils.convertNum(e));
}

export default {
  convertFunc,
  getAllNum,
  getRandomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min)) + min;
  },

  // 求一个数的对数, base 为底数，x 为真数
  getMathLog(x, base) {
    return Math.log2(x) / Math.log2(base);
  },

  // 通过称量次数可以分辨的最大的球数
  getMaxBall(times) {
    return (Math.pow(3, times) - 3) / 2;
  },

  // 获取对应的逆序码或者正序码
  getReverseNum(numStr) {
    const n = numStr.split('');
    const reverseNum = n.map((e) => {
      if (e === '0') {
        return '2';
      } else if (e === '2') {
        return '0';
      }
      return e;
    });
    return reverseNum.join('');
  },

  // 获取三个一组的正序码
  getGroupNum(numStr) {
    const n0 = numStr.split('');
    const n1 = n0.map(convertFunc);
    const n2 = n1.map(convertFunc);

    return [n0, n1, n2].map(e => e.join(''));
  },

  // 转换十进制数字为所需的进制, n 为进制
  convertNum(num, n = 3) {
    let t = num;
    let result = '';
    while (t >= n) {
      result = t % n + result;
      t = Math.floor(t / n);
    }
    return parseInt(t + result, 10);
  },

  // 生成首位为 0 的所有组合（除了全为 0 的），n 为进制
  generateZeroNum(times, n) {
    const result = [];
    let t = times;
    if (t < 2) {
      throw new Error('位数必须大于或等于 2');
    }
    if (t === 2) {
      return ['01'];
    }
    function pushNum(e) {
      result.push(`${'0'.repeat(times - t)}01${e}`);
    }
    while (t - 2 > 0) {
      const num = getAllNum(t - 2, n);
      num.forEach(pushNum);
      t -= 1;
    }
    result.push(`${'0'.repeat(times - 2)}01`);
    return result;
  },
};
