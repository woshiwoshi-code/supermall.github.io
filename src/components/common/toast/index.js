import Toast from './Toast.vue'
const obj = {}
obj.install = function(Vue) {
    // Vue.extend(Toast)
    // console.log("1", Vue);
    // document.body.appendChild(Toast.$el)

    //创建组件构造器
    const toastContrustor = Vue.extend(Toast)

    //new的方式 根据组件构造器,创建一个组件
    const toast = new toastContrustor()

    //将组件对象，手动挂载到某一元素
    toast.$mount(document.createElement("div"))

    //
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast

}

export default obj
