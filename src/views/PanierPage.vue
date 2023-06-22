<template>
  <div>
    <div class="top-breadcum">
      <div class="container">
        <Breadcrumb :home="home" :model="items" />
      </div>
    </div>
    <section class="container">
      <h1 class="title" v-show="panierStore.getPanierRows">Votre panier</h1>
      <form @submit.prevent="handleCheckout" v-if="panierStore.getPanierRows">
        <table>
          <thead>
            <tr>
              <th colspan="1" scope="col">Produit</th>
              <th colspan="1" scope="col"></th>
              <th colspan="1" scope="col" class="right prix">Prix</th>
              <th colspan="1" scope="col" class="center">Qté</th>
              <th colspan="1" scope="col" class="center">Total</th>
              <th colspan="1" scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in panierStore.panier" :key="i">
              <td>
                <img :src="item.image" :alt="item.objectID" />
              </td>
              <td>
                <router-link :to="'/products/' + item.objectID">{{ item.name }}</router-link>
              </td>
              <td class="right prix">
                <span class="price">
                  {{ financial(item.price) }}
                </span>
              </td>
              <td class="center">{{ item.quantite }}</td>
              <td class="center">
                <span class="price">
                  {{ totalHT(item) }}
                </span>
              </td>
              <td class="right">
                <div class="action" @click="panierStore.removeFromCard(item)">
                  <span class="pi pi-trash"></span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <router-link class="action" to="/">Poursuivre les achats</router-link>
        <div class="cart__footer">
          <div class="calculs">
            <div class="js-contents">
              <div class="totals">
                <h3>Total</h3>
                <p>
                  {{ financial(panierStore.getPanierPrices) }}
                </p>
              </div>
              <small>Les frais de livraison sont inclus.</small>
              <button type="submit" class="action white">Livraison</button>
            </div>
          </div>
        </div>
      </form>
      <template v-else>
        <div class="no-more-item">
          <div class="no-cart">
            <cartEmpty color="#000"></cartEmpty>
          </div>
          <div class="cart-empty">Votre panier est vide.</div>
          <router-link class="action" to="/">Poursuivre les achats</router-link>
        </div>
      </template>
    </section>
  </div>
</template>

<script>
import { usePanierStore } from '../stores/panier'
import formatMoney from 'accounting-js/lib/formatMoney.js'
import cartEmpty from '../components/icons/cart-empty.vue'

export default {
  components: { cartEmpty },
  data() {
    return {
      home: {
        icon: 'pi pi-home',
        to: '/'
      },
      items: [{ label: 'Panier', to: '/panier' }],
      panierStore: usePanierStore()
    }
  },
  methods: {
    handleCheckout() {
      this.$router.push('/')
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
    },

    totalHT() {
      return (item) => {
        return this.financial(+item.quantite * +item.price)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  color: $black;
  font-weight: 600;
  font-size: 40px;
  text-align: center;
  text-transform: capitalize;
  letter-spacing: 0.2px;
  line-height: 50px;
  margin: 0 0 40px;
  padding-bottom: 15px;
  &::before {
    content: '';
    border: 2px solid $primary;
    width: 70px;
    position: absolute;
    bottom: 0;
    margin: 0 auto;
    display: block;
    right: 0;
    left: 0;
  }
}

table {
  color: $black;
  border-spacing: 0;
  border-collapse: separate;
  box-shadow: none;
  width: 100%;
  display: table;
  padding-bottom: 1rem;
  margin-bottom: 1rem;

  thead th {
    text-transform: uppercase;
    border-bottom: 1px solid #313131;
    text-align: left;
    font-weight: 500;
    padding-bottom: 18px;
    line-height: 18px;
  }

  tbody td {
    @media screen and (max-width: $phone) {
      padding: 16px 0;
      font-size: 12px;
    }
    vertical-align: middle;
    padding: 24px 0;
    border-bottom: 1px solid #313131;

    img {
      @media screen and (max-width: $phone) {
        height: 56px;
      }
      width: auto;
      height: 75px;
    }

    a {
      color: $black;

      &:hover {
        color: $primary;
      }
    }

    .price {
      @media screen and (max-width: $phone) {
        font-size: 12px;
      }
      color: $red;
      font-weight: 600;
      font-size: 15px;
      letter-spacing: 0.2px;
    }
  }

  .prix {
    @media screen and (max-width: $phone) {
      display: none;
    }
  }

  .right {
    text-align: right;
  }
  .center {
    text-align: center;
  }
}

.action {
  cursor: pointer;
  max-width: 215px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $green;
  border: 1px solid $green;
  color: $white;

  font-size: 14px;
  letter-spacing: 0.5px;
  line-height: 21px;
  font-weight: 500;
  text-transform: capitalize;
  padding: 12px 0;

  &:hover {
    color: $white;
    background-color: $black;
    border-color: $black;
  }
}

.cart__footer {
  @media screen and (max-width: $phone) {
    display: flex;
    flex-direction: column;
  }
  padding: 40px 0 50px;
  display: flex;
  justify-content: flex-end;

  label {
    color: $black;
  }

  .js-contents {
    @media screen and (max-width: $phone) {
      margin-top: 12px;
    }
  }

  .calculs {
    .totals {
      @media screen and (max-width: $phone) {
        justify-content: center;
      }
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
      line-height: 1;

      h3 {
        @media screen and (max-width: $phone) {
          font-size: 14px;
        }
        font-size: 16px;
      }

      p {
        @media screen and (max-width: $phone) {
          font-size: 16px;
        }
        color: $dark;
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 0;
      }
    }
    small {
      @media screen and (max-width: $phone) {
        text-align: center;
      }
      display: block;
      margin: 22px 0;
      text-align: right;
      font-size: 14px;
      color: $dark;
    }

    .white {
      @media screen and (max-width: $phone) {
        margin: auto;
      }
      cursor: pointer;
      background-color: $black;
      border-color: $black;
      color: $white;
      width: 100%;

      &:hover {
        background-color: $blue;
        border-color: $blue;
      }
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
    margin: 20px 30px;
    font-size: 24px;
    color: $black;
  }

  .action {
    margin: auto;
  }
}
</style>
