import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import Palette from './Palette'
import PaletteList from './PaletteList'
import seedColors from './seedColors'
import { generatePalette } from './colorHelpers'

class App extends Component {
  findPalette(id) {
    return seedColors.find(palette => palette.id === id)
  }

  render() {
    return (
      <Switch>
        <Route
          exact
          path='/'
          render={() => <PaletteList palettes={seedColors} />}
        />
        <Route
          exact
          path='/palette/:id'
          render={routeProps => (
            <Palette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
            />
          )}
        />
        <Redirect from='/' to='/' />
      </Switch>

      // <div style={{ overflow: 'hidden' }}>
      //   <Palette palette={generatePalette(seedColors[2])} />
      // </div>
    )
  }
}

export default App
