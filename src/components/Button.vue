<template>
  <v-btn variant="outlined">{{ label }}</v-btn>
</template>

<script lang="ts" >
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "Custom-Button",
  props: {
    label: {
      type: String,
      required: true,
    },
  },
});
</script>

<style>
</style>