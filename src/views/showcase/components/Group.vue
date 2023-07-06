<template>
  <div class="group">
    <div v-if="!selectedGroup.length" class="group-empty">
      <p class="group-empty-text">Дочерних групп нет</p>
      <button
          class="group-empty-button"
          @click="groupBack()"
      >Назад ?</button>
    </div>
    <div
        v-for="group in selectedGroup"
        :key="group.id"
        class="card"
        @click="selectedGroupsId.push(group.id)"
    >
      <div class="card-content">
        <p class="card-content-title">{{ group.name }}</p>
        <p class="card-content-text">Описание</p>
      </div>
      <img
          :src="group.logo"
          alt=""
          class="card-img"
      >
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, PropType
} from 'vue'
import { dataGroupsUse } from '@/composable/data-groups.use'
import { vModelUse } from '@/composable/v-model.use'

export default defineComponent({
  name: 'Group',
  props: {
    value: {
      type: Array as PropType<Array<number>>,
      default: () => ([])
    }
  },
  setup (props, { emit }) {
    const selectedGroupsId = vModelUse(props, emit)

    const {
      dataGroups
    } = dataGroupsUse()

    const selectedGroup = computed(() => {
      const showGroupId = selectedGroupsId.value[selectedGroupsId.value.length - 1] || 0
      return dataGroups.value.filter((item) => item.parentId === showGroupId)
    })

    const groupBack = () => {
      selectedGroupsId.value.splice(selectedGroupsId.value.length - 1, 1)
    }

    return {
      selectedGroupsId,
      selectedGroup,
      groupBack
    }
  }
})
</script>

<style lang="scss" scoped>
.card {
  max-width: 250px;
  height: 200px;
  padding: 15px;
  background-color: #787878;
  margin: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 4px;
  box-shadow: 2px 2px 10px #ccc;
  transition: all .2s;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
}

.card-content-title {
  color: #ffffff;
  font-size: 22px;
  margin: 0;
}

.card-content-text {
  color: #ffffff;
  font-size: 16px;
  margin: 0;
}
.card-img {
  height: 100px;
  object-fit: contain;
}

.group {
  overflow-x: auto;
  display: flex;
  height: 230px;
}

.group-empty {
  text-align: center;
  align-self: center;
  flex: 1;
  font-size: 25px;
}

.group-empty-text {
  color: #939393;
}

.group-empty-button {
  border-radius: 4px;
  background-color: #ccc;
  padding: 8px 16px;
  font-size: 16px;
}
.product-empty {
  text-align: center;
  align-self: center;
  flex: 1;
  font-size: 25px;
  grid-column-start: 1;
  grid-column-end: fill;
}

.product-empty-text {
  color: #939393;
}
</style>
