import React, { Component } from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core'
import { ChromePicker } from 'react-color'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const ColorPicker = styled(ChromePicker)`
  margin-top: 2rem;
`

const AddColorButton = styled(Button)`
  && {
    padding: 1rem;
    margin-top: 1rem;
    font-size: 2rem;
  }

  width: 100%;
`

const ColorNameInput = styled(TextValidator)`
  width: 100%;
  height: 70px;
`

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
        <ColorPicker
          width='100%'
          color={currentColor}
          onChangeComplete={this.updateCurrentColor}
        />
        <ValidatorForm onSubmit={this.addNewColor} instantValidate={false}>
          <ColorNameInput
            variant='filled'
            label='Color Name'
            value={newColorName}
            name='newColorName'
            margin='normal'
            onChange={this.handleChange}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={[
              'This field is required',
              'Color name must be unique',
              'Color already used'
            ]}
          />
          <AddColorButton
            variant='contained'
            color='primary'
            type='submit'
            style={{
              backgroundColor: paletteFull ? 'grey' : currentColor
            }}
            disabled={paletteFull}
          >
            {paletteFull ? 'Palette Full' : 'Add Color'}
          </AddColorButton>
        </ValidatorForm>
      </div>
    )
  }
}

export default ColorPickerForm
