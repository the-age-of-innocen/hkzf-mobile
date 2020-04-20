import React from 'react'
import './index.scss'
import axios from 'axios'
import { List, AutoSizer } from 'react-virtualized'
import { getCurrentCitys, setCity } from 'utils/citys'
import { NavBar, Icon, Toast } from 'antd-mobile'

// const list = Array.from(new Array(10)).map(
//   (item, index) => `我是第${index}条数据`
// )
const TITLE_HEIGHT = 36
const CITYS_HEIGHT = 50
const hasCity = ['北京', '上海', '广州', '深圳']
//*******************************************
class City extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cityObj: {},
      cityArr: [],
      currentActive: 0
    }
    this.listRef = React.createRef()
  }

  componentDidMount() {
    this.getCityList()
  }
  // **********************************

  async getCityList() {
    const res = await axios.get('http://localhost:8080/area/city', {
      params: {
        level: 1
      }
    })
    // console.log(res.data)
    const { body, status } = res.data
    if (status === 200) {
      const { cityObj, cityArr } = this.handleCityList(body)

      // 处理热门城市数据
      const result = await axios.get('http://localhost:8080/area/hot')
      // console.log(result.data)

      cityArr.unshift('hot')
      cityObj.hot = result.data.body

      // 处理当前城市
      // const currentCity = JSON.parse(localStorage.getItem('currentCity'))
      // console.log(currentCity)

      // getCurrentCitys(city => {
      //   console.log(city)
      // })

      const city = await getCurrentCitys()
      // console.log(city)

      cityArr.unshift('#')
      cityObj['#'] = [city]
      this.setState(
        {
          cityArr,
          cityObj
        },
        () => {
          this.listRef.current.measureAllRows()
        }
      )
      console.log(cityObj, cityArr)
    }
  }

  handleCityList(body) {
    // console.log(body)
    const cityObj = {}
    body.forEach(item => {
      const short = item.short.slice(0, 1)
      if (short in cityObj) {
        cityObj[short].push(item)
      } else {
        cityObj[short] = [item]
      }
    })
    // console.log(cityObj)
    const cityArr = Object.keys(cityObj).sort()
    // console.log(cityArr)

    return {
      cityObj: cityObj,
      cityArr: cityArr
    }
  }

  parseTitle(short) {
    if (short === '#') {
      return '当前城市'
    } else if (short === 'hot') {
      return '热门城市'
    } else {
      return short.toUpperCase()
    }
  }

  caclHeight({ index }) {
    const short = this.state.cityArr[index]
    const citys = this.state.cityObj[short]
    // console.log(index)
    // return 300
    return TITLE_HEIGHT + citys.length * CITYS_HEIGHT
  }

  handClick(index) {
    // console.log(index)
    // console.log(this.listRef.current)
    this.listRef.current.scrollToRow(index)
  }
  caclCity(city) {
    console.log(city)
    if (hasCity.includes(city.label)) {
      setCity(city)
      // localStorage.setItem('currentCity', JSON.stringify(city))
      this.props.history.go(-1)
    } else {
      Toast.info('该城市暂时无房源信息', 1)
    }
  }

  rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style // Style object to be applied to row (to position it)
  }) {
    const short = this.state.cityArr[index]
    const citys = this.state.cityObj[short]
    return (
      <div key={key} style={style} className="city-item">
        <div className="title">{this.parseTitle(short)}</div>
        {citys.map(item => (
          <div
            className="name"
            key={item.value}
            onClick={this.caclCity.bind(this, item)}
          >
            {item.label}
          </div>
        ))}
      </div>
    )
  }
  onRowsRendered(obj) {
    // console.log(obj.startIndex)
    if (this.state.currentActive !== obj.startIndex) {
      this.setState({
        currentActive: obj.startIndex
      })
    }
  }
  // *************************************

  render() {
    return (
      <div className="city">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
          className="navbar"
        >
          城市选择
        </NavBar>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              rowCount={this.state.cityArr.length}
              rowHeight={this.caclHeight.bind(this)}
              rowRenderer={this.rowRenderer.bind(this)}
              width={width}
              onRowsRendered={this.onRowsRendered.bind(this)}
              ref={this.listRef}
              scrollToAlignment="start"
            />
          )}
        </AutoSizer>
        <ul className="city-index">
          {this.state.cityArr.map((item, index) => (
            <li className="city-index-item" key={item}>
              <span
                className={
                  index === this.state.currentActive ? 'index-active' : ''
                }
                onClick={this.handClick.bind(this, index)}
              >
                {item === 'hot' ? '热' : item.toUpperCase()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
export default City
