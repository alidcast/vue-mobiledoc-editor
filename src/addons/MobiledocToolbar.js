export default (Ctrl, Btn) => ({
  functional: true,

  render (h) {
    // button components are intentionally declared as lower case
    // so that jsx plugins looks them up
    return (
      <div id='mobiledoc-toolbar'>
        <btn type='markup' tag='strong'> B </btn>
        <btn type='markup' tag='em'> I </btn>
        <btn type='link'> Link </btn>
        <btn type='section' tag='h1'> H1 </btn>
        <btn type='section' tag='h2'> H2 </btn>
        <btn type='section' tag='ul'> UL </btn>
        <btn type='section' tag='ol'> OL </btn>
        <btn type='section' tag='block-quote'> Blockquote </btn>
        <btn type='section' tag='pull-quote'> Pullquote </btn>
        <slot />
      </div>
    )
  },

  components: {
    Btn
  }
})
