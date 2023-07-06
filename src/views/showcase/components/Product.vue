<template>
  <div class="product">
    <div v-if="!productsByGroupId.length" class="product-empty">
      <p class="product-empty-text">В выбранной группе товаров нет</p>
    </div>
    <div
        v-for="item in productsByGroupId"
        :key="item.id"
        class="product-card"
    >
      <p class="product-card-title">
        {{ item | getNested('product.name') }}
      </p>
      <p
          class="product-card-description"
          v-if="item.product && item.product.description"
      >
        {{ item | getNested('product.description') }}
      </p>
      <p class="product-card-price">
        <span>{{ item | getNested('product.price') }}</span>
        <span
            v-if="item.product && item.product.weight"
        >за {{ item | getNested('product.weight') }} {{ item | getNested('product.unitType') }}</span>
      </p>
    </div>

  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, PropType
} from 'vue'
import { dataItemsUse } from '@/composable/data-items.use'
import { vModelUse } from '@/composable/v-model.use'

export default defineComponent({
  name: 'Product',
  props: {
    value: {
      type: Array as PropType<Array<number>>,
      default: () => ([])
    }
  },
  setup (props, { emit }) {
    const selectedGroupsId = vModelUse(props, emit)

    const {
      dataItems
    } = dataItemsUse()

    const productsByGroupId = computed(() => {
      const showGroupId = selectedGroupsId.value[selectedGroupsId.value.length - 1] || 0
      return dataItems.value.filter((item) => item.groupId === showGroupId)
    })

    return {
      selectedGroupsId,
      productsByGroupId
    }
  }
})
</script>

<style lang="scss" scoped>
.product {
  display: grid;
  grid-template-columns: repeat( auto-fill, minmax(250px, 1fr) );
}

.product-card {
  padding: 15px;
  background-color: #787878;
  border-radius: 4px;
  box-shadow: 2px 2px 10px #ccc;
  transition: all .2s;
  cursor: pointer;
  margin: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: scale(1.1);
  }
}

.product-card-title {
  color: #fff;
  margin: 0;
}

.product-card-description {
  color: #fff;
  margin: 10px 0;
}

.product-card-price {
  color: #fff;
  margin: 0;
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
