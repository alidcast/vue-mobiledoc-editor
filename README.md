# Vue Mobiledoc Editor

> A Mobiledoc editor written using Vue and Mobiledoc Kit.

### Installation

```
npm install vue-mobiledoc-editor
```

<br>

`vue-mobiledoc-editor` will install the `mobiledoc-kit` package as a dependency and load its assets.

### Basic Usage

This package is composed of three main parts:

* `MobiledocController`
* `MobiledocEditor`
* `MobiledocButton`

<br>

Additionally, you can use the following addons:
* `MobiledocToolbar`

<br>


The `MobiledocController` is a Vue instance passed to the mobiledoc editor and button components so that they can share the necessary data and methods.

The `MobiledocEditor`, `MobiledocButton`, and `MobiledocToolbar` are Vue components that are exported as functions so that you can pass each component the appropriate controller instance upon creation.


You can initiate the controller instance and register its components like so:

```
import { MobiledocController, MobiledocEditor, MobiledocToolbar } from "vue-mobiledoc-editor"

let editorCtrl = new MobiledocController()

export default {
  components: {
    MobiledocEditor:  MobiledocEditor(editorCtrl)
    MobiledocToolbar: MobiledocButton(editorCtrl)
  }
}

```

<br>

The most basic usage with an empty editor and a standard toolbar is:

```
<MobiledocEditor>
  <MobiledocToolbar />
</MobiledocEditor>
```

<br>

Read on for how to provide custom configurations to each component.

#### `<MobiledocEditor>`

The mobiledoc editor is a component that accepts these Mobiledoc-specific props:

* `mobiledoc`, a Mobiledoc to be edited.

* `cards`, an array of available cards for use by the editor. (Jump to the section on Card-based components for details on how to create cards as Vue components.)

* `atoms`, an array of available atoms for use by the editor.

* `spellcheck`, a boolean. Defaults to true.

* `autofocus`, a boolean. Defaults to true.

* `placeholder`, a string to use as the placeholder text when the mobiledoc is blank.

* `serializeVersion`, a string representing the mobiledoc version to serialize to when firing the `postWasUpdated` action. Defaults to 0.3.0.

Additionally, it can emit the following events:

* `willCreateEditor`, a callback that fires when the Mobiledoc editor instance is about to be created. Takes no arguments.

* `didCreateEditor`, a callback that fires once the Mobiledoc editor instance has been created. Will be called with the editor instance and may be used to configure it further.

* `postWasUpdated`, a callback that will fire whenever the underlying document changes. It is called with the serialized mobiledoc.

Example usage:

```
<MobiledocEditor
  :placeholder="Start Writing..."
  @postWasUpdated="savePost">
</MobiledocEditor>
```

#### `<MobiledocButton>`

The `MobiledocButton` is a functional component that delegates the passed `props` to the appropriate button. Because of this, *every button requires* the `type` prop. Any additional props depend on the type of button.

There are five types of buttons:

* `MarkupButton`, requires a `tag` prop to identify the type of markup to toggle.

* `SectionButton`, requires a `tag` prop to identify the type of section to toggle.

* `LinkButton`, accepts an optional `prompt` prop that you can pass if you wish to provide a custom dialog that the user will shown when prompted input the link.

* `AtomButton`, requires a `name` prop to identify the atom that will be added to the end of the post and accepts an optional `text` and `payload` prop.

* `CardButton`, requires a `name` prop to identify the card that will be added to the end of the post and accepts an optional `payload` and `mode` prop. There are two `mode` options, `edit` or `display`; the default is `display`.

Additionally, all buttons accept a`label` prop, to set the content of the button when used as a blockless component.

Example usage:

```
<MobiledocButton label="bold" type="markup" tag="strong" />
```

#### `<MobiledocToolbar>`

The component creates a standard toolbar for the mobiledoc editor.

Example usage:

```
<MobiledocEditor />
```

### Advanced Usage

#### `MobiledocController()`

<br>

The mobiledoc controller is a Vue instance that you can use to inspect the state of the editor or to share the editor's data and methods between components.

The controller exposes the following `data`, which is set by the `MobiledocEditor`:


* `editor`, the Mobiledoc editor instance itself

* `activeSectionTags`, an object with true values for section tag names in the current selection. For example activeSectionTagNames.isH1.

* `activeMarkupTags`, an object with true values for markup tag names in the current selection. For example activeMarkupTagNames.isStrong
Additionally editor provides the following actions:

It will also expose the following `methods`, which are used by the `MobiledocButton`:

* `toggleMarkup`, toggles the passed markup tag name in the current selection.

* `toggleSection`, toggles the passed section tag name in the current selection.

* `toggleLink`, toggles the linking of a selection. The user will be prompted for a URL if required.

* `addAtom`, passed an atom `name`, `text`, and `payload`, will add that atom at the cursor position.

* `addCard`, passed a card `name`, `payload`, and `editMode` will add that card at the end of a post and render it in the specified mode initially.

You can use the `MobiledocController` to inspect the state of the editor or to create your own custom Mobiledoc components.


#### Component Cards
