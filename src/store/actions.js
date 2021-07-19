import { ADD_COUNTER, ADD_TO_CART } from './mutation-type'

export default {
    addToCart(context, payload) {
        // let old = null
        // for (const iem of state.cart) {
        //     if (item.iid === payload.iid) {
        //         old = item
        //     }
        // }
        // if (old) {
        //     old.count += 1
        // } else {
        //     payload.count = 1
        //     state.cart.push(payload)
        // }
        return new Promise((resolve, reject) => {
            let old = context.state.cart.find(item => item.iid === payload.iid)
            if (old) {
                // old.count += 1
                context.commit(ADD_COUNTER, old)
                resolve("当前的商品数量+1")
            } else {
                payload.count = 1
                    // context.state.cart.push(payload)
                context.commit(ADD_TO_CART, payload)
                resolve("添加了新的商品")

            }

        })
    }
}
