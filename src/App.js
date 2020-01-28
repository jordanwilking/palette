import React, { Component } from 'react'
import styled from 'styled-components'
import Palette from './Palette'
import seedColors from './seedColors'
import { generatePalette } from './colorHelpers'

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
`

class App extends Component {
  render() {
    return (
      <AppContainer>
        <Palette palette={generatePalette(seedColors[2])} />
      </AppContainer>
    )
  }
}

export default App
