import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

class SavePaletteDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      newPaletteName: ''
    }
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
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

  handleClickOpen() {
    this.setState({ open: true })
  }

  handleClose() {
    this.setState({ open: false })
  }

  handleSubmit() {
    this.props.savePalette(this.state.newPaletteName)
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { open, newPaletteName } = this.state

    return (
      <div>
        <Button
          color='primary'
          variant='contained'
          onClick={this.handleClickOpen}
        >
          Save Palette
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Cancel
            </Button>
            <ValidatorForm onSubmit={this.handleSubmit}>
              <TextValidator
                name='newPaletteName'
                onChange={this.handleChange}
                label='Palette Name'
                value={newPaletteName}
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={['Enter palette name', 'Name already taken']}
              />
              <Button type='submit' color='primary' variant='contained'>
                Save Palette
              </Button>
            </ValidatorForm>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default SavePaletteDialog
