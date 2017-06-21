import MobiledocController from 'MobiledocController'
import MobiledocEditor from 'MobiledocEditor'
import MobiledocButton from 'MobiledocButton'
import MobiledocToolbar from 'addons/MobiledocToolbar'

export function createMobiledoc(prefix='') {
  let sharedController = new MobiledocController()
  return {
    [`${prefix}Controller`]: sharedController,
    [`${prefix}Editor`]: MobiledocEditor(sharedController),
    [`${prefix}Button`]: MobiledocButton(sharedController),
    [`${prefix}Toolbar`]: MobiledocToolbar(sharedController)
  }
}

export default createMobiledoc()
