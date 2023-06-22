import { defineStore } from 'pinia'
import Product from '../models/produits'
import algoliasearch from 'algoliasearch'
const client = algoliasearch('LHEHRAOCPA', '039d338da9355ed3ebcc46d2c61d6a62')

export const useStore = defineStore('Store', {
  state: () => {
    return {
      algoliaIndex: null,
      products: [],
      product: {},
      totalProducts: 0,
      brands: [],
      categories: []
    }
  },
  getters: {},
  actions: {
    async all_products({ page, perPage, search, filters }) {
      page = page - 1
      const index = client.initIndex('dev_PRODUCTS')
      const { hits, nbHits } = await index.search(search, {
        page,
        hitsPerPage: perPage,
        facetFilters: filters
      })

      this.products = hits.map((item) => Product.create(item))
      this.totalProducts = nbHits

      const brands = await index.searchForFacetValues('brand')

      this.brands = brands.facetHits

      const categories = await index.searchForFacetValues('categories')

      this.categories = categories.facetHits

      return hits
    },

    async one_product(slug) {
      this.product = {}
      const index = client.initIndex('dev_PRODUCTS')
      const data = await index.getObject(slug)

      this.product = Product.create(data)
      return data
    }
  }
})
