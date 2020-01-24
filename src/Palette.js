import React, { Component } from 'react'
import styled from 'styled-components'
import PaletteHeader from './PaletteHeader'
import PaletteFooter from './PaletteFooter'
import ColorBox from './ColorBox'
import { Grid } from '@material-ui/core'

const PaletteContainer = styled(Grid)`
  display: flex;
  flex-flow: row wrap;
  height: auto;
`

const testColors = [
  '#FF6633',
  '#FFB399',
  '#FF33FF',
  '#FFFF99',
  '#00B3E6',
  '#E6B333',
  '#3366E6',
  '#999966',
  '#99FF99',
  '#B34D4D',
  '#80B300',
  '#809900',
  '#E6B3B3',
  '#6680B3',
  '#66991A',
  '#FF99E6',
  '#CCFF1A',
  '#FF1A66',
  '#E6331A',
  '#33FFCC'
]

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

    return (
      <>
        <PaletteHeader shade={shade} changeShade={this.changeShade} />
        <PaletteContainer container>
          {testColors.map(color => {
            return <ColorBox color={color} />
          })}
        </PaletteContainer>
        <PaletteFooter />
      </>
    )
  }
}

export default Palette
