import { ref} from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

type UserInfo = {
  avatar: string,
  name: string,
  userId: number | string
}
export const useVoteStore = defineStore('vote', () => {
  const user = ref<null | UserInfo>(null)
  async function getUserInfo() {
    try { 
      var userInfo = await axios.get('/account/current-user')
      user.value = userInfo.data.result //userInfo拿到的是axios对象,.data 拿到响应体,.result 拿到才是用户信息
    } catch (e) {
      var err = e as any
      if (err.isAxiosError) {
        console.log('user not login.')
      } else {
        throw e
      }
    }
  }
  return { user, getUserInfo }
})
 