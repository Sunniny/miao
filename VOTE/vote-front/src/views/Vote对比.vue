<template>
  <div class="bg-gray-100 h-[100vh] flex flex-col gap-4">
    <h1 class="p-4 text-xl ">
      <RouterLink to="/select-create">腾讯投票</RouterLink>
    </h1>

    <div class="my-4 mx-4 relative">
      <h2 class="text-3xl font-bold mb-4">{{ voteInfo.vote.title }}</h2>
      <h3>{{ voteInfo.vote.desc }} <span class="text-blue-500">{{ displayType }}</span></h3>
      <span class="absolute top-0 right-0 bg-blue-500 flex items-center rounded-full text-white p-2">
        <el-icon :size="24">
          <Share />
        </el-icon>
      </span>
    </div>

    <ul class="space-y-4">
      <li class="" v-for="(option,idx) of voteInfo.options" :key="idx">
        <div @click="handleOptionClick(option.optionId)" class="bg-white shadow-lg ">
          <div class="relative h-12 flex gap-2 items-center mx-4">
            <span>{{ option.content }}</span>

            <span v-if="isVoting && option.optionId == lastClickedOptionId" class="animate-spin flex items-center">
              <el-icon><Loading /></el-icon>
            </span>
            <span v-else>{{ optionChecked[option.optionId] ? '✔️' : ''}}</span>

            <span class="ml-auto">{{ optionVotes[option.optionId].length }} 票</span>
            <span class="w-14 text-right">{{ optionPercentage[option.optionId] }}</span>
            <div class="absolute bottom-0 h-[2px] bg-blue-500 transition-all" :style="{width: optionPercentage[option.optionId]}"></div>
          </div>
        </div>

        <div v-if="!voteInfo.vote.anonymous" ref="avatarContainer" class="flex flex-wrap gap-2 mt-2 mx-4">
          <img class="align-top inline-block w-8 h-8 rounded-full border border-slate-500" v-for="user of visibleAvatars(idx)" :src="user.avatar" alt="">
          <el-icon @click="选项头像展开[idx] = !选项头像展开[idx]" class="align-top inline-block !w-8 !h-8 rounded-full border border-slate-500"><More /></el-icon>
        </div>
      </li>
    </ul>

    <div class="flex justify-between items-center text-slate-400 px-4">
      <span>投票截止：{{ voteInfo.vote.deadline }}</span>
      <!-- <span>吐个槽</span> -->
    </div>

    <button @click="submit" v-if="showBottomButton" :disabled="selectedOptionId.length == 0" class="disabled:bg-gray-500 inline-block mx-4 rounded p-3 bg-blue-500 text-white ">完成</button>

  </div>
</template>


<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useVoteStore } from '@/stores/vote'
import { useWindowSize } from '../hooks'
import { useElementSize } from '@vueuse/core'

var route = useRoute()
var id = route.params.id

var voteStore = useVoteStore()

var res = await axios.get(`/vote/${id}`)
var voteInfo = reactive(res.data.result)

var displayType = computed(() => voteInfo.vote.multiple ? '[多选]' : '[单选]')


// 每个选项的票数 {53: [xxx, yyy], 54: [www,zzz,xxx], ...}
var optionVotes = computed(() => {
  var 每个选项的票数:any = {}

  for (var option of voteInfo.options) {

    // vote是一张票,其optionId代表它是投给哪个选项的
    每个选项的票数[option.optionId] = voteInfo.userVotes.filter((vote: any) => vote.optionId == option.optionId)
  }
  return 每个选项的票数
})

// 每个选项的比例 {53: '66%', 54: '32.5%', ...}
var optionPercentage = computed(() => {
  var totalUsers = new Set(voteInfo.userVotes.map((it: any) => it.userId)).size

  var result: any = {}

  for (var optionId in optionVotes.value) {
    var 这个选项的票们 = optionVotes.value[optionId]
    if (totalUsers == 0) {
      result[optionId] = '0%'
    } else {
      result[optionId] = (这个选项的票们.length / totalUsers * 100).toFixed(1) + '%'
    }
  }

  return result
})

