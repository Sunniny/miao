<template>
  <div class="vote" >
    <div class="bg-gray-100 h-[100vh] flex flex-col gap-4">
      <h1 class="p-4 text-xl"><RouterLink to="/select-create">腾讯投票</RouterLink></h1>
      <div class="my-4 mx-4 relative">
          <h2 class="text-3xl font-bold mb-4">{{ voteInfo.vote.title }}</h2>
          <h3>{{ voteInfo.vote.desc }} <span class="text-blue-500">{{ displayType }}</span></h3>
        <span class="absolute top-0 right-0 bg-blue-500 rounded-full  text-white flex p-2 ">
          <el-icon :size="24"><Share /></el-icon>
        </span>
      </div>

      <ul class="space-y-4">
        <li  class="bg-white" v-for="(option, idx) of voteInfo.options" :key="idx">
          <div @click="handleOptionClick(option.optionId)" class="shadow-lg bg-white">
            <div class="relative h-12 flex items-center gap-2 mx-4">
              <span>{{ option.content }}</span>
            <span v-if="isVoting && lastClickOptionId == option.optionId" class="flex items-center animate-spin text-xl" >
              <el-icon><Loading /></el-icon>
            </span>
            <span v-else>{{optionChecked[option.optionId] ? '✔️' : ''}}</span>
            <span class="ml-auto">{{  optionVotes[option.optionId].length }} 票</span>
            <span class="w-14 text-right">{{ optionPercentage[option.optionId] }}</span>
            <div class="absolute bottom-0 h-[2px] bg-blue-500 transition-all" :style="{width: optionPercentage[option.optionId]}"></div>
            </div>
          </div> 
          <div v-if="!voteInfo.vote.anonymous"  ref="avatarContainer" class="flex flex-wrap gap-2 mt-2 px-4">
            <img class="w-8 h-8 rounded-full border border-slate-500" v-for="user of visibleAvatars(idx)" :src="user.avatar" alt="">
            <el-icon @click="选项头像展开[idx] = !选项头像展开[idx]" class="!w-8 !h-8 rounded-full border border-slate-500"><MoreFilled /></el-icon>
          </div>
        </li>
      </ul>

      <div class="flex justify-between items-center text-slate-400 px-4">
        <span>投票截止: {{ voteInfo.vote.deadline }}</span>
        <span>吐个槽 | 举报投票</span>
      </div>
    <button @click="submit" v-if="showButtonBottom" :disabled="selectedOptionId.length == 0" class="disabled:bg-gray-500 bg-blue-500 inline-block rounded mx-4 text-white p-3">完成</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, computed, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { useVoteStore } from '@/stores';
  import { useWindowSize } from '../hooks'
  import { useElementSize } from '@vueuse/core'

  import axios from 'axios'
  const route = useRoute()
  const id = route.params.id

  var res = await axios.get(`/vote/${id}`)
  var voteInfo = reactive(res.data.result)

  var displayType = computed(() => voteInfo.vote.multiple ? '[多选]':'[单选]')
  var voteStore = useVoteStore() 

// 每个选项的票数,{53:[xxx,yyy], 54:[www,zzz,lll]} 中括号里的[xxx,yyy,...]代表的是投这个票的人的信息,比如userId,头像等
  var optionVotes = computed(() => {
    var 每个选项的票数:any = {}
    for(var option of voteInfo.options) {
      //归票(每个选项投了几票) vote是一张票,其optionId代表它是投给哪个选项的
      每个选项的票数[option.optionId] = voteInfo.userVotes.filter((vote: any) => vote.optionId == option.optionId)
    }
   return 每个选项的票数
  })
 // console.log(optionVotes.value)={53: Array(6), 54: Array(5), 55: Array(5), 56: Array(5)}

  var optionPercentage = computed(() => {
    //人数去重
    var totalUsers = new Set(voteInfo.userVotes.map((it: any) => it.userId)).size
    var result: any = {}
    //其中这个a相当于是key  这个对象是长这样的
    //{53: Array(6), 54: Array(5), 55: Array(5), 56: Array(5)}
    
    for(var a in optionVotes.value) {
      //console.log(a) 那么其中的a就是代表 53,54,55,56
      var 每个选项投的票数 = optionVotes.value[a]//通过这个对象找到对应的53/54/55/56号票 是一个数组 数组长度就是代表了几个人投了
      if(totalUsers == 0) {
        result[a] = '0%'
      } else {
        result[a] = (每个选项投的票数.length / totalUsers * 100).toFixed(1) + '%'
      }
    }
    return result
  })

  // console.log(optionVotes)
  // console.log(optionPercentage)
