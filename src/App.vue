<template>
  <v-app>
    <sm-header/>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SmHeader from '@/components/SmHeader.vue'

export default defineComponent({
  name: 'App',

  components: {
    SmHeader
  }
})
</script>
