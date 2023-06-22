<template>
  <div>
    <div class="collection">
      <ul class="product-grid">
        <li class="grid_item" v-for="product in store.products" :key="product.objectID">
          <div class="card-img">
            <router-link :to="'/products/' + product.objectID">
              <img :src="product.image" :alt="product.name" />
            </router-link>
          </div>
          <div class="card-information">
            <span class="card-information__text">
              <router-link :to="'/products/' + product.objectID">{{ product.name }}</router-link>
            </span>
            <div class="price">
              <span class="price__regular"> {{ product.price }} </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useStore } from '../stores/store'

export default {
  data() {
    return {
      store: useStore()
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.product-grid {
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: $phone) {
    justify-content: space-between;
  }
}

.grid_item {
  @media screen and (max-width: $tablette) {
    width: 33%;
  }
  @media screen and (max-width: $phone) {
    width: 49%;
    padding: 30px 0;
  }
  width: 25%;
  padding: 30px 15px 0;
  overflow: hidden;
  flex-grow: 0;
  flex-shrink: 0;

  .card-img {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      @media screen and (max-width: $phone) {
        height: 176px;
      }
      width: auto;
      height: 246px;
    }
  }

  .card-information {
    text-align: center;

    &__text a {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      font-size: 15px;
      font-weight: 500;
      color: $black;

      &:hover {
        color: $primary;
      }
    }

    .price {
      display: flex;
      justify-content: center;
      gap: 8px;

      &__regular {
        font-size: 14px;
        font-weight: 500;
        color: $red;
        letter-spacing: 0;
      }
    }
  }
}
</style>
