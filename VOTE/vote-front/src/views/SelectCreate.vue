<template>
  <div>
    <h1 class="p-4 text-xl">腾讯投票</h1>
    <div class="grow space-y-4">
      <div class="flex bg-white flex-col items-center justify-center w-full h-72">
        <span class="text-[96px]">📚</span>
        <RouterLink to="/create?type=single" class="py-3 text-center w-2/3 px-16 text-white py-3 bg-blue-500 rounded">创建单选</RouterLink>
      </div>
  
      <div class="flex bg-white flex-col items-center justify-center w-full h-72">
        <span class="text-[96px]">📚</span>
        <RouterLink to="/create?type=multiple" class="px-16 w-2/3 text-white py-3 text-center bg-blue-500 rounded">创建多选</RouterLink>
      </div>
    </div>
    </div>
  </template>

  