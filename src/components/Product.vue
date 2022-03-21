<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="374">
    <template>
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
    <v-img
      height="250"
      :src="product.image"
      alt="https://randomwordgenerator.com/img/picture-generator/52e9d3414854aa14f1dc8460962e33791c3ad6e04e507441722a72dd964bc7_640.jpg"
    ></v-img>

    <v-card-title>{{ product.name }}</v-card-title>
    <v-card-text>{{ product.description }}</v-card-text>
    <v-divider class="mx-4"></v-divider>
    <div class="card-footer my-4">
      <div class="d-flex">
        <v-card-title>Price</v-card-title>
        <div class="amount">${{ product.price }}</div>
      </div>

      <div class="action-btn">
        <v-btn   v-if="getCurrentUser.id === 1" icon @click="modalController.open" class="mx-2">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn v-if="getCurrentUser.id === 1" icon class="mx-2" @click="productListController.deleteProduct">
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
        <v-btn  icon @click="productListController.addToCart" class="mx-2">
          <v-icon>mdi-plus-thick</v-icon>
        </v-btn>
      </div>
    </div>
  </v-card>
  <Modal
    id="edit"
    v-if="isEditModal"
    title="Edit Product"
    :product="product"
    @close="modalController.close"
    @submit="productListController.checkedit"
  />
</template>

<script lang="ts">
import { IProduct } from "@/interface/IProduct";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import Modal from "./Modal.vue";
import { computed, defineComponent, PropType, reactive, ref } from "@vue/runtime-core";
export default defineComponent({
  name: "card-custom",
  data() {
    return {
      loading: false,
      selection: 1,
    };
  },
  components: {
    Modal,
  },
  props: {
    product: {
      type: Object as PropType<IProduct>,
    },
  },
  setup(props, emitter) {
    const store = useStore();
    const isEditModal = ref(false);

    const getCurrentUser = computed(() => {
     return store.getters.currentUser
    })
    const modalController = reactive({
      open() {
        isEditModal.value = true;
        store.dispatch(Actions.IS_MODAL, { isOpen: true });
      },
      close() {
        isEditModal.value = false;
      },
    });

    const productListController = reactive({
      addToCart() {
        store.dispatch(Actions.ADD_CART_COUNT);
        store.dispatch(Actions.ADD_TO_CART, props.product);
      },
      checkedit(product: IProduct) {
        emitter.emit("editproductData", product);
      },
      deleteProduct() {
        store.dispatch(Actions.DELETE_PRODUCT, props.product);
      },
    });

    return {
      isEditModal,
      modalController,
      productListController,
      getCurrentUser
    };
  },
});
</script>

