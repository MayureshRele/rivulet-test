import { createStore } from 'vuex'
import { config } from "vuex-module-decorators";
import AuthModule from "@/store/modules/AuthModule"
import ProductModule from "@/store/modules/ProductModule"
import ModalModule from '@/store/modules/ModalModule'
config.rawError = true;
export default createStore({
  modules: {
    AuthModule,
    ProductModule,
    ModalModule
  },
 
})
