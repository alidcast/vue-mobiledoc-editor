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
    type: { type: String, required: true }, // 'Markup', 'Link', or 'Section'
    for: { type: String } // e.g. 'strong' (markup), 'a' (link), 'h1' (section)
  },

  computed: {
    tag() {
      // Link is a type of markup with a tag of 'a'
      // But we expose it as type="link" with an optional tag="a"
      if (capitalize(this.type) == "Link" && this.for == undefined) {
        return "a"
      }
      else if (this.for != undefined) {
        return this.for
      }
      else { // if button type is not 'Link' it requires a prop
        throw new Error(`${this.typeName} is missing a "for" prop`)
      }
    },

    isActive() {
      let typeState = `active${titlelize(this.type)}Tags`
      return `this.$parent.${typeState}.indexOf(${this.tag}) > 1`
    }
  },

  methods: {
    toggle() {
      this.$root.$emit(`toggle${titlelize(this.type)}`, this.tag)
    }
  }
}
</script>
