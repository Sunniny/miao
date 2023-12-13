<template>
  <div>
    <h1 class="p-4 text-xl">
      <RouterLink to="/" class="inline-flex gap-2 items-center">
        <el-icon class="relative"><ArrowLeftBold /></el-icon>
        登陆
      </RouterLink>
    </h1>

    <div class="text-xl flex px-4 h-12 items-center" ><input  placeholder="用户名" class="border focus:ring outline-none w-full " type="text" v-model="name"></div>
    <div class="text-xl flex px-4 h-12 items-center "><input  placeholder="密码" class="border focus:ring outline-none w-full " type="password" v-model="password"></div>
    <button @click="login" class="block py-3 m-auto border w-2/3 rounded  bg-blue-500 text-white mt-2 ">登陆</button>
  </div> 

</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'
  import axios from 'axios'
  import { useVoteStore } from '@/stores/vote'
  import { useRouter } from 'vue-router'
  var name = ref('')
  var password = ref('')
  var route = useRoute()
  var router = useRouter()
  var next = (route.query.next ?? '/') as string
  console.log(next)

  var voteStore = useVoteStore()

  async function login() {
    try {
      const user = await axios.post('/account/login', {
        name: name.value,
        password: password.value
      })
      voteStore.user = user.data //axios返回的是响应对象,响应对象的data上才是响应体
      router.replace(next)
      console.log("登陆成功")
    } catch(e) {
      alert('登陆失败')
    }
  }
</script>
