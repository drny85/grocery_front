class ShoppingCart {
    constructor(items = [], totalAmount = 0, totalQuantity = 0) {
        this.items = items;
        this.totalAmount = totalAmount;
        this.totalQuantity = totalQuantity
    }

    addToCart(item) {
        let found = this.isInCart(item);
        if (found) {



        }
    
    }

    isInCart(item) {
        
        this.items.forEach(i => {
            if (item.id === i) return true
            return false;
        })
    }
}