import React, { Component } from 'react'
import styled from 'styled-components'
import PaletteHeader from './PaletteHeader'
import PaletteFooter from './PaletteFooter'
import ColorBox from './ColorBox'
import { palette } from '@material-ui/system'

const PaletteContainer = styled.div`
  height: 100vh;
`

const ColorBoxContainer = styled.div`
  height: 90%;
  z-index: 1;
`

class Palette extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shade: 500
    }
    this.changeShade = this.changeShade.bind(this)
  }

  changeShade(e, newShade) {
    this.setState({ shade: newShade })
  }

  render() {
    const { palette } = this.props
    const { shade } = this.state

    return (
      <PaletteContainer>
        <PaletteHeader shade={shade} changeShade={this.changeShade} />
        <ColorBoxContainer>
          {palette.colors[shade].map(entry => {
            return (
              <ColorBox
                key={entry.id}
                color={entry.hex}
                colorName={`${entry.name}`}
              />
            )
          })}
        </ColorBoxContainer>
        {/* <PaletteFooter
          name={testPalette.paletteName}
          emoji={testPalette.emoji}
        /> */}
      </PaletteContainer>
    )
  }
}

export default Palette
