import React from 'react'
import { Carousel, Flex, Grid } from 'antd-mobile'
import axios from 'axios'

import nav1 from 'assets/images/nav-1.png'
import nav2 from 'assets/images/nav-2.png'
import nav3 from 'assets/images/nav-3.png'
import nav4 from 'assets/images/nav-4.png'

import './index.scss'
import { getCurrentCitys } from 'utils/citys'

const navList = [
  { title: '整租', path: '/home/house', icon: nav1 },
  { title: '合租', path: '/home/house', icon: nav2 },
  { title: '地图找房', path: '/map', icon: nav3 },
  { title: '去出租', path: '/rent', icon: nav4 }
]

// const data = Array.from(new Array(4)).map((_val, i) => ({
//   icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
//   text: `name${i}`
// }))

class Index extends React.Component {
  state = {
    swiperList: [],
    imgHeight: (212 / 375) * window.innerWidth,
    groupList: [],
    newsList: [],
    city: {
      label: '北京',
      value: ''
    }
  }
  async componentDidMount() {
    // simulate img loading
    this.getSwiperList()

    const city = await getCurrentCitys()
    this.setState(
      {
        city
      },
      () => {
        this.getGroups()
        this.getNews()
      }
    )

    // const myCity = new window.BMap.LocalCity()
    // myCity.get(async result => {
    //   // const cityName = result.name
    //   // console.log('当前定位城市名称为：', result, cityName)
    //   const res = await axios.get('http://localhost:8080/area/info', {
    //     params: {
    //       name: result.name
    //     }
    //   })
    //   // console.log(res.data)

    //   const { body, status } = res.data
    //   localStorage.setItem('currentCity', JSON.stringify(body))
    //   if (status === 200) {
    //     // this.state.city.label = body.label
    //     // this.state.city.value = body.value
    //     this.setState(
    //       {
    //         city: body
    //       },
    //       () => {
    //         this.getGroups()
    //         this.getNews()
    //       }
    //     )
    //   }
    //   // console.log(this.state.city)
    // })
  }

  async getSwiperList() {
    const res = await axios.get('http://localhost:8080/home/swiper')
    // console.log(res.data)
    const { status, body } = res.data
    if (status === 200) {
      this.setState({
        swiperList: body,
        imgHeight: (212 / 375) * window.innerWidth
      })
    }
    // console.log(this.state.swiperList)
  }

  async getGroups() {
    const res = await axios.get('http://localhost:8080/home/groups', {
      params: {
        area: this.state.city.value
      }
    })
    const { status, body } = res.data
    if (status === 200) {
      this.setState({
        groupList: body
      })
    }
    // console.log(this.state.groupList)
  }

  async getNews() {
    const res = await axios.get('http://localhost:8080/home/news', {
      params: {
        area: this.state.city.value
      }
    })
    const { status, body } = res.data
    if (status === 200) {
      this.setState({
        newsList: body
      })
    }
    // console.log(this.state.newsList)
  }

  // *************************************************
  renderSearch() {
    return (
      <Flex className="search-box">
        <Flex className="search-form">
          <div className="location">
            <span
              className="name"
              onClick={() => this.props.history.push('/city')}
            >
              {this.state.city.label}
            </span>
            <i className="iconfont icon-arrow"> </i>
          </div>
          <div className="search-input">
            <i className="iconfont icon-seach" />
            <span className="text">请输入小区地址</span>
          </div>
        </Flex>
        {/* 地图小图标 */}
        <i
          className="iconfont icon-map"
          onClick={() => this.props.history.push('/map')}
        />
      </Flex>
    )
  }

  haveSwiperList() {
    if (this.state.swiperList.length > 0) {
      return (
        <Carousel autoplay infinite autoplayInterval={3000}>
          {this.state.swiperList.map(item => (
            <a
              key={item.id}
              href="http://www.alipay.com"
              style={{
                display: 'inline-block',
                width: '100%',
                height: this.state.imgHeight
              }}
            >
              <img
                src={'http://localhost:8080' + item.imgSrc}
                alt={item.alt}
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'))
                  this.setState({ imgHeight: 'auto' })
                }}
              />
            </a>
          ))}
        </Carousel>
      )
    } else {
      return null
    }
  }

  renderNav() {
    return (
      <Flex>
        {navList.map(item => (
          <Flex.Item
            key={item.title}
            onClick={() => this.props.history.push(item.path)}
          >
            <img src={item.icon} alt="" />
            <p>{item.title}</p>
          </Flex.Item>
        ))}
      </Flex>
    )
  }

  renderGroup() {
    return (
      <div>
        <h3 className="group-title">
          租房小组
          <span className="more">更多</span>
        </h3>
        <div className="group-content">
          {/* <div className="sub-title">ColumnNum=3 </div> */}
          <Grid
            data={this.state.groupList}
            columnNum={2}
            renderItem={el => (
              <Flex className="group-item" justify="around">
                <div className="desc">
                  <p className="title">{el.title}</p>
                  <span className="info">{el.desc}</span>
                </div>
                <img src={'http://localhost:8080' + el.imgSrc} alt="" />
              </Flex>
            )}
            square={false}
            hasLine={false}
            activeStyle={false}
          />
        </div>
      </div>
    )
  }

  renderNews() {
    return (
      <>
        {this.state.newsList.map(item => (
          <div key={item.id}>
            <div className="group-title">最新资讯</div>
            <div className="news-item">
              <div className="imgwrap">
                <img
                  className="img"
                  src={'http://localhost:8080' + item.imgSrc}
                  alt=""
                />
              </div>
              <Flex className="content" direction="column" justify="between">
                <h3 className="title">{item.title}</h3>
                <Flex className="info" justify="between">
                  <span>{item.from}</span>
                  <span>{item.date}</span>
                </Flex>
              </Flex>
            </div>
          </div>
        ))}
      </>
    )
  }

  render() {
    return (
      <div className="index">
        <div className="carousel" style={{ height: this.state.imgHeight }}>
          {this.haveSwiperList()}
          {this.renderSearch()}
        </div>
        <div className="nav">{this.renderNav()}</div>
        <div className="group">{this.renderGroup()}</div>
        <div className="news">{this.renderNews()}</div>
      </div>
    )
  }
}

export default Index
