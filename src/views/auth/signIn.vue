<template>
  <div class="formContainer">
    <v-content>
      <v-container fluid fill-height>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="blue-grey darken-3">
              <v-toolbar-title class="text-white">Login form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form @submit="formController.LoginUser">
                <Input
                  v-model="formController.email"
                  type="email"
                  label="Email"
                  :value="formController.email"
                />
                <div class="text-center">
                  <Button
                    depressed
                    color="blue-grey darken-3"
                    class="text-white"
                    label="Login"
                    type="submit"
                  />
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-container>
    </v-content>
  </div>
</template>

<script lang="ts" >
import { defineComponent, reactive } from "@vue/runtime-core";
import Button from "../../components/Button.vue";
import Input from "../../components/Input.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Actions } from "@/store/enums/StoreEnums";
import { onMounted, ref } from "vue";
export default defineComponent({
  components: {
    Button,
    Input,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const userInfo = ref<any[]>([]);
    onMounted(async () => {
      let data = await fetch("https://jsonplaceholder.typicode.com/users");
      let userData = await data.json();
      userInfo.value = userData;
    });
    const formController = reactive({
      email: "",
      LoginUser: () => {
        userInfo.value.filter(async (element) => {
          if (element.email === formController.email) {
            element.isAuthenticated = true;
            store.dispatch(Actions.LOGIN_USER, element);
            router.push("/dashboard");
          }
        });
      },
    });

    return {
      formController,
    };
  },
});
</script>