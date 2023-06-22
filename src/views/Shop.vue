<template>
  <div>
    <div class="top-breadcum">
      <div class="container">
        <Breadcrumb :home="home" :model="items" />
      </div>
    </div>

    <main class="main-content" v-show="store.totalProducts">
      <div class="sidebar">
        <div class="category-box">
          <h3 class="box-heading">Trier par Brand</h3>
          <Dropdown
            class="select"
            v-model="brandSelected"
            :options="store.brands"
            optionLabel="highlighted"
            optionValue="value"
            @change="handleSort"
            placeholder="Filtre brand"
            showClear
          ></Dropdown>
        </div>

        <div class="category-box">
          <h3 class="box-heading">Trier par categories</h3>
          <Dropdown
            class="select"
            v-model="catSelected"
            :options="store.categories"
            optionLabel="highlighted"
            optionValue="value"
            @change="handleSort"
            placeholder="Filtre categorie"
            showClear
          ></Dropdown>
        </div>
      </div>
      <div class="main-container">
        <div class="filtres">
          <p>{{ store.totalProducts }} Produit(s)</p>
        </div>
        <produit-list></produit-list>
        <div class="pagination">
          <Paginator
            :rows="perPage"
            :first="(page - 1) * perPage"
            :totalRecords="store.totalProducts"
            v-model:currentPage="page"
            :template="customTemplate"
            @input="onPageChange"
          />
        </div>
      </div>
    </main>
    <main class="container" v-show="!store.totalProducts">
      <div class="search">
        <h1 class="h2">Résultats de la recherche</h1>
        <p class="status">
          Aucun résultat trouvé pour "{{ search }}". Vérifiez l'orthographe ou utilisez un autre mot
          ou une autre phrase.
        </p>
      </div>
    </main>
  </div>
</template>

<script>
import { useStore } from '../stores/store'
import ProduitList from './ProduitList.vue'
export default {
  components: { ProduitList },
  data() {
    return {
      home: {
        icon: 'pi pi-home',
        to: '/',
        command: () => {
          this.$router.go()
        }
      },
      items: [
        {
          label: 'Boutique',
          to: '/',
          command: () => {
            this.$router.go()
          }
        }
      ],
      store: useStore(),
      page: 1,
      perPage: 16,
      search: '',
      customTemplate: {
        default: 'PrevPageLink PageLinks NextPageLink'
      },
      brandSelected: null,
      catSelected: null
    }
  },
  methods: {
    handleSort() {
      this.store.all_products({
        page: this.page,
        perPage: this.perPage,
        search: this.search,
        filters: [`brand:${this.brandSelected}`, `categories:${this.catSelected}`]
      })
    },
    onPageChange(newPage) {
      const currentQuery = { ...this.$route.query }
      currentQuery.page = parseInt(newPage.page + 1)
      this.$router.push({ query: currentQuery })
    }
  },
  watch: {
    '$route.query': {
      handler(newQuery, oldQuery) {
        if (newQuery.search) this.search = newQuery.search
        if (newQuery.page) this.page = newQuery.page
        else this.page = 1

        this.brandSelected = null
        this.catSelected = null

        this.store.all_products({
          page: this.page,
          perPage: this.perPage,
          search: newQuery.search
        })

        window.scrollTo(0, 0) // Faire défiler la page vers le haut
      },
      immediate: true
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.main-content {
  display: flex;
  justify-content: space-between;
  margin: auto;
  padding: 0 15px 64px;
  max-width: 1400px;
  .sidebar {
    @media screen and (max-width: $ordi) {
      display: none;
    }
    width: 21%;
  }
  .main-container {
    @media screen and (max-width: $ordi) {
      width: 100%;
    }
    width: 78%;
  }
}

.category-box {
  padding: 16px 20px;
  width: 100%;
  margin-bottom: 30px;
  border: 1px solid #313131;

  .box-heading {
    color: $black;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    margin: 0 0 10px;
    padding-bottom: 15px;
    text-transform: capitalize;
    border-bottom: 1px solid #313131;
  }

  summary {
    padding: 0;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 8px;
    line-height: 25px;
  }

  .site-cat {
    margin: 8px 0;

    li {
      padding: 0;
      width: 100%;
      position: relative;
      line-height: 30px;
      color: $grey;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      &:hover {
        color: $black;
      }
    }
  }
}

.filtres {
  color: $black;
  text-align: right;
  margin-bottom: 10px;
}
.pagination {
  margin-top: 4rem;
}

.editeur {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .router-link-active {
    color: $primary !important;
  }

  span {
    font-size: 12px;
    color: $grey !important;
  }
}

.search {
  text-align: center;
  width: 100%;
  margin-bottom: 80px;
  padding-bottom: 18rem;

  h1 {
    font-size: 2.4rem;
    line-height: 1.3;
    color: $black;
    letter-spacing: 0.06rem;
    margin: 20px 0;
  }

  .status {
    color: $black;
    margin: 14px 0;
  }
}
</style>
