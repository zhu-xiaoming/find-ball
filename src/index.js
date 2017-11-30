import findBall, { getTimes, generateBalls } from './findBall';


// 全部小球的个数, 取值为 3 ~ 999
const ballNum = 12;

// 正常小球的重量
const ball = 1;

// 特殊小球的重量
const theBall = 0;

// 通过小球数量计算得到的需要的次数
const times = getTimes(ballNum);

// 随机生成一组小球, 其中有一个为特殊小球
const balls = generateBalls(ball, theBall, ballNum);

const theBallNum = findBall(balls, times);

// console.log(balls);
// console.log(times);
// console.log(theBallNum);
