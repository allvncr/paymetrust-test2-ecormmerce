<template>
  <div class="detail">
    <div class="top-breadcum">
      <div class="container">
        <Breadcrumb :home="home" :model="items" />
      </div>
    </div>
    <section class="container">
      <div class="grid" v-if="store.product">
        <div class="left">
          <Image
            v-if="store.product.image"
            :src="store.product.image"
            :alt="store.product.name"
            preview
          />
        </div>
        <div class="right">
          <div class="product">
            <h1 class="product__title">
              {{ store.product.name }}
            </h1>
            <div class="price">
              <span class="price__regular">
                {{ store.product.price }}
              </span>
            </div>
            <div class="product__description">
              {{ store.product.description }}
            </div>
            <div class="product__type">
              <span class="product-type">Brand</span>:
              <span>
                {{ store.product.brand }}
              </span>
            </div>
            <div class="product__type">
              <span class="product-type">Reference ID</span>:
              <span>
                {{ store.product.objectID }}
              </span>
            </div>
            <div class="product__type">
              <span class="product-type">Categories</span>:
              <span v-for="(categorie, i) in store.product.categories" :key="i">
                {{ categorie }}
                <span v-if="i !== store.product.categories.length - 1">, </span>
              </span>
            </div>
            <div class="product__type">
              <span class="product-type">Popularity</span>:
              <span>
                {{ store.product.popularity }}
              </span>
            </div>
            <form class="product__type" @submit.prevent="handlePanier">
              <span class="product-type">Quantité</span>:
              <InputNumber
                v-model="inputValue"
                showButtons
                :min="1"
                :step="1"
                buttonLayout="horizontal"
                decrementButtonClassName="p-button-secondary"
                incrementButtonClassName="p-button-secondary"
                incrementButtonIcon="pi pi-plus"
                decrementButtonIcon="pi pi-minus"
                required
              />
              <Button
                class="AddPanier"
                type="submit"
                label="Ajouter au panier"
                :loading="panierLoader"
              />
              <Toast position="bottom-left" group="bl" />
            </form>
          </div>
        </div>
      </div>
      <div class="product-single__description">
        <Fieldset legend="Description" toggleable>
          <p class="description">
            {{ store.product.description }}
          </p>
        </Fieldset>
      </div>
    </section>
  </div>
</template>

<script>
import { usePanierStore } from '../stores/panier'
import { useStore } from '../stores/store'

export default {
  data() {
    return {
      home: {
        icon: 'pi pi-home',
        to: '/'
      },
      items: [{ label: 'Boutique', to: '/' }],
      panierStore: usePanierStore(),
      store: useStore(),
      inputValue: 1,
      panierLoader: false
    }
  },
  computed: {},
  methods: {
    handlePanier(event) {
      this.panierLoader = true
      if (!this.inputValue) {
        event.preventDefault()
        setTimeout(() => {
          this.showError()
        }, 500)
      } else {
        setTimeout(() => {
          const result = this.panierStore.addToCard(this.store.product, this.inputValue)
          if (result) this.showSuccess()
          else this.showError('Nombre maximun en stock atteint')
        }, 500)
      }
      this.$forceUpdate()
    },
    showSuccess() {
      this.$toast.add({
        severity: 'success',
        summary: 'Succes',
        detail: 'Produit ajouté au panier',
        group: 'bl',
        life: 3000
      })
      this.panierLoader = false
      this.inputValue = 1
    },
    showError(msg) {
      this.$toast.add({
        severity: 'error',
        summary: 'Erreur',
        detail: msg ? msg : 'Quantité requis !',
        group: 'bl',
        life: 3000
      })
      this.panierLoader = false
    }
  },
  watch: {
    '$route.params': {
      handler(newParams, oldParams) {
        if (newParams.slug) {
          this.store
            .one_product(newParams.slug)
            .then(() => {
              this.items = [
                { label: 'Boutique', to: '/' },
                {
                  label: this.store.product.name,
                  to: '/product/' + newParams.slug
                }
              ]
            })
            .catch(() => {
              this.$router.push('/404')
            })
        } else {
          this.$router.push('/')
        }
      },
      immediate: true
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.detail {
  padding-bottom: 64px;
}
.grid {
  @media screen and (max-width: $phone) {
    flex-direction: column;
  }
  display: flex;
  flex-wrap: wrap;

  .left {
    @media screen and (max-width: $phone) {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    position: relative;
    width: 41%;
    padding: 15px;
    overflow: hidden;
    .p-image {
      max-height: 375px;
    }
  }

  .right {
    @media screen and (max-width: $phone) {
      width: 100%;
    }
    width: 59%;
    padding: 15px;
  }
}

.product {
  .product__title {
    color: $black;
    word-break: break-word;
    font-size: 23px;
    font-weight: 600;
    text-transform: capitalize;
    margin: 10px 0;
    width: 100%;
  }

  .price {
    display: flex;
    gap: 8px;
    font-size: 22px;
    font-weight: 500;
    letter-spacing: 0;
    color: $red;
  }
  .product__description {
    color: $grey;
    border-bottom: 1px solid #313131;
    padding-bottom: 3px;
    margin: 10px 0;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .product__type {
    margin: 10px 0 0;
    color: $grey;

    .product-vendor_name,
    .product-type {
      text-transform: capitalize;
      display: inline-block;
      min-width: 130px;
      font-weight: 500;
      color: $black;
    }

    a {
      color: $grey;
      &:hover {
        color: $black;
      }
    }
  }

  .AddPanier {
    @media screen and (max-width: $phone) {
      margin-top: 8px;
      margin-left: 0;
      width: 100%;
    }
    background-color: $green !important;
    border-color: $green !important;
    margin-left: 8px;
    border-radius: 0;

    &:hover {
      background-color: $black !important;
      border-color: $black !important;
    }
  }
}

.product-single__description {
  margin: 40px auto;

  .description {
    color: $black;
    letter-spacing: 0.5px;
    line-height: 24px;
  }
}
</style>
