<template>
  <div class="breadcrumb">
    <div
        v-for="(breadcrumb, i) in breadcrumbs"
        :key="breadcrumb.id"
        class="d-flex"
        @click="deleteBreadcrumb(i)"
        @mouseenter="hoverElement = i"
        @mouseleave="hoverElement = -1"
    >
      <div
          class="breadcrumb-element"
          :class="i + 1 > hoverElement && hoverElement != -1 ? 'mode-delete' : null"
      >{{ breadcrumb.name }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, PropType, ref
} from 'vue'
import { dataGroupsUse } from '@/composable/data-groups.use'
import { vModelUse } from '@/composable/v-model.use'

export default defineComponent({
  props: {
    value: {
      type: Array as PropType<Array<number>>,
      default: () => ([])
    }
  },
  name: 'Breadcrumb',
  setup (props, { emit }) {
    const selectedGroupsId = vModelUse(props, emit)
    const hoverElement = ref(-1)

    const {
      dataGroups
    } = dataGroupsUse()

    const breadcrumbs = computed(
      () => selectedGroupsId.value.map(
        (groupId) => dataGroups.value.find(
          (dGroup) => dGroup.id === groupId
        )
      )
    )

    const deleteBreadcrumb = (i: number) => {
      selectedGroupsId.value.length = i
      selectedGroupsId.value = [...selectedGroupsId.value]
      hoverElement.value = -1
    }

    return {
      selectedGroupsId,
      breadcrumbs,
      deleteBreadcrumb,
      hoverElement
    }
  }
})
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: flex;
  align-self: center;
  margin-left: 15px;
  overflow-x: auto;
}

.breadcrumb-element {
  border: solid 1px #ccc;
  border-radius: 2px;
  margin-right: 4px;
  padding: 4px;
  font-size: 16px;
  cursor: pointer;
  background-color: #787878;
  color: #fff;
  white-space: nowrap;

  &:after {
    content: '->';
  }

  &.mode-delete {
    background-color: #c1c1c1;
  }
}
</style>
