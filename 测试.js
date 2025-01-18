document.getElementById('container').addEventListener('click', function(event) {
  // 创建小球元素
  var ball = document.createElement('div');
  ball.classList.add('ball');

  // 设置小球初始位置
  var x = event.clientX - 10;
  var y = event.clientY - 10;
  ball.style.left = x + 'px';
  ball.style.top = y + 'px';

  // 随机生成彩色半透明背景颜色
  var randomColor = '#' + Math.floor(Math.random()*16777215).toString(16); // 生成随机颜色
  ball.style.backgroundColor = `rgba(${parseInt(randomColor.slice(1,3),16)},${parseInt(randomColor.slice(3,5),16)},${parseInt(randomColor.slice(5,7),16)},0.7)`; // 设置背景颜色为随机彩色且半透明

  // 将小球添加到容器中
  document.getElementById('container').appendChild(ball);

  // 定义小球的运动方向和速度
  var dx = Math.random() * 4 - 2;
  var dy = Math.random() * 4 - 2;

  function moveBall() {
    // 更新小球位置
    x += dx;
    y += dy;

    // 检查并处理小球碰到屏幕边缘的情况
    if (x <= 0 || x >= window.innerWidth - 20) {
      dx = -dx;
    }
    if (y <= 0 || y >= window.innerHeight - 20) {
      dy = -dy;
    }

    // 应用新位置
    ball.style.left = x + 'px';
    ball.style.top = y + 'px';

    // 请求下一帧继续移动小球
    requestAnimationFrame(moveBall);
  }

  // 开始移动小球
  moveBall();
});