import axios from 'axios'
let http = axios.create({
  baseURL: 'http://localhost:8080/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  },
  transformRequest: [
    function (data) {
      let newData = ''
      for (let k in data) {
        if (data.hasOwnProperty(k) === true) {
          newData +=
            encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
        }
      }
      return newData
    }
  ]
})

function apiAxios (method, url, params) {
  return new Promise((resolve, reject) => {
    http({
      method: method,
      url: url,
      data: method === 'POST' || method === 'PUT' ? params : null,
      params: method === 'GET' || method === 'DELETE' ? params : null
    })
      .then(function (response) {
        resolve(response)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}

export default {
  get: function (url, params) {
    return apiAxios('GET', url, params)
  },
  post: function (url, params) {
    return apiAxios('POST', url, params)
  },
  put: function (url, params) {
    return apiAxios('PUT', url, params)
  },
  delete: function (url, params) {
    return apiAxios('DELETE', url, params)
  }
}
