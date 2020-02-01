class Item {
    /**
     * @param {string} id
     * @param {string} name
     * @param {number} price
     * @param {string} imageUrl
     * @param {string} description
     */
    constructor( id, name, price, imageUrl, description ) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

}

export default Item;