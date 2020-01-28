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
  height: 6vh;
`
const Logo = styled.div`
  display: flex;
  background-color: #eceff1;
  align-items: center;
  font-family: Roboto;
  font-size: 22px;
  height: 100%;
  padding: 0 1rem;
  font-weight: 450;
`

const HeaderTools = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 0.5rem;
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
      format: colorFormats[0]
    }
    this.changeFormat = this.changeFormat.bind(this)
  }

  changeFormat(e) {
    this.setState({ format: e.target.value })
  }

  render() {
    const { format } = this.state
    const { shade } = this.props

    return (
      <HeaderContainer>
        <Logo>{SITE_NAME}</Logo>
        <HeaderTools>
          <ShadeLevel>
            <Typography style={{ width: '7rem', minWidth: '5rem' }}>
              Level: {shade}
            </Typography>
            <Slider
              onChange={this.props.changeShade}
              value={shade}
              step={100}
              min={100}
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
