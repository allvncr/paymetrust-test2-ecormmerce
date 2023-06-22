<template v-if="panierStore.getPanierRows">
  <div class="products">
    <ul class="cart_content">
      <li v-for="(product, i) in panierStore.panier" :key="i">
        <div class="cart-image-block">
          <div class="cart__image">
            <img :src="product.image" :alt="product.name" />
          </div>
        </div>
        <div class="productdetails">
          <div class="product-item__title">
            <router-link :to="'/products/' + product.objectID">
              {{ product.name }}
            </router-link>
            <div class="product-item__price">
              <span class="quantity">{{ product.quantite }}</span>
              X {{ product.price }} €
            </div>
          </div>
          <div class="action" @click="panierStore.removeFromCard(product)">
            <span class="pi pi-trash"></span>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div class="menu">
    <div class="cart-summary">
      <div class="cart-total">
        <div class="cart-total-title">
          <span class="cart__subtotal-title">Totals product</span>
        </div>
        <div class="cart-product-count">
          <span>{{ panierStore.getPanierRows }}</span>
        </div>
      </div>
      <div class="subtotal">
        <span class="cart__subtotal-title">Total</span>
        <span class="cart__subtotal">
          {{ financial(panierStore.getPanierPrices) }}
        </span>
      </div>
    </div>
    <div class="cart-viewcart">
      <router-link to="/panier">Voir le panier</router-link>
      <router-link to="/">Commander</router-link>
    </div>
  </div>
</template>

<script>
import cartEmpty from './icons/cart-empty.vue'
import { usePanierStore } from '../stores/panier'
import formatMoney from 'accounting-js/lib/formatMoney.js'

export default {
  components: { cartEmpty },
  data() {
    return {
      panierStore: usePanierStore()
    }
  },
  computed: {
    financial() {
      return (value, noSymbol = false) => {
        return formatMoney(value, {
          symbol: noSymbol ? '' : '€',
          thousand: ',',
          precision: 0,
          decimal: ',',
          format: '%v %s'
        })
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.cart {
  height: 100%;

  .products {
    height: 83%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .menu {
    border-top: 1px solid #313131;
    font-size: 12px;
    height: 15%;
  }
  .cart-summary {
    padding: 15px 0 0;
    display: flex;
    justify-content: space-between;
    .cart-total {
      text-align: left;
      width: 50%;
      color: $white;
    }

    .subtotal {
      width: auto;
      text-align: center;
      font-weight: 700;

      .cart__subtotal-title {
        font-weight: 500;
        font-size: 14px;
      }

      span {
        width: 100%;
        display: block;
      }
    }
  }

  .cart_content {
    li {
      display: flex;
      font-size: 12px;
      width: 100%;
      margin-bottom: 5px;
      padding: 10px 20px;
      overflow: hidden;

      .cart__image {
        img {
          width: auto;
          max-height: 70px;
        }
      }

      .productdetails {
        display: flex;
        justify-content: space-between;
        flex: 1;
        padding-left: 12px;
      }

      .product-item__title {
        a {
          font-size: 14px;
          font-weight: 400;
          color: $white;
        }

        .product-item__price {
          line-height: 20px;
          margin: 5px 0 0;
          color: $white;
          font-size: 14px;
          font-weight: 500;
        }
      }

      .action {
        cursor: pointer;
        height: fit-content;
      }
    }
  }

  .cart-viewcart {
    padding: 15px 0;
    display: flex;
    justify-content: space-between;

    a {
      @media screen and (max-width: $phone) {
        width: 48%;
        padding: 8px 0;
      }
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: $white;
      border: 1px solid $white;
      color: $black;

      font-size: 14px;
      letter-spacing: 0.5px;
      line-height: 21px;
      font-weight: 500;
      text-transform: capitalize;
      padding: 12px 30px;

      &:hover {
        color: $white;
        background-color: $green;
        border-color: $green;
      }
    }
  }

  .no-more-item {
    display: inline-block;
    width: 100%;
    text-align: center;
    position: relative;

    .no-cart {
      margin-top: 40px;
    }

    .cart-empty {
      margin-top: 20px;
      color: $white;
    }
  }
}
</style>
