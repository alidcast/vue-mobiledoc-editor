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

export default {
  props: {
    type: { type: String, required: true },
    for: { type: String }
  },

  computed: {
    typeName() { // Markup or Section or Link
      return titlelize(this.type)
    },

    tagName() {
      // Link is a type of markup with a tag of 'a'
      // But we expose it as type="link" with an optional tag="a"
      if (this.typeName == "Link" && this.for == undefined) {
        return "a"
      }
      else if (this.for != undefined) { // e.g. markup -> strong, section -> h1
        return titlelize(this.for)
      }
      else { // if button type is not 'Link' it requires a prop
        throw new Error(`${this.typeName} is missing a "for" prop`)
      }
    },

    isActive() {
      let typeState = `active${this.typeName}Tags`
      return `this.$parent.${typeState}.indexOf(${this.tagName}) > 1`
    }
  },

  // created() {
  // }

  methods: {
    toggle() {
      this.$parent.$emit(`toggle${this.typeName}`, this.tagName)
    }
  }
}
</script>
