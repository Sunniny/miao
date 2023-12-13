<template>
  <div>
    <h1 class="p-4 text-xl">我的</h1>
    <div class="flex items-center gap-4 p-12">
      <img class="rounded-full w-16 h-16" src="https://dummyimage.com/50x50/000/fff" alt=""> <span>大喵</span>
    </div>
    <div class="bg-white divide-y">
      <RouterLink class="block h-16 flex items-center justify-between px-4" to="/my-votes">
        我的投票
        <el-icon>
          <ArrowRightBold />
        </el-icon>
      </RouterLink>
      <RouterLink class="block h-16 flex items-center justify-between px-4" to="/my-settings">
        个人设置
        <el-icon>
          <ArrowRightBold />
        </el-icon>
      </RouterLink>
      <RouterLink class="block h-16 flex items-center justify-between px-4" to="">
        反馈建议
        <el-icon>
          <ArrowRightBold />
        </el-icon>
      </RouterLink>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { useLogin } from '@/hooks'
    useLogin()

</script>
