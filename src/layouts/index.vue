<template>
  <div class="mainContainer">
    <div>
      <v-toolbar app dark color="blue-grey darken-1" class="hidden-xs">
        <v-toolbar-title>Rivulet Digital</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          class="text-white"
          prepend-inner-icon="mdi-magnify"
          label="Search"
          @input="searchData"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <div class="menu-item">
            <v-btn>Home<v-icon class="ml-2">mdi-home-outline</v-icon></v-btn>

            <v-badge color="primary" :content="CartCount">
              <v-btn @click="modalController.open"
                >Cart<v-icon class="ml-2">mdi-cart-outline</v-icon></v-btn
              ></v-badge
            >

            <v-btn @click="Logout"
              >Logout<v-icon class="ml-2">mdi-logout</v-icon></v-btn
            >
          </div>
        </v-toolbar-items>
      </v-toolbar>
      <v-toolbar app dark color="blue-grey darken-3" class="hidden-sm-and-up">
        <v-toolbar-title>Rivulet Digital</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon
          class="text-white"
          @click="dialog = true"
        ></v-app-bar-nav-icon>
        <v-dialog
          v-model="dialog"
          fullscreen
          transition="dialog-bottom-transition"
          hide-overlay
        >
          <v-toolbar-side-icon dark></v-toolbar-side-icon>
          <v-card>
            <v-toolbar flat color="blue-grey darken-2">
              <v-toolbar-title class="text-white"
                >Rivulet Digital</v-toolbar-title
              >
              <v-spacer></v-spacer>
              <v-btn icon @click="dialog = false">
                <v-icon class="text-white">mdi-close</v-icon>
              </v-btn>
            </v-toolbar>

            <v-list>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon>mdi-home-outline</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Home</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <div class="d-flex">
                  <v-list-tile-action>
                    <v-icon>mdi-cart-outline</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title @click="modalController.open"
                      >Cart</v-list-tile-title
                    >
                  </v-list-tile-content>
                  <div class="mx-2 bg-primary rounded-circle">
                    <p class="mx-2 p-5">5</p>
                  </div>
                </div>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-action>
                  <v-icon>mdi-logout</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title @click="Logout">Logout</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </div>
    <CartModal
      id="cart"
      v-if="isCartModal"
      title="Checkout"
      :product="Products"
      @close="modalController.close"
    />
    <router-view />
  </div>
</template>

<script lang="ts">
import { IProduct } from "@/interface/IProduct";
import { Actions } from "@/store/enums/StoreEnums";
import CartModal from "../components/CartModal.vue";
import { computed, defineComponent, ref, reactive } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
export default defineComponent({
  name: "custom-header",
  components: {
    CartModal,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const dialog = ref(false);
    const isCartModal = ref(false);
    const search = ref("");
    const nav = ref([
      {
        icon: "home-outline",
        text: "Home",
        title: "Back to Home page",
        active: true,
      },
      {
        icon: "cart-outline",
        text: `Cart`,
        title: "Our Contact info",
        active: false,
      },
      {
        icon: "logout",
        text: "Logout",
        title: "Logout",
        active: false,
      },
    ]);
    onMounted(() => {
      //check if current user is authenticated
      if (!store.getters.currentUser.isAuthenticated) {
        router.push("/");
      }
    });

    const searchData = () => {
      store.dispatch(Actions.SEARCH_QUERY, search.value);
    };

    const modalController = reactive({
      open() {
        isCartModal.value = true;
        store.dispatch(Actions.IS_MODAL, { isOpen: true });
      },
      close() {
        isCartModal.value = false;
      },
    });
    const Products = computed(() => {
      return store.getters.cartList;
    });
    const Logout = () => {
      store.dispatch(Actions.LOGOUT);
      router.push("/");
    };
    const CartCount = computed(() => {
      return store.getters.CartQtyCount;
    });
    return {
      Products,
      nav,
      dialog,
      modalController,
      isCartModal,
      CartCount,
      search,
      searchData,
      Logout,
    };
  },
});
</script>
