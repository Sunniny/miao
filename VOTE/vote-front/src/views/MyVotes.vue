<template>
  <h1 class="p-4 text-xl">
    <RouterLink to="/me" class="inline-flex gap-2 items-center" >
      <el-icon class="relative top-px"><ArrowLeftBold /></el-icon>
      我的投票
    </RouterLink>
  </h1>
  <div class="divide-y mb-16">
    <div v-for="(vote, idx) of myVote" :key="vote.voteId" @click="set(idx)">
      <div>
        <div class="hover:bg-green-100 flex items-center justify-between px-4 h-16" ><span>{{ vote.title }}</span> <span>30</span></div>
      </div>
      <div :class="{hidden: selectedIdx !== idx}" class="flex border-t">
        <span class="py-2 basis-0 h-16 justify-center grow flex flex-col items-center "><span>📚</span>编辑</span>
        <RouterLink to="/vote/1" class="py-2 basis-0 h-16 justify-center grow flex flex-col items-center "><span>📚</span>查看</RouterLink>
        <span class="py-2 basis-0 h-16 justify-center grow flex flex-col items-center "><span>📚</span>分享</span>
        <span @click="deleteVote(vote.voteId)" class="py-2 basis-0 h-16 justify-center grow flex flex-col items-center "><span>📚</span>删除</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import {reactive, ref } from 'vue'
  import axios from 'axios'
  import { useSelectOne,useLogin } from '@/hooks'
  

  var [selectedIdx, set] = useSelectOne()
  type VoteInfo = {
     "voteId": number,
      "userId": number,
      "title": string,
      "desc": string,
      "deadline": string,
      "anonymous": number | boolean,
      "multiple": number | boolean
  }
  // var isLogin = useLogin()
  var myVote = ref<VoteInfo[]>([])

  // if(isLogin) {
  //   var res = await axios.get('/vote')
  //   myVote.value = res.data.result
  // }
  try {
      var res = await axios.get('/vote')//如果没登陆 可能请求失败
      myVote.value = res.data.result
    } catch(e) {
      myVote.value = []
      useLogin()
    }

    async function deleteVote(id: any) {
      await axios.delete('/vote/${id}')
      myVote.value = res.data.result
    }
</script>
