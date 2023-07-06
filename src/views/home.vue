<template>
  <div class="page">
    <file-input
        class="file-input"
        @file="read($event.files)"
    />
    <p>preloader...: {{ fileReadLoading }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FileInput from '@/components/FileInput.vue'
import { fileReadUse } from '@/composable/file-read.use'
import { useRouter } from 'vue-router/composables'

export default Vue.extend({
  name: 'Home',
  components: {
    FileInput
  },

  setup () {
    const {
      fileReadLoading,
      fileRead
    } = fileReadUse()
    const router = useRouter()

    const read = async (files: File[]) => {
      if (!files.length) return
      try {
        await fileRead(files[0])
        router.push({ name: 'showcase' })
      } catch (e) {
        console.error(e)
        alert(e)
      }
    }

    return {
      fileReadLoading,
      read
    }
  }
})
</script>

<style lang="scss" scoped>
  .page {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .file-input {
    width: 100%;
    max-width: 600px;
    align-self: center;
    height: 200px;
  }
</style>
