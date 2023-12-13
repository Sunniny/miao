import {useRoute} from 'vue-router'
import { useVoteStore } from '@/stores/vote'
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue'

export function useLogin() {
  var voteStore = useVoteStore()
  var router = useRouter() 
  var route = useRoute()
  // console.log(voteStore.user,"1111")
    
  if(voteStore.user == null) {
    // router.push('/login')
    router.replace('/login?next=' + route.fullPath)
    
    // router.replace('/login')//换成replace 可以后退,但用push不会后退,因为此时会再次判断用户名为空.就又进入了login页面
    return false
  }
  return true
}
export function useSelectOne() {
  var selectedIndex = ref(-1)

  function setSelected(idx:number) {
    if(selectedIndex.value == idx){
      selectedIndex.value = -1
    }else {
      selectedIndex.value = idx
    }
  }
  return [selectedIndex,
          setSelected] as const //如果不as const ,则这个数组会被推到为(xxx|yyy)[], 解构出的第一项类型就是xxx|yyy 就会坏掉了
}

var size = ref({
  width: window.innerWidth,
  height: window.innerHeight
})

var listen = false
function onResize() {
  size.value.width = window.innerWidth
  size.value.height = window.innerHeight
}

export function useWindowSize() {
  if(!listen) {
    onMounted(() => {
      listen = true
      window.addEventListener('resize', onResize)//窗口大小改变会触发resize这个事件
    })
    onUnmounted(() => {
      listen = false
      window.removeEventListener('resize', onResize)
    })
  }
  return size
}