//计算当前用户对每个选项有无投票

  var optionVotesByCurrentUser = computed(() => {
    var result: any = {}
    for(var optionId in optionVotes.value) {
      var votes = optionVotes.value[optionId]//每一个数组
      if(votes.some((it:any) => it.userId == voteStore.user?.userId)) {
        result[optionId] = true
      } else {
        result[optionId] = false
      }
    }
    return result
  })

  var showButtonBottom = computed(() =>  {
    //.非匿名投票不显示
    if (!voteInfo.vote.anonymous) {
      return false
    }
    //过了截至日期不显示
    var d = new Date().toISOString()
    if (d > voteInfo.vote.deadline) {
      return false
    }
    //
    if (voteInfo.vote.anonymous && Object.values(optionVotesByCurrentUser.value).some(it => it == true) ) {
      return false
    }
    return true
  })

    var selectedOptionId = ref<number[]>([])//记录选中了哪些选项

    //模板中用来显示√的数据
    var optionChecked = computed(() => {
      if (showButtonBottom.value) {
        var result: any = {}
        for (var id of selectedOptionId.value) {
          result[id] = true
        }
        return result
      }
      return optionVotesByCurrentUser.value
    })
    console.log(optionChecked)

    var isVoting = ref(false)//是否正在发起请求
    var lastClickOptionId = ref(-1) //点的是哪一个选项

    // var size= useWindowSize()  //窗口尺寸不可靠

    

    // var 头像个数 = computed(() => {return Math.floor((size.value.width + 8)/40)})
    var avatarContainer = ref<null | HTMLElement[]>(null)//这个ref可能会传给多个元素
    var firstAvatarContainer = computed(() => {
      return avatarContainer.value?.[0]
    })
    var { width }= useElementSize(firstAvatarContainer)
    var 头像个数 = computed(() => {return Math.floor((width.value + 8)/40)})

    // 头像展开是一个数组(选项个数为数组的个数),刚开始都为假,点一下才为真
    var 选项头像展开 = ref<boolean[]>(new Array(voteInfo.options.length).fill(false))

    function visibleAvatars(optionIndex: number) {
      var { optionId } = voteInfo.options[optionIndex] //获取当前选项ID
      //如果当前头像是展开的状态,则返回该选项所有的信息供其遍历里面的头像
      if(选项头像展开.value[optionIndex]) {
        return optionVotes.value[optionId]
      }else {
        return optionVotes.value[optionId].slice(0, 头像个数.value - 1)
      }
    }

  function handleOptionClick(optionId: number) {
    //非匿名,点击即发起请求
    lastClickOptionId.value = optionId
    if (!voteInfo.vote.anonymous) {
      isVoting.value = true
      
      axios.post(`/vote/${voteInfo.vote.voteId}`, {
        optionIds: [optionId]
      }).then(res => {
        isVoting.value = false
        // console.log(res.data.result)
        voteInfo.userVotes = res.data.result.userVotes
      })
    } else {//匿名的话,点击只是选中该项,点提交才发送请求,且不不能再发送了
      //选中当前项,并且记下  投过之后按钮消失
      //如果该数组包含这个选项的id,则再点击  需要清楚掉这项.如果不包含,则添加进去
      if (showButtonBottom.value) {
        if (selectedOptionId.value.includes(optionId)) {
          var index = selectedOptionId.value.indexOf(optionId)
          selectedOptionId.value.splice(index, 1)
        } else {
          if (!voteInfo.vote.multiple) {
            //如果是单选
            selectedOptionId.value = [optionId]
          } else {
            selectedOptionId.value.push(optionId)//将选择的那个选项push'到这个记录数组中
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
</script>

<style lang="less" scoped>

</style>
