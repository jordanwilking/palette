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

class SingleColorPalette extends Component {
  constructor(props) {
    super(props)
    this.state = { format: 'hex' }
    this.gatherShades = this.gatherShades.bind(this)
    this.changeFormat = this.changeFormat.bind(this)
  }

  gatherShades() {
    const paletteColors = this.props.palette.colors
    const colorId = this.props.colorId
    let shades = []

    for (let color in paletteColors) {
      shades = shades.concat(
        paletteColors[color].filter(color => color.id === colorId)
      )
    }

    return shades.slice(1)
  }

  changeFormat(newFormat) {
    this.setState({ format: newFormat })
  }

  render() {
    const { palette } = this.props
    const { format } = this.state
    const shades = this.gatherShades()

    return (
      <PaletteContainer>
        <PaletteHeader changeFormat={this.changeFormat} />
        <ColorBoxContainer>
          {shades.map(color => {
            return (
              <ColorBox
                key={color.name}
                colorName={color.name}
                color={color[format]}
              />
            )
          })}
        </ColorBoxContainer>
        <PaletteFooter name={palette.paletteName} emoji={palette.emoji} />
      </PaletteContainer>
    )
  }
}

export default SingleColorPalette
