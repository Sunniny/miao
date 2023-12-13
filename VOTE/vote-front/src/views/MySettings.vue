<template>
  <div class="bg-gray-100 h-[100vh]">
    <h1 class="p-4 text-xl">
      <RouterLink class="inline-flex items-center gap-2" to="/me">
        <el-icon class="relative">
          <ArrowLeftBold />
        </el-icon>
        个人设置
      </RouterLink>
    </h1>
    <div class="flex items-center justify-center gap-4 p-12">
      <img class="rounded-full w-16 h-16" src="https://dummyimage.com/50x50/000/fff" alt=""> <span>大喵</span>
    </div>
    <RouterLink to="/" class="flex justify-between bg-white h-16 px-4 items-center ">
      昵称
      <span  class="flex items-center gap-2">
        大喵
        <el-icon>
          <ArrowRightBold />
        </el-icon>
      </span>
    </RouterLink>
    <button @click="logout" class="mt-20 text-blue-500 block py-3 border border-blue-500  rounded m-auto w-2/3 ">
      退出登陆
    </button>
  </div>
</template>

<script setup lang="ts">
import { useVoteStore } from '@/stores';
import axios from 'axios';
import { useRouter } from 'vue-router';

var router = useRouter()
var voteStore = useVoteStore()
async function logout() {
  await axios.get('/account/logout')
  voteStore.user = null
  router.push('/')
}


</script>