// 计算当前登录用户对每个选项由无投票
var optionVotesByCurrentUser = computed(() => {
  var result: any = {}

  // for (var [optionId, votes] of Object.entries(optionVotes.value)) {
  // }
  for (var optionId in optionVotes.value) {
    var 这个选项的票们 = optionVotes.value[optionId]

    if (这个选项的票们.some((it:any) => it.userId == voteStore.user?.userId)) {
      result[optionId] = true
    } else {
      result[optionId] = false
    }
  }

  return result
})

var showBottomButton = computed(() => {
  if (!voteInfo.vote.anonymous) {
    return false
  }

  var d = new Date().toISOString()
  if (d > voteInfo.vote.deadline) {
    return false
  }
  //                                用户在任何一个选项上打了勾，说明他已经投过这个问题了，而匿名投票只有一投票的机会
  if (voteInfo.vote.anonymous && Object.values(optionVotesByCurrentUser.value).some(it => it == true) ) {
    return false
  }

  return true
})

// console.log(optionVotes, optionPercentage)

var selectedOptionId = ref<number[]>([]) // [53, 54]

// 模板中用来显示勾✔️的数据
var optionChecked = computed(() => {
  if (showBottomButton.value) {
    var result: any = {}
    for (var id of selectedOptionId.value) {
      result[id] = true
    }
    return result
  }
  return optionVotesByCurrentUser.value
})

var isVoting = ref(false) // 是否正在发送投票请求
var lastClickedOptionId = ref(-1) // 最后一次点击的选项的id，用来显示loading

// 根据宽口宽度计算可以显示的头像个数
// 在pc浏览器上可能会有问题，因为pc浏览器有滚动条
var avatarContainer = ref<null | HTMLElement[]>(null) // 因为这个ref有可能会传给多个元素所以它可能是数组(只要ref用在v-for里，那么它一定是个数组)
var firstAvatarContainer = computed(() => {
  return avatarContainer.value?.[0]
})
var { width } = useElementSize(firstAvatarContainer)
var size = useWindowSize()
var 默认可见头像个数 = computed(() => {
  return Math.floor(((width.value) + 8) / 40)
})
var 选项头像展开 = ref<boolean[]>(new Array(voteInfo.options.length).fill(false))

// 获取第idx个选项下面显示的头像
// 注意参数不是选项id，是选项下标
function visibleAvatars(optionIndex: number) {
  var { optionId } = voteInfo.options[optionIndex]

  if (选项头像展开.value[optionIndex]) {
    return optionVotes.value[optionId]
  } else {
    return optionVotes.value[optionId].slice(0, 默认可见头像个数.value - 1)
  }
}

// console.log('optionChecked', optionChecked)

function handleOptionClick(optionId: number) {
  debugger
  // 非匿名,点击即发起请求
  lastClickedOptionId.value = optionId

  if (!voteInfo.vote.anonymous) {
    isVoting.value = true
    axios.post(`/vote/${voteInfo.vote.voteId}`, {
      optionIds: [optionId]
    }).then(res => {
      isVoting.value = false
      // console.log(res.data.result)
      voteInfo.userVotes = res.data.result.userVotes
    })

  } else { // 匿名的话,点击只是选中该项,点提交才发送请求,且不能再发送了

    // 如果该项已经选中，就取消它的选中，否则是加进来
    if (showBottomButton.value) {
      if (selectedOptionId.value.includes(optionId)) {
        var index = selectedOptionId.value.indexOf(optionId)
        selectedOptionId.value.splice(index, 1)
      } else {
        if (!voteInfo.vote.multiple) {
          // 单选时只能选一项，所以一定是数组中只有一个元素
          selectedOptionId.value = [optionId]
        } else {
          selectedOptionId.value.push(optionId)
        }
      }
    } else {
      alert('不能投了')
    }
  }
}

function submit() {
  axios.post(`/vote/${voteInfo.vote.voteId}`, {
    optionIds: selectedOptionId.value
  }).then(res => {
    // console.log(res.data.result)
    voteInfo.userVotes = res.data.result.userVotes
  })
}


onMounted(() => {

  var ws = new WebSocket(`ws://${location.host}/realtime-voteinfo/${id}`)

  ws.onmessage = e => {
    var userVotes = JSON.parse(e.data)
    voteInfo.userVotes = userVotes
  }

})
</script>
