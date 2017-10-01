import MobiledocButton from '../MobiledocButton'

export default {
  functional: true,

  render (h) {
    return (
      <div id='mobiledoc-toolbar'>
        <MobiledocButton type='markup' tag='strong'> B </MobiledocButton>
        <MobiledocButton type='markup' tag='em'> I </MobiledocButton>
        <MobiledocButton type='link'> Link </MobiledocButton>
        <MobiledocButton type='section' tag='h1'> H1 </MobiledocButton>
        <MobiledocButton type='section' tag='h2'> H2 </MobiledocButton>
        <MobiledocButton type='section' tag='ul'> UL </MobiledocButton>
        <MobiledocButton type='section' tag='ol'> OL </MobiledocButton>
        <MobiledocButton type='section' tag='blockquote'> Blockquote </MobiledocButton>
        <MobiledocButton type='section' tag='pull-quote'> Pullquote </MobiledocButton>
        <slot />
      </div>
    )
  }
}
