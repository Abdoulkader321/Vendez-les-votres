import goods from '../data/goods';

export default class Fetch {

    getOthersGoods(id) {
        const goodsList = Array.from(goods);
        return goodsList.filter(good => good.ownerId !== id);
    }

    getMyGoods(id) {
        const goodsList = Array.from(goods);
        return goodsList.filter(good => good.ownerId === id);
    }

    deleteItem(id) {
        const goodsList = Array.from(goods);
        return goodsList.filter(good => good.ownerId !== id);
    }

    buyItem(id, buyerId)
    {
        const goodsList = Array.from(goods);
        goodsList.forEach(good => {
            if (good.id === id) good.ownerId = buyerId;
        })
    }

}