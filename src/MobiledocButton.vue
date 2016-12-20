<template>
  <button
    id="mobiledoc-link-button"
    :class="[isActive ? 'active' : '']"
    @click="toggle">
    <slot/>
  </button>
</template>

<script>
import titlelize, { capitalize } from "./utils/titlelize"

function isLink(tag) {
  return tag === "a" || capitalize(tag) === "Link"
}

export default {
  props: {
    type: { type: String, required: true },
    for: { type: String, required: true }
  },

  computed: {
    typeName() { // markup or section or link
      if (isLink(this.for)) { return "Link" }
      return titlelize(this.type)
    },

    tagName() { // e.g. markup: strong, section: h1, link: a 
      if (isLink(this.for)) { return "a" }
      return titlelize(this.for)
    },

    isActive() {
      let typeState = `active${this.typeName}Tags`
      return `this.$parent.${typeState}.indexOf(${this.tagName}) > 1`
    }
  },

  methods: {
    toggle() {
      this.$parent.$emit(`toggle${this.typeName}`, this.tagName)
    }
  }
}
</script>
