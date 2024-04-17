import axios from 'axios'

const AXIOS = axios.create({
  baseURL: 'https://sp-taskify-api.vercel.app/4-6',
})

export default AXIOS
