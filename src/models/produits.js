export default class Product {
  constructor(data) {
    this.objectID = data.objectID
    this.name = data.name
    this.brand = data.brand
    this.categories = data.categories
    this.description = data.description
    this.image = data.image
    this.popularity = data.popularity
    this.price = data.price
  }

  static create(data) {
    return new Product(data)
  }
}
