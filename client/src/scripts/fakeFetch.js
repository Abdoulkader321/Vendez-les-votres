import goods from '../data/goods';
import userData from '../data/users';

export default class FakeFetch {

    getOthersGoods(id) {
        const goodsList = Array.from(goods);
        return goodsList.filter(good => good.ownerId !== id);
    }

    getMyGoods(id) {
        const goodsList = Array.from(goods);
        return goodsList.filter(good => good.ownerId === id);
    }

    deleteItem(id) {
        // non fonctionnel
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

    getItem(id)
    {
        const goodsList = Array.from(goods);
        return goodsList.filter(good => good.id === id)[0];
    }

    getUserInfo(id)
    {
        const randomUser = userData[id];
        return randomUser;
    }

}