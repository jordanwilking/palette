import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import { ChromePicker } from 'react-color'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

class ColorPickerForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentColor: 'teal',
      newColorName: ''
    }
    this.updateCurrentColor = this.updateCurrentColor.bind(this)
    this.addNewColor = this.addNewColor.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isColorNameUnique', value =>
      this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    )
    ValidatorForm.addValidationRule('isColorUnique', value =>
      this.props.colors.every(({ color }) => color !== this.state.currentColor)
    )
  }

  updateCurrentColor(newColor) {
    this.setState({ currentColor: newColor.hex })
  }

  addNewColor() {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    }
    this.props.addNewColor(newColor)
    this.setState({ newColorName: '' })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { currentColor, newColorName } = this.state
    const { paletteFull } = this.props

    return (
      <div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={this.updateCurrentColor}
        />
        <ValidatorForm onSubmit={this.addNewColor}>
          <TextValidator
            value={newColorName}
            name='newColorName'
            onChange={this.handleChange}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={[
              'This field is required',
              'Color name must be unique',
              'Color already used'
            ]}
          />
          <Button
            variant='contained'
            color='primary'
            type='submit'
            style={{
              backgroundColor: paletteFull ? 'grey' : currentColor
            }}
            disabled={paletteFull}
          >
            {paletteFull ? 'Palette Full' : 'Add Color'}
          </Button>
        </ValidatorForm>
      </div>
    )
  }
}

export default ColorPickerForm
