import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

class SavePaletteDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openSave: false,
      openEmoji: false,
      newPaletteName: ''
    }
    this.handleSaveOpen = this.handleSaveOpen.bind(this)
    this.handleSaveClose = this.handleSaveClose.bind(this)
    this.handleNextStage = this.handleNextStage.bind(this)
    this.handleEmojiOpen = this.handleEmojiOpen.bind(this)
    this.handleEmojiClose = this.handleEmojiClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    )
  }

  handleSaveOpen() {
    this.setState({ openSave: true })
  }

  handleSaveClose() {
    this.setState({ openSave: false })
  }

  handleNextStage() {
    this.setState({ openSave: false, openEmoji: true })
  }

  handleEmojiOpen() {
    this.setState({ openEmoji: true })
  }

  handleEmojiClose() {
    this.setState({ openEmoji: false })
  }

  handleSubmit(emoji) {
    this.props.savePalette({
      paletteName: this.state.newPaletteName,
      emoji: emoji.native
    })
    this.setState({ openEmoji: false })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { openSave, openEmoji, newPaletteName } = this.state

    return (
      <>
        <Button
          color='primary'
          variant='contained'
          onClick={this.handleSaveOpen}
        >
          Save
        </Button>
        <Dialog open={openSave} onClose={this.handleSaveClose}>
          <DialogTitle>
            Choose a Palette Name{' '}
            <span role='img' aria-label='palette image'>
              🎨
            </span>
          </DialogTitle>
          <ValidatorForm onSubmit={this.handleNextStage}>
            <DialogContent>
              <DialogContentText>
                Please enter a name for your new beautiful palette. Make sure
                it's unique!
              </DialogContentText>
              <TextValidator
                fullWidth
                autoFocus
                margin='normal'
                name='newPaletteName'
                onChange={this.handleChange}
                label='Palette Name'
                value={newPaletteName}
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={['Enter palette name', 'Name already taken']}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleSaveClose} color='primary'>
                Cancel
              </Button>
              <Button type='submit' color='primary' variant='contained'>
                Save
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
        <Dialog open={openEmoji} onClose={this.handleEmojiClose}>
          <Picker onSelect={this.handleSubmit} darkMode={false} />
        </Dialog>
      </>
    )
  }
}

export default SavePaletteDialog
