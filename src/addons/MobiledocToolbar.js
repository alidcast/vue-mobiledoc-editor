import MobiledocButton from 'src/MobiledocButton'

export default (ctrl) => ({
  functional: true,

  render(h) {
    // button components are intentionally declared as lower case
    // so that jsx plugins looks them up
    return (
      <div id="mobiledoc-toolbar">
        <mobiledoc-button type="markup" tag="strong"> Bold </mobiledoc-button>
        <mobiledoc-button type="markup" tag="em"> Bold </mobiledoc-button>
        <mobiledoc-button type="link"> Link </mobiledoc-button>
        <mobiledoc-button type="section" tag="h1"> H1 </mobiledoc-button>
        <mobiledoc-button type="section" tag="h2"> H2 </mobiledoc-button>
        <mobiledoc-button type="section" tag="ul"> Unordered List </mobiledoc-button>
        <mobiledoc-button type="section" tag="ol"> Ordered List </mobiledoc-button>
        <mobiledoc-button type="section" tag="block-quote"> Blockquote </mobiledoc-button>
        <mobiledoc-button type="section" tag="pull-quote"> Pullquote </mobiledoc-button>
        <slot />
      </div>
    )
  },

  components: {
    MobiledocButton: MobiledocButton(ctrl)
  }
})
