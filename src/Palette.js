import React, { Component } from 'react'
import styled from 'styled-components'
import PaletteHeader from './PaletteHeader'
import PaletteFooter from './PaletteFooter'
import ColorBox from './ColorBox'
import { Grid } from '@material-ui/core'
import seedColors from './seedColors'

const PaletteContainer = styled(Grid)`
  display: flex;
  flex-flow: row wrap;
  height: auto;
`

class Palette extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shade: 500
    }
    this.changeShade = this.changeShade.bind(this)
  }

  changeShade(newValue) {
    this.setState({ shadeLevel: newValue })
  }

  render() {
    const { shade } = this.state
    const testPalette = seedColors[2]

    return (
      <>
        <PaletteHeader shade={shade} changeShade={this.changeShade} />
        <PaletteContainer container>
          {testPalette.colors.map(entry => {
            return (
              <ColorBox
                key={entry.color}
                color={entry.color}
                colorName={`${entry.name} ${shade}`}
              />
            )
          })}
        </PaletteContainer>
        <PaletteFooter
          name={testPalette.paletteName}
          emoji={testPalette.emoji}
        />
      </>
    )
  }
}

export default Palette
