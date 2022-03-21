<template>
  <div class="text-center">
    <v-dialog v-model="isModal" id="id" scrollable>
      <v-card>
        <v-toolbar dark color="blue-grey darken-3">
          <v-toolbar-title class="text-white">Shopping Cart</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-divider></v-divider>
        <div class="cart" v-if="product.length > 0">
          <v-card-text v-for="item in product" :key="item.id">
            <div class="cartContainer d-flex">
              <v-img
                :src="item.image"
                class="cartImage"
                contain
              ></v-img>
              <div class="d-flex flex-column justify-center ml-5 cartItem">
                <div class="grey--text text-darken-1 mb-2">{{ item.name }}</div>
                <div
                  class="text-truncate grey--text text-darken-1 mb-2"
                  style="max-width: 200px"
                >
                  {{ item.description }}
                </div>
              </div>
              <div class="quantity d-flex align-center ml-5">
                <div class="grey--text text-darken-1 mx-3">{{ item.qty }}</div>
              </div>
              <div
                class="d-flex align-center ml-5"
                @click="cartModalController.removefromcart(item)"
              >
                <v-icon>mdi-minus</v-icon>
              </div>
            </div>
          </v-card-text>
        </div>
        <div class="empty-cart" v-else>
          <v-card-text>
            <h1>Ops! you're cart is empty</h1>
          </v-card-text>
        </div>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="blue darken-1" text @click="modalController.close">
            Close
          </v-btn>
          <v-spacer></v-spacer>
          <div class="grey--text text-darken-1">Cart Total</div>
          <v-card-text class="text-h6">${{ priceTotal }}</v-card-text>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive } from "vue";
import { IProduct } from "@/interface/IProduct";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
export default defineComponent({
  props: {
    id: {
      type: String,
    },
    title: {
      type: String,
    },
    product: {
      type: Object as PropType<IProduct>,
    },
  },
  setup(props, emitter) {
    const store = useStore();
    const isModal = computed(() => {
      return store.getters.Ismodal;
    });

    const selectedproductList = computed(() => {
      return store.getters.cartList;
    });

    const priceTotal = computed(() => {
      let total = 0;

      if (selectedproductList.value.length > 0) {
        selectedproductList.value.forEach((element: any) => {
          total += element.qty * element.price;
        });
        return total;
      } else {
        return (total = 0);
      }
    });

    const modalController = reactive({
      close() {
        emitter.emit("close");
        store.dispatch(Actions.IS_MODAL, { isOpen: false });
      },
    });

    const cartModalController = reactive({
      removefromcart(product: IProduct) {
        store.dispatch(Actions.REMOVE_FROM_CART, product);
      },
    });

    return {
      isModal,
      modalController,
      cartModalController,
      priceTotal,
    };
  },
});
</script>
