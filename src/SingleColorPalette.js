import React, { Component } from 'react'
import PaletteHeader from './PaletteHeader'
import PaletteFooter from './PaletteFooter'

export default class SingleColorPalette extends Component {
  render() {
    const { palette } = this.props
    return (
      <div>
        <PaletteHeader />
        <PaletteFooter name={palette.paletteName} emoji={palette.emoji} />
      </div>
    )
  }
}
