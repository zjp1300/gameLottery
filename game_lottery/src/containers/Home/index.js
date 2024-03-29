import React, { Component } from 'react'
import './index.css'
import WebpContent from '../../components/WebpCom/index.tsx'
import createGameDisc from './createGameDisc'
import * as zrender from 'zrender'

const data = {
  "code": 0, 
  "message": "", 
  "data": {
      "rule": "测试", 
      "prizeInfos": [
          {
              "activityCode": "LOTTERY1637749908434CLAIRGl", 
              "name": "谢谢参与", 
              "image": "http://h5-static.yonghuivip.com/image/yhLogo.png", 
              "prizeSerialNum": 0, 
              "rewardOut": false, 
              "chanceCount": 0, 
              "promptTitle": null, 
              "retryTime": null, 
              "lotteryChanceId": null, 
              "couponType": null, 
              "addressId": null, 
              "prizeId": 7911
          }, 
          {
              "activityCode": "LOTTERY1637749908434CLAIRGl", 
              "name": "测试", 
              "image": "http://image.yonghuivip.com/image/16377499423433b2102033c995713e07166c709d5c882b99b4a4d.png", 
              "prizeSerialNum": 5, 
              "rewardOut": false, 
              "chanceCount": 0, 
              "promptTitle": null, 
              "retryTime": null, 
              "lotteryChanceId": null, 
              "couponType": null, 
              "addressId": null, 
              "prizeId": 7910
          }, 
          {
              "activityCode": "LOTTERY1637749908434CLAIRGl", 
              "name": "谢谢参与", 
              "image": "http://h5-static.yonghuivip.com/image/yhLogo.png", 
              "prizeSerialNum": 6, 
              "rewardOut": false, 
              "chanceCount": 0, 
              "promptTitle": null, 
              "retryTime": null, 
              "lotteryChanceId": null, 
              "couponType": null, 
              "addressId": null, 
              "prizeId": 7911
          }, 
          {
              "activityCode": "LOTTERY1637749908434CLAIRGl", 
              "name": "谢谢参与", 
              "image": "http://h5-static.yonghuivip.com/image/yhLogo.png", 
              "prizeSerialNum": 7, 
              "rewardOut": false, 
              "chanceCount": 0, 
              "promptTitle": null, 
              "retryTime": null, 
              "lotteryChanceId": null, 
              "couponType": null, 
              "addressId": null, 
              "prizeId": 7911
          }, 
          {
              "activityCode": "LOTTERY1637749908434CLAIRGl", 
              "name": "谢谢参与", 
              "image": "http://h5-static.yonghuivip.com/image/yhLogo.png", 
              "prizeSerialNum": 8, 
              "rewardOut": false, 
              "chanceCount": 0, 
              "promptTitle": null, 
              "retryTime": null, 
              "lotteryChanceId": null, 
              "couponType": null, 
              "addressId": null, 
              "prizeId": 7911
          }, 
          {
              "activityCode": "LOTTERY1637749908434CLAIRGl", 
              "name": "谢谢参与", 
              "image": "http://h5-static.yonghuivip.com/image/yhLogo.png", 
              "prizeSerialNum": 9, 
              "rewardOut": false, 
              "chanceCount": 0, 
              "promptTitle": null, 
              "retryTime": null, 
              "lotteryChanceId": null, 
              "couponType": null, 
              "addressId": null, 
              "prizeId": 7911
          }, 
          {
              "activityCode": "LOTTERY1637749908434CLAIRGl", 
              "name": "谢谢参与", 
              "image": "http://h5-static.yonghuivip.com/image/yhLogo.png", 
              "prizeSerialNum": 10, 
              "rewardOut": false, 
              "chanceCount": 0, 
              "promptTitle": null, 
              "retryTime": null, 
              "lotteryChanceId": null, 
              "couponType": null, 
              "addressId": null, 
              "prizeId": 7911
          }, 
          {
              "activityCode": "LOTTERY1637749908434CLAIRGl", 
              "name": "谢谢参与", 
              "image": "http://h5-static.yonghuivip.com/image/yhLogo.png", 
              "prizeSerialNum": 11, 
              "rewardOut": false, 
              "chanceCount": 0, 
              "promptTitle": null, 
              "retryTime": null, 
              "lotteryChanceId": null, 
              "couponType": null, 
              "addressId": null, 
              "prizeId": 7911
          }
      ], 
      "chanceCount": 10, 
      "rewardOut": false, 
      "activityState": "IN_PROGRESS", 
      "riskStatus": 1, 
      "h5PromptWord": "你还有0次机会", 
      "activityVersion": "0cd9b20c306373ffb5e1e0b2e060d7ba"
  }, 
  "now": 1639117768840
}

