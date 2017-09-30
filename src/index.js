import MobiledocController from 'MobiledocController'
import MobiledocEditor, { EMPTY_MOBILEDOC } from 'MobiledocEditor'
import MobiledocButton from 'MobiledocButton'
import MobiledocToolbar from 'addons/MobiledocToolbar'
import compToCard from 'addons/compToCard'

function createMobiledoc (prefix = '') {
  const Ctrl = new MobiledocController()
  const Btn = MobiledocButton(Ctrl)
  return {
    [`${prefix}Ctrl`]: Ctrl,
    [`${prefix}Editor`]: MobiledocEditor(Ctrl),
    [`${prefix}Btn`]: Btn,
    [`${prefix}Toolbar`]: MobiledocToolbar(Ctrl, Btn)
  }
}

export {
  createMobiledoc,
  compToCard,
  EMPTY_MOBILEDOC
}

export default createMobiledoc()
