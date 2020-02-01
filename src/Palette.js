import React, { Component } from 'react'
import styled from 'styled-components'
import PaletteHeader from './PaletteHeader'
import PaletteFooter from './PaletteFooter'
import ColorBox from './ColorBox'

const PaletteContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: white;
  overflow: hidden;
`

const ColorBoxContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  height: 90%;
  z-index: 1;
`

class Palette extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shade: 500,
      format: 'hex'
    }
    this.changeShade = this.changeShade.bind(this)
    this.changeFormat = this.changeFormat.bind(this)
  }

  changeShade(e, newShade) {
    this.setState({ shade: newShade })
  }

  changeFormat(newFormat) {
    this.setState({ format: newFormat })
  }

  render() {
    const { colors, paletteName, emoji, id } = this.props.palette
    const { shade, format } = this.state

    return (
      <PaletteContainer>
        <PaletteHeader
          showSlider
          shade={shade}
          changeShade={this.changeShade}
          changeFormat={this.changeFormat}
        />
        <ColorBoxContainer>
          {colors[shade].map(color => {
            return (
              <ColorBox
                showMore
                key={color.id}
                id={color.id}
                paletteId={id}
                color={color[format]}
                colorName={`${color.name}`}
              />
            )
          })}
        </ColorBoxContainer>
        <PaletteFooter name={paletteName} emoji={emoji} />
      </PaletteContainer>
    )
  }
}

export default Palette
