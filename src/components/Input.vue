<template>
  <v-text-field
    :label="label"
    :placeholder="placeholder"
    :value="value"
    variant="outlined"
    v-bind="$attrs"
    v-on="on"
    :type="type"
  ></v-text-field>
</template>

<script lang="ts" >
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "Custom-Input",
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
    },
    value: {
      type: String,
      default: "",
    },
  },
});
</script>

<style>
</style>