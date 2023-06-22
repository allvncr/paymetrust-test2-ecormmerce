<template>
  <div class="navbar">
    <div class="container">
      <header v-if="!showSearch">
        <div class="logo">PaymeTrust</div>
        <ul class="nav">
          <li>
            <router-link class="navlink" to="/">Boutique</router-link>
          </li>
        </ul>
        <div class="actions">
          <span class="pi pi-search" @click="showSearch = true"></span>
          <div class="panier">
            <span class="pi pi-shopping-cart" @click="visibleRight = true"></span>

            <div class="cart_counter" v-show="panierStore.getPanierRows">
              <span>( {{ panierStore.getPanierRows }} )</span>
            </div>
          </div>
        </div>
      </header>
      <header class="searchMode" v-else>
        <div class="actions">
          <form @submit.prevent="HandleSearch">
            <span class="p-input-icon-left" v-if="!searchLoader">
              <i class="pi pi-search" @click="HandleSearch" />
              <InputText class="inputText" v-model="search" placeholder="Rechercher" />
            </span>

            <span class="p-input-icon-right" v-else>
              <i class="pi pi-spin pi-spinner" />
              <InputText v-model="search" />
            </span>
          </form>
          <span class="pi pi-times" @click="showSearch = false"></span>
        </div>
      </header>

      <Sidebar v-model:visible="visibleRight" position="right">
        <template #header> Votre panier </template>

        <div class="cart">
          <panierVue v-if="panierStore.getPanierRows"></panierVue>
          <template v-else>
            <div class="no-more-item">
              <div class="no-cart">
                <cartEmpty></cartEmpty>
              </div>
              <div class="cart-empty">Votre panier est vide.</div>
            </div>
          </template>
        </div>
      </Sidebar>
    </div>
  </div>
</template>

<script>
import searchIcon from './icons/search-icon.vue'
import cartIcon from './icons/cart-icon.vue'
import cartEmpty from './icons/cart-empty.vue'
import panierVue from './panier.vue'
import { usePanierStore } from '../stores/panier'

export default {
  components: { searchIcon, cartIcon, cartEmpty, panierVue },
  data() {
    return {
      visibleRight: false,
      showSearch: false,
      search: '',
      panierStore: usePanierStore(),
      searchLoader: false
    }
  },
  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event)
    },
    toggleMega(event) {
      this.$refs.mega.toggle(event)
    },
    HandleSearch() {
      this.searchLoader = true

      setTimeout(() => {
        if (this.search) {
          if (this.$route.name != 'shop') this.$router.push('/?search=' + this.search)
          else {
            this.$router.push({ path: this.$route.path, query: { search: this.search } })
          }
        } else {
          this.$router.push('/')
        }
        this.searchLoader = false
        this.search = ''
        this.showSearch = false
      }, 500)
    }
  },
  watch: {
    '$route.path': {
      handler(newRoute, oldRoute) {
        this.visibleRight = false
      },
      immediate: true
    },
    'panierStore.getPanierPrices': {
      handler(newRoute, oldRoute) {
        this.visibleRight = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  padding: 18px 0;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background: $white;
  z-index: 2;
}
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  color: #000;
  font-size: 20px;
}

.nav {
  @media screen and (max-width: $phone) {
    display: none;
  }
  display: flex;

  .navlink {
    padding: 0 15px;
    font-size: 15px;
    line-height: 26px;
    font-weight: 600;
    text-transform: capitalize;
    letter-spacing: 0.6px;
    color: $black;

    &:hover {
      color: $primary;
    }
  }
  .router-link-active {
    color: $primary !important;
  }
}

.actions {
  @media screen and (max-width: $phone) {
    gap: 12px;
  }
  display: flex;
  align-items: center;
  gap: 15px;

  span {
    @media screen and (max-width: $phone) {
      font-size: 14px;
    }
    color: $black;
    cursor: pointer;
    display: block;
    font-size: 18px;
  }
  .panier {
    display: flex;
    align-items: center;
    .cart_counter {
      float: right;
      color: $primary;
      margin-left: 5px;

      span {
        @media screen and (max-width: $phone) {
          font-size: 10px;
        }
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 14px;
        color: $red;
      }
    }
  }
}

.cart {
  height: 100%;

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
      color: #fff;
    }
  }
}

.searchMode {
  form {
    width: 100%;
  }
  .actions {
    @media screen and (max-width: $tablette) {
      width: 80%;
    }
    @media screen and (max-width: $phone) {
      width: 100%;
    }
    display: flex;
    width: 50%;
    margin: auto;
  }
  .pi-times {
    color: $grey;
  }

  .pi-search {
    color: $grey;
  }

  .inputText {
    color: $black;
    &::placeholder {
      color: $grey;
    }
  }
}

.MenuBars {
  display: none;
  @media screen and (max-width: $phone) {
    color: $black;
    display: flex;
    padding: 8px 0;
    font-size: 18px;
  }
}

.dark {
  .navbar {
    background: $dark;

    .navlink {
      color: $white;
    }

    .actions span {
      color: $white;
    }

    .MenuBars {
      color: $white;
    }
    .cart_counter span {
      color: $primary;
    }
  }
}
</style>