const luckData = {
  "code": 0,
  "message": "用户太热情了",
  "data": {
    "isHit": "1",
    "promptTitle": "你与大奖擦肩而过",
    "h5PromptWord": null,
    "prize": {
      "activityCode": null,
      "name": null,
      "image": null,
      "prizeSerialNum": 5,
      "rewardOut": false,
      "chanceCount": 1,
      "promptTitle": "你与大奖擦肩而过",
      "retryTime": null,
      "lotteryChanceId": 116805600,
      "couponType":'Gift',
      "addressId": null,
      "prizeId": null
    },
    "activityState": "IN_PROGRESS"
  },
  "now": 1639118939328
}
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activityInfo: {},
      records: [],
      luckDrawResult: {},
      sectorMask: null, //zrender 动画对象 遮罩
      arrow: null, //zrender 动画对象 箭头
      btnStart: null, //zrender 动画对象 按钮
      prizeIndex: 0, //中奖索引
      zr: null, //zrender对象
      setintervalId: null,
      activityVersion: null,
    }
  }

  componentDidMount(){
    this.reRender()
  }

  // 初始化页面
  reRender() {
    const _width = document.body.offsetWidth 
    // 1.渲染抽奖转盘
    this.setState({ zr: this.initGameDisc(_width) })
    // 2.请求活动信息
    this.fetchActivityInfo()
  }
   // 初始化轮盘
   initGameDisc(windowWidth) {
    let { zr, intervalId } = createGameDisc(windowWidth, this)
    this.setState({ setintervalId: intervalId })
    return zr
  }
  // 抽奖活动详细信息
  async fetchActivityInfo() {
    // let res = await getActivityInfo().catch(() => {
    //   Loading.hide()
    //   this.setState({ loadStatus: 2 })
    // })
    
    let res = data
    if (res && res.code == 0 && res.data) {
      // activityInfo.state 判断活动状态 未开始、进行中、已结束、奖励已发完 另 还有0次机会则toast仅提示一次 ‘抽奖次数已用完’
      let activityInfo = res.data
      let {  activityVersion, chanceCount, } = activityInfo
    
      if (chanceCount == 0) {
        // 按钮置灰操作
        this.disableBtnStart()
      }
      this.setState({ activityInfo: activityInfo, activityVersion })
      setTimeout(() => {
        this.renderDataToZr(this.state.zr)
      }, 0);
    } 
  }
  // 渲染后端返回的奖品图片
  renderDataToZr(zr) {
    let prizeInfos = this.state.activityInfo.prizeInfos || []
    prizeInfos.map((item, index) => {
      let windowWidth = document.body.offsetWidth
      let discWidth = windowWidth * 0.9
      //  添加奖品文字
      let txt = new zrender.Text({
        style: {
          text: item.name, //文字
          fill: '#9B0000',
          align: 'center',
          x: discWidth / 2,
          y: 48,
          fontSize: 12 //文字大小
        },
        rotation: (-index * 2 * Math.PI) / 8 - Math.PI / 8,
        origin: [discWidth / 2, discWidth / 2],
        z: 3
      })
      zr.add(txt)

      // 添加奖品图片
      let img = new zrender.Image({
        style: {
          image: item.image,
          align: 'left',
          x: discWidth / 2 - 20,
          y: 68,
          width: 40,
          height: 40,
          fontSize: 12 //文字大小
          // backgroundColor: '#ddd',
        },
        rotation: (-index * 2 * Math.PI) / 8 - Math.PI / 8,
        origin: [discWidth / 2, discWidth / 2],
        z: 2
      })
      zr.add(img)
    })
  }

  handleDrawBtnClick({ callback }) {
    this.fetchLuckyDraw({ callback })
  }
   // 点击抽奖接口
   async fetchLuckyDraw({ callback } = {}) {
      // let res = await postLuckyDraw(this.state.activityVersion).catch(() => {
      //   Toast.show({ content: '网络开小差了', maskClickable: false })
      // })

      let res = luckData
      if (res && res.code == 0 && res.data) {
        const luckDrawResult = res.data
        // 对比接口返回的中奖奖品 在 大盘上的索引，以得到大盘旋转停止的方位
        const prizeIndex = this.state.activityInfo.prizeInfos.findIndex(
          item => item.prizeSerialNum == luckDrawResult.prize.prizeSerialNum
        )
        if (prizeIndex == -1) {
          return
        }
        this.setState({ luckDrawResult, prizeIndex }, () => {
          callback()
        })
      } else {
        this.setState({ isAnimating: false })
        console.log('失败逻辑2')
      }
  }

  render(){
    const { activityInfo } = this.state
    // 后端返回的字符串处理展示出
    const h5ProptWord = (activityInfo.h5PromptWord || '').match(/(\D+)?(\d*)?(\D*)/)
    return(
      <div className='activityContainerWrapper'>
        <div className='' style={{ display: this.state.noActivity ? 'none' : 'block' }}>
          <WebpContent
            className='activityContainer'
            url='https://image.yonghuivip.com/yh-m-site/yh-game-lottery/img/activityBackground.png'
          >
            <div className='btnTips'>
              {/* TODO:优化为盲盒弹幕 done*/}
              {/* <BuildBarrage announcements={this.state.records} /> */}
              <i className='vLine'></i>
              <a>
                <i className='icon oak-iconfont oak-icon-gift_line'></i> 奖励记录
              </a>
            </div>
            <div className='mainTitle'> instert main title image here </div>
            <div className='discSection'>
              {/* <!-- 图片原始尺寸 1056 * 1326 --> */}
              <div className='disc'>
                <WebpContent url='https://image.yonghuivip.com/yh-m-site/yh-game-lottery/img/disc.png' isRenderImg />
                <div className='turnDisc' id='turnDisc'></div>
                <div className='btnAction' id='btnAction'>
                  <button id='btnStart' className='btnStart'></button>
                </div>
                <label className='lableTips'>
                  {h5ProptWord[1]} <span>{h5ProptWord[2]}</span> {h5ProptWord[3]}
                </label>
              </div>
            </div>
          </WebpContent>
        </div>
      </div>
    )
  }
}