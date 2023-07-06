<template>
  <div>
    <div class="header">
      <h2 class="title">Группы товаров</h2>
      <breadcrumb v-model="selectedGroupsId"/>
    </div>

    <group v-model="selectedGroupsId"/>

    <h2 class="title">Товары</h2>
    <product v-model="selectedGroupsId"/>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref
} from 'vue'
import Breadcrumb from './components/Breadcrumb.vue'
import Group from './components/Group.vue'
import Product from '@/views/showcase/components/Product.vue'

export default defineComponent({
  name: 'showcase',
  components: {
    Breadcrumb,
    Group,
    Product
  },
  setup () {
    const selectedGroupsId = ref<Array<number>>([])

    return {
      selectedGroupsId
    }
  }
})
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    margin-top: 20px;

    @media (max-width: 900px) {
      display: block;
    }
  }

  .title {
    margin-left: 15px;
    white-space: nowrap;
  }
</style>
