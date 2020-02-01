import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
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
          render={routeProps => (
            <PaletteList palettes={seedColors} {...routeProps} />
          )}
        />
        <Route
          exact
          path='/palette/:id'
          render={routeProps => (
            <div style={{ overflow: 'hidden' }}>
              <Palette
                palette={generatePalette(
                  this.findPalette(routeProps.match.params.id)
                )}
              />
            </div>
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
