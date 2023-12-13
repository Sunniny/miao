
<template>
  <main class="flex flex-col h-[100vh] bg-gray-100" >
    <!-- //直接在routerview上加类名,这样 当哪个组件渲染到这里,就会给这个组件加上类名 -->
    <RouterView class="grow"/> 
    <div class="flex h-12">
      <RouterLink to="/select-create" class="[&.router-link-active]:text-green-500 basis-0 grow flex items-center justify-center">
        <span>➕</span>
        <span>新建</span>
      </RouterLink>
      <RouterLink to="/me" class="[&.router-link-active]:text-green-500 basis-0 grow flex items-center justify-center">
        <span>🧏‍♀️</span>
        <span>我的</span>
      </RouterLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
// import axios from 'axios'


onMounted(async () => {
  // debugger
  // var a = await fetch('/api/account/current-user').then(it => it.json())
  // try {
  //   var a = await axios.get('account/current-user')
  //   voteStore.setUser(user)
  // } catch(e) {
  //   console.log(e)
  // }

})
</script>

