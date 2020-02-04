import React, { Component } from 'react'
import chroma from 'chroma-js'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import PaletteHeader from './PaletteHeader'
import PaletteFooter from './PaletteFooter'
import ColorBox from './ColorBox'
import mediaSizes from './mediaSizes'

const PaletteContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: white;
  overflow: hidden;

  .isDark {
    color: ${props =>
      chroma(props.color).luminance() <= 0.08 ? 'white' : 'black'} !important;
  }
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

const StyledColorBox = styled(ColorBox)`
  height: 50%;

  @media (max-width: ${mediaSizes.lg}) {
    width: 20%;
    height: 50%;
  }
  @media (max-width: ${mediaSizes.md}) {
    width: 50%;
    height: 20%;
  }
  @media (max-width: ${mediaSizes.xs}) {
    width: 100%;
    height: 10%;
  }
`

const BackBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  height: 50%;
  background-color: black;
  color: white;
  cursor: pointer;

  @media (max-width: ${mediaSizes.md}) {
    width: 50%;
    height: 20%;
  }
  @media (max-width: ${mediaSizes.xs}) {
    width: 100%;
    height: 10%;
  }
`

const BackBoxText = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  text-align: center;
  width: 100px;
  height: 30px;
  line-height: 30px;
`

class SingleColorPalette extends Component {
  constructor(props) {
    super(props)
    this.state = { format: 'hex' }
    this.gatherShades = this.gatherShades.bind(this)
    this.changeFormat = this.changeFormat.bind(this)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
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

  handleBackButtonClick() {
    this.props.history.goBack()
  }

  render() {
    const { palette } = this.props
    const { format } = this.state
    const shades = this.gatherShades()

    return (
      <PaletteContainer className='isDark'>
        <PaletteHeader changeFormat={this.changeFormat} />
        <ColorBoxContainer>
          {shades.map(color => {
            return (
              <StyledColorBox
                key={color.name}
                className='isDark'
                colorName={color.name}
                color={color[format]}
              />
            )
          })}
          <BackBox onClick={this.handleBackButtonClick}>
            <BackBoxText>Go Back</BackBoxText>
          </BackBox>
        </ColorBoxContainer>
        <PaletteFooter name={palette.paletteName} emoji={palette.emoji} />
      </PaletteContainer>
    )
  }
}

export default withRouter(SingleColorPalette)
