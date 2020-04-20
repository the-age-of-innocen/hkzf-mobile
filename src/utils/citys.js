import axios from 'axios'
export function getCurrentCitys1(backCitys) {
  // console.log('获取当前城市')
  const city = JSON.parse(localStorage.getItem('currentCity'))
  if (city) {
    backCitys(city)
  } else {
    const myCity = new window.BMap.LocalCity()
    myCity.get(async result => {
      const res = await axios.get(
        `http://localhost:8080/area/info?name=${result.name}`
      )
      const { status, body } = res.data
      if (status === 200) {
        localStorage.setItem('currentCity', JSON.stringify(body))
        backCitys(body)
      }
      // return body
    })

    // console.log('需要重新获取')
  }
}

const currentCity = 'currentCity'
export function setCity(city) {
  localStorage.setItem(currentCity, JSON.stringify(city))
}

export function getCurrentCitys(callback) {
  return new Promise((resolve, reject) => {
    const city = JSON.parse(localStorage.getItem(currentCity))
    if (city) {
      resolve(city)
      callback && callback(city)
    } else {
      const myCity = new window.BMap.LocalCity()
      myCity.get(result => {
        axios
          .get(`http://localhost:8080/area/info?name=${result.name}`)
          .then(res => {
            const { body } = res.data
            // localStorage.setItem(currentCity, JSON.stringify(body))
            setCity(body)
            resolve(body)
            callback && callback(body)
          })
          .catch(err => {
            reject(err)
            callback && callback(err)
          })
      })
    }
  })
}
