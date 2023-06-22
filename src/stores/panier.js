import { defineStore } from 'pinia'

export const usePanierStore = defineStore('Panier', {
  state: () => {
    return {
      panier: localStorage.getItem('panier') ? JSON.parse(localStorage.getItem('panier')) : []
    }
  },
  getters: {
    getPanierRows: (state) => state.panier.length,
    getPanierPrices: (state) => {
      let total = 0
      state.panier.forEach((item) => {
        total += item.quantite * item.price
      })
      return total
    }
  },
  actions: {
    addToCard(payload, quantite) {
      try {
        payload.quantite = quantite

        const existingProduct = this.panier.find((item) => item.objectID === payload.objectID)
        if (existingProduct) existingProduct.quantite += quantite
        else this.panier.push(payload)

        localStorage.setItem('panier', JSON.stringify(this.panier))
        return true
      } catch (error) {
        return false
      }
    },
    removeFromCard(payload) {
      try {
        this.panier = this.panier.filter((item) => item.objectID != payload.objectID)
        localStorage.setItem('panier', JSON.stringify(this.panier))
        return true
      } catch (error) {
        return false
      }
    },
    cleanCard() {
      localStorage.removeItem('panier')
      this.panier = []
      return true
    }
  }
})
