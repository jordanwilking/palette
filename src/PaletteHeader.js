import React, { Component } from 'react'
import styled from 'styled-components'
import Slider from '@material-ui/core/Slider'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { MenuItem } from '@material-ui/core'

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  width: 100%;
  height: 3rem;
`
const SiteName = styled.div`
  display: flex;
  background-color: lightgrey;
  align-items: center;
  height: 100%;
  padding: 0 1rem;
  font-weight: 450;
`

const HeaderTools = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
`

const ShadeLevel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  width: 40%;
`

const SITE_NAME = 'reactcolorpicker'

const colorFormats = [
  'HEX - #ffffff',
  'RGB - rgb(255,255,255)',
  'RGBA - rgba(255,255,255, 1.0)'
]

class PaletteHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sliderValue: this.props.shade,
      format: colorFormats[0]
    }
    this.onSliderChange = this.onSliderChange.bind(this)
    this.changeFormat = this.changeFormat.bind(this)
  }

  onSliderChange(e, newValue) {
    this.setState({ sliderValue: newValue })
    this.props.changeShade(newValue)
  }

  changeFormat(e) {
    this.setState({ format: e.target.value })
  }

  render() {
    const { sliderValue, format } = this.state

    return (
      <HeaderContainer>
        <SiteName>{SITE_NAME}</SiteName>
        <HeaderTools>
          <ShadeLevel>
            <Typography style={{ width: '7rem' }}>
              Level: {sliderValue}
            </Typography>
            <Slider
              onChange={this.onSliderChange}
              // defaultValue={sliderValue}
              value={sliderValue}
              step={100}
              marks
              min={0}
              max={900}
            />
          </ShadeLevel>
          <TextField
            select
            onChange={this.changeFormat}
            value={format}
            style={{ margin: '0 1rem' }}
          >
            {colorFormats.map(colorFormat => {
              return (
                <MenuItem key={colorFormat} value={colorFormat}>
                  {colorFormat}
                </MenuItem>
              )
            })}
          </TextField>
        </HeaderTools>
      </HeaderContainer>
    )
  }
}

export default PaletteHeader
