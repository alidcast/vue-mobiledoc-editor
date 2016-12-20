<template>
  <div id="mobiledoc-toolbar">
    <mobiledoc-button type="markup" for="strong"> Bold </mobiledoc-button>
    <mobiledoc-button type="markup" for="em"> Bold </mobiledoc-button>
    <mobiledoc-button type="link"> Link </mobiledoc-button>
    <mobiledoc-button type="section" for="h1"> H1 </mobiledoc-button>
    <mobiledoc-button type="section" for="h2"> H2 </mobiledoc-button>
    <mobiledoc-button type="section" for="ul"> Unordered List </mobiledoc-button>
    <mobiledoc-button type="section" for="ol"> Ordered List </mobiledoc-button>
    <mobiledoc-button type="section" for="block-quote"> Blockquote </mobiledoc-button>
    <mobiledoc-button type="section" for="pull-quote"> Pullquote </mobiledoc-button>
    <!-- <mobiledoc-button type="card" for="name" mode="edit" />-->
  </div>
</template>


<script>
import MobiledocButton from './MobiledocButton'

export default {
  components: {
    MobiledocButton
  }
}
</script>
