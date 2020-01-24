import React, { Component } from 'react'
import styled from 'styled-components'
import PaletteHeader from './PaletteHeader'

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

    return <PaletteHeader shade={shade} changeShade={this.changeShade} />
  }
}

export default Palette
