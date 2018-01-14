import utils from './utils';
import findBall, { getTimes, generateBalls } from './findBall';
import './index.css';

function printLog(string) {
  const text = `${string}`;
  const div = document.createElement('div');
  div.style.textAlign = 'center';

  const span = document.createElement('span');
  span.innerText = text;

  div.appendChild(span);

  document.getElementById('log').appendChild(div);

  return div;
}

function logProcess(index, weighProcess) {
  const div = printLog(`第${index + 1}次称量：`);
  div.className = 'mt-20';

  printLog(`左边：${weighProcess[index].leftIndex.map(e => e + 1)}`);
  printLog(`右边：${weighProcess[index].rightIndex.map(e => e + 1)}`);
  printLog(`旁边：${weighProcess[index].otherIndex.map(e => e + 1)}`);
}

function getFormula(times) {
  return `(3 ^ ${times} - 3) / 2`;
}

function logNum(ballNum, times, num) {
  const maxBall = utils.getMaxBall(times);
  if (maxBall !== ballNum) {
    printLog(
      `因为 ${getFormula(times - 1)} < ${ballNum} 并且 ${getFormula(
        times,
      )} > ${ballNum}，所以至少要称量 ${times} 次，才可以找到特殊小球，并知其轻重`,
    );
  } else {
    printLog(
      `因为 ${getFormula(
        times,
      )} = ${ballNum}，所以至少要称量 ${times} 次，才可以找到特殊小球，并知其轻重`,
    );
  }
  printLog(`而 ${times} 位三进制正序码，共有 ${maxBall} 个，如果以能够相互转换的三个正序码作为一组，那么有 ${maxBall / 3} 组`).className = 'mt-10';
  const groupNum = [];
  for (let i = 0; i < num.length / 3; i++) {
    groupNum.push(num.slice(i * 3, i * 3 + 3));
  }
  printLog(
    `取其中的 ${num.length / 3} 组：${groupNum
      .map(e => `(${e})`)
      .join(', ')}，依次分配给 ${ballNum} 个球。`,
  ).className = 'mt-10';

  if (ballNum % 3 !== 0) {
    printLog(
      `为了之后的称量准备，小球的数量必须补充为 3 的倍数，所以补充第 ${Object.keys(
        num,
      )
        .slice(ballNum)
        .map(e => parseInt(e, 10) + 1)} 个小球，为其编号 ${num.slice(
        ballNum,
      )}，并假设他们的重量为正常的`,
    ).className = 'mt-10';
  }
}

function isValid(input) {
  const ballNum = parseInt(input.value, 10);
  if (Number.isNaN(ballNum)) {
    alert('请输入数字');
    return false;
  } else if (!input.validity.valid) {
    alert('请输入 3 ~ 999 之间的整数');
    return false;
  }
  return true;
}

function start() {
  const input = document.getElementById('ball-number');
  if (!isValid(input)) {
    return;
  }

  const ballNum = parseInt(input.value, 10);
  const times = getTimes(ballNum);
  const balls = generateBalls(ballNum);

  const {
    theBallIndex, theBallNum, num, weighProcess,
  } = findBall(
    balls,
    times,
  );

  // 打印编号过程
  logNum(ballNum, times, num);

  printLog('开始称重').className = 'mt-20';

  // 打印称量过程与结果
  theBallNum.split('').forEach((n, i) => {
    logProcess(i, weighProcess);
    if (n === '0') {
      printLog('结果：左边重，记 0');
    } else if (n === '2') {
      printLog('结果：右边重，记 2');
    } else if (n === '1') {
      printLog('结果：一样重，记 1');
    }
  });

  const index = num.find(e => e === theBallNum);
  let div;
  // 判断是否为正序码
  if (index) {
    div = printLog(
      `那么特殊小球的编号为 ${theBallNum}，所以它的序号为：${theBallIndex +
        1}，比其他小球重`,
    );
  } else {
    div = printLog(
      `那么特殊小球的编号为 ${theBallNum}，是一个逆序码，转为正序码为${utils.getReverseNum(
        theBallNum,
      )}，所以它的序号为：${theBallIndex + 1}，比其他小球轻`,
    );
  }
  div.className = 'mt-20';
}

function clearLog() {
  const div = document.getElementById('log');
  while (div.lastChild) {
    div.removeChild(div.lastChild);
  }
}

function init() {
  document.getElementById('start').onclick = () => {
    clearLog();
    start();
  };
}

init();

// // 全部小球的个数, 取值为 3 ~ 999
// const ballNum = 12;

// // 通过小球数量计算得到的需要的次数
// const times = getTimes(ballNum);

// // 随机生成一组小球, 其中有一个为特殊小球
// const balls = generateBalls(ballNum);

// // 最终找到的特殊小球在 balls 中的索引值
// const { theBallIndex, isWeight } = findBall(balls, times);
