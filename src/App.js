import React, { Component } from 'react'
import styled from 'styled-components'
import Palette from './Palette'
import seedColors from './seedColors'
import { generatePalette } from './colorHelpers'

class App extends Component {
  render() {
    return (
      <div style={{ overflow: 'hidden' }}>
        <Palette palette={generatePalette(seedColors[2])} />
      </div>
    )
  }
}

export default App
