import * as zrender from 'zrender'
import 'zrender/lib/canvas/canvas'

function createGameDisc(windowWidth, that) {
  // 计算圆盘disc图片的展示宽高 图片原始尺寸 1056 * 1326
  let discWidth = windowWidth * 0.9
  let discHeight = (discWidth * 1326) / 1056
  // 扇形
  let discStyle = document.getElementById('turnDisc').style
  // 按钮
  let btnActionStyle = document.getElementById('btnAction').style
  // debugger
  discStyle.width = discWidth + 'px'
  discStyle.height = discHeight + 'px'
  btnActionStyle.top = discWidth / 2 + 1 + 'px'
  btnActionStyle.left = windowWidth / 2 + 'px'

  let zr = zrender.init(document.getElementById('turnDisc'))
  let { Circle, Sector, Image: ZrImage, LinearGradient, Group } = zrender
  //内半径 inRadius ；环直径 ringDiam ；实际背景图宽 1056 ，实际内半径 434 ，实际环直径 94, 发光小圆点中心距离圆心 450
  let cOptions = {
    shape: { cx: discWidth / 2, cy: discWidth / 2, r: (discWidth * 434) / 1056, lightR: (discWidth * 450) / 1035 },
    style: { fill: 'none', stroke: '#00f' }
  }
  let baseCircle = { r: cOptions.shape.lightR, angle: ((360 / 24) * Math.PI) / 180 }
  // 转盘边缘闪烁的小灯渐变色 1淡黄色 2淡蓝色 3扇形黄色 4扇形红色
  let bubbleGradient1 = new LinearGradient(0, 0, 1, 1, [
    { offset: 0, color: '#FFFCD4' },
    { offset: 1, color: '#EDCB4D' }
  ])
  let bubbleGradient2 = new LinearGradient(0, 0, 1, 1, [
    { offset: 0, color: '#E9FBFF' },
    { offset: 1, color: '#E7FCFF' }
  ])
  let bubbleGradient3 = new LinearGradient(0, 0, 1, 1, [
    { offset: 0, color: '#FEBE10' },
    { offset: 0.5, color: '#FFD840' },
    { offset: 1, color: '#CB9116' }
  ])
  let bubbleGradient4 = new LinearGradient(0, 0, 1, 1, [
    { offset: 0, color: '#FE543D' },
    { offset: 0.5, color: '#FD838B' },
    { offset: 1, color: '#CB3816' }
  ])
  let arrowOnPng = require('../../assets/imgs/arrowOn.png')
  let btnStartPng = require('../../assets/imgs/btnStart.png')

  // 抽奖大按钮
  let btnStart = new ZrImage({
    style: {
      image: btnStartPng,
      align: 'left',
      x: discWidth / 2 - 55,
      y: discWidth / 2 - 55,
      width: 110,
      height: 110
    },
    origin: [discWidth / 2, discWidth / 2],
    z: 12
  })
  zr.add(btnStart)

  // 转盘边缘闪烁的小灯
  let bubbleLights = new Group({ origin: [discWidth / 2, discWidth / 2], rotation: 0 })
  Array(24)
    .fill(1)
    .map((item, index) => {
      // 大盘边缘的小圆点
      let circle = new Circle({
        shape: {
          cx: cOptions.shape.cx + baseCircle.r * Math.cos(index * baseCircle.angle),
          cy: cOptions.shape.cy + baseCircle.r * Math.sin(index * baseCircle.angle) + 2,
          r: 3
        },
        style: {
          fill: index % 2 ? bubbleGradient1 : bubbleGradient2,
          shadowBlur: 5,
          shadowColor: '#fff'
        },
        origin: [discWidth / 2, discWidth / 2]
      })
      bubbleLights.add(circle)
    })
  zr.add(bubbleLights)

  // 8个小圆点动画
  let bubbleLightsAnim = new Group({ origin: [discWidth / 2, discWidth / 2 + 2] })
  Array(8)
    .fill(1)
    .map((item, index) => {
      let circle = new Circle({
        shape: {
          cx: cOptions.shape.cx + baseCircle.r * Math.cos(index * baseCircle.angle),
          cy: cOptions.shape.cy + baseCircle.r * Math.sin(index * baseCircle.angle) + 2,
          r: 4
        },
        style: {
          fill: index % 2 ? bubbleGradient1 : bubbleGradient2,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 7,
          shadowColor: '#fff'
        },
        origin: [discWidth / 2, discWidth / 2 + 2],
        rotation: Math.PI / 2
      })
      bubbleLightsAnim.add(circle)
    })
  zr.add(bubbleLightsAnim)
  // 边缘灯光关键帧动画 TODO: 离开页面还在循环
  const intervalId = setInterval(() => {
    bubbleLightsAnim.attr({ rotation: bubbleLightsAnim.rotation - (Math.PI / 180) * 15 })
  }, 50)
  // 添加间隔扇形背景
  Array(8)
    .fill('')
    .map((item, index) => {
      let sector = new Sector({
        shape: {
          cx: discWidth / 2,
          cy: discWidth / 2 + 1,
          r: cOptions.shape.r,
          startAngle: ((Math.PI * 2) / 8) * index,
          endAngle: ((Math.PI * 2) / 8) * (index + 1)
        },
        style: {
          fill: index % 2 ? bubbleGradient3 : bubbleGradient4,
          opacity: 1
        },
        z: 1
      })
      zr.add(sector)
    })

  // 扇形遮罩
  let sectorMask = new Sector({
    shape: {
      cx: discWidth / 2,
      cy: discWidth / 2 + 1,
      r: cOptions.shape.r,
      startAngle: (-Math.PI * 2) / 8,
      endAngle: ((Math.PI * 2) / 8) * 6
    },
    style: {
      fill: '#000',
      opacity: 0
    },
    origin: [discWidth / 2, discWidth / 2 + 1],
    z: 10
  })
  zr.add(sectorMask)

  // 三角形
  let arrow = new ZrImage({
    style: {
      image: arrowOnPng,
      align: 'left',
      x: discWidth / 2 - 20,
      y: discWidth / 2 - 80,
      width: 40,
      height: 40,
      shadowColor: 'rgba(0,0,0,0.3)',
      shadowBlur: 10
    },
    // rotation: -index * 2 * Math.PI / 8 - Math.PI / 8,
    origin: [discWidth / 2, discWidth / 2],
    z: 11
  })
  zr.add(arrow)

  // 抽奖大按钮阴影层
  let btnStartShadow = new Circle({
    shape: {
      // image: 'http://localhost:5000/images/btnStart.png',
      fill: '#000',
      cx: discWidth / 2,
      cy: discWidth / 2,
      r: 55
    },
    style: {
      shadowColor: 'rgba(0,0,0,0.5)',
      shadowBlur: 30
    },
    // rotation: -index * 2 * Math.PI / 8 - Math.PI / 8,
    // origin: [discWidth / 2, discWidth / 2],
    z: 10
  })
  zr.add(btnStartShadow)

  // 动画元素 箭头、扇形添加到state中
  that.setState({ arrow, btnStart })
  let indexRotationOne = 0
  let indexRotationTwo = 0
  let totalRotation = 0
  let lastIndex = 0
  let surplusIndex = 0
  let startRotation = 0
  btnStart.on('click', function () {
    // 奖品接口没有数据则提示一下
    if (that.state.activityInfo.prizeInfos.length == 0) {
     
      return
    }
    // 如果活动状态下按钮置灰了，即不往下走了
    if (that.state.disabled || that.state.isAnimating) {
      return
    }
    // 防止重复点击 TODO:永远走不到这里 建议删除
    if (that.state.isAnimating) {
    
      return
    }
    that.setState({ isAnimating: true })
    that.handleDrawBtnClick({
      callback() {
        // 重置开始状态
        arrow.attr({ style: { image: arrowOnPng } })
        sectorMask.attr({ style: { opacity: 0.3 } })
        //中奖索引
        let index = that.state.prizeIndex
        indexRotationOne = (-Math.PI / 180) * ((45 - 22.5) * (2 * index + 1))
        totalRotation = totalRotation + indexRotationOne + indexRotationTwo + -Math.PI * 20
        // 箭头动画
        arrow.animateTo(
          {
            rotation: totalRotation
          },
          {
            duration: 8000,
            delay: 0,
            easing: 'cubicInOut', //cubicInOut quinticInOut  exponentialInOut 改造cubicInOut 停止前奏延长 或者 done回调中增加一个缓动周期
            // additive, // setToFinal // force // scope
            aborted() {
              that.setState({ isAnimating: false })
            },
            done() {
              that.setState({ isAnimating: false })
              // that.animationDoneCallback()
              alert('中了个iPhone24')
              indexRotationTwo = (-Math.PI / 180) * 360 - indexRotationOne
              lastIndex = index
              surplusIndex = 8 - lastIndex
            },
            during(percent) {
              // TODO:节流
              // 总角度量 => 取45度的商整数
              let angle = (45 * (index + surplusIndex) + 360 * 10) * percent + 45 * lastIndex
              let angleInt = Math.floor(angle / 45) * 45
              let rotation = (-Math.PI / 180) * angleInt
              // 遮罩同步旋转动画
              if (rotation !== startRotation) {
                sectorMask.attr({ rotation })
                startRotation = rotation
              }
            }
          }
        )
      }
    })
  })
  return { zr, intervalId }
}
export default createGameDisc
