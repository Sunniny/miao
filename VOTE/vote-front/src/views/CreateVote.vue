<template>
  <div class="bg-gray-100 h-[100vh]">
    <div class="flex flex-col">
      <div class="px-4 bg-white w-full">
        <h1 class="font-bold my-2 text-xl flex items-center">
          <RouterLink to="/" class="flex items-center">
            <el-icon class="relative top-px">
              <ArrowLeft />
            </el-icon>
          </RouterLink>
          创建{{type}}页面
        </h1>
        <div class="space-y-2">
          <input v-model="title" type="text" class="transition w-full border-b  outline-none focus:ring my-1 p-1 text-lg" placeholder="投票标题" >
          <input v-model="desc" type="text" class="transition w-full border-b  outline-none focus:ring my-1 p-1" placeholder="补充描述(选填)">
          <div v-for="(option, idx) of options" :key="idx" class="flex gap-2 items-center">
            <span @click="deleteOptions(idx)" class="cursor-pointer ml-1 w-5 h-5  font-bold bg-red-500 text-white rounded-full shink-0 flex justify-center items-center">
              <el-icon :size="12"><Minus /></el-icon>
            </span>
            <input type="text" v-model="options[idx]" class="transition w-full border-b outline-none focus:ring my-1 p-1" placeholder="选项" >
          </div>
          <div class="gap-2 flex items-center" >
            <span @click="addOption" class="cursor-pointer ml-1 w-5 h-5 font-bold bg-sky-500 rounded-full flex justify-center items-center shink-0 text-white">
              <el-icon :size="12"><Plus /></el-icon>
            </span>
            <button class="cursor-pointer my-1 p-1 text-sky-500">添加选项</button>
          </div>
        </div>
      </div>
  
      <div class="px-4 bg-white divide-y mt-4">
        <div class="flex justify-between items-center h-12 ">
          截止日期
            <el-date-picker
            xstyle="width: 160px"
            class="!w-40"
            format="YYYY-MM-DD HH:mm"
              v-model="deadline"
              type="datetime"
              placeholder="请选择截止时间"
            />

        </div>
        <div class="flex justify-between  ">
          匿名投票
          <el-switch v-model="anonymous" /> 
        </div>
      </div>
      <button class="bg-sky-500 block rounded m-5 text-white p-1" @click="create">完成</button>
    </div>

    </div>
</template>

<script setup lang="ts">
  import {ref, computed} from 'vue'
  import {useRoute} from 'vue-router'
  import { useVoteStore } from '@/stores/vote'
  import { useRouter } from 'vue-router'
  import axios from 'axios';
  import { useLogin } from '@/hooks'

  var voteStore = useVoteStore()
  var router = useRouter() 
  var route = useRoute()
  // console.log(voteStore.user,"1111")
  const type = computed(() => route.query.type === "single" ? '单选' : '多选')
  useLogin()

  var multiple = computed(() => type.value=='多选')
  const deadline = ref(new Date(Date.now() + 86400000 * 7))
  const title = ref('')
  const desc = ref('')
  const options = ref(['',''])
  // const route = useRoute()
  // console.log(route)
  const anonymous = ref(false)
  function addOption() {
    options.value.push('')//.value是因为ref属性  传过来的是一个需要.value才可以获取到这个数组本身
  }
  function deleteOptions(idx: number) {
    options.value.splice(idx, 1)
  }

  async function create() {
    // debugger
    var voteInfo = {
    title: title.value,
    desc: desc.value,
    deadline: deadline.value,
    anonymous: anonymous.value,
    multiple: multiple.value,
    options: options.value
  }
    var res = await axios.post('/vote', voteInfo)
    console.log(res)
    if(res.data.code==0){
      var id = res.data.result.voteId
      router.push('/vote/' + id)
    } else {
      voteStore.user = null
      router.push('/login?next=' + route.fullPath)
    }
  }
</script> 
