import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Palette from './Palette'
import PaletteList from './PaletteList'
import seedColors from './seedColors'
import { generatePalette } from './colorHelpers'
import SingleColorPalette from './SingleColorPalette'
import CreatePalette from './CreatePalette'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      palettes: [...seedColors]
    }
    this.addPalette = this.addPalette.bind(this)
  }

  findPalette(id) {
    return this.state.palettes.find(palette => palette.id === id)
  }

  addPalette(newPallete) {
    console.log(newPallete)
    this.setState({ palettes: [...this.state.palettes, newPallete] })
  }

  render() {
    const { palettes } = this.state

    return (
      <Switch>
        <Route
          exact
          path='/'
          render={routeProps => (
            <PaletteList palettes={palettes} {...routeProps} />
          )}
        />
        <Route
          exact
          path='/palette/new'
          render={routeProps => (
            <CreatePalette savePalette={this.addPalette} {...routeProps} />
          )}
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
        <Route
          exact
          path='/palette/:paletteId/:colorId'
          render={routeProps => (
            <SingleColorPalette
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
              )}
              {...routeProps}
            />
          )}
        />
        <Redirect from='/' to='/' />
      </Switch>
    )
  }
}

export default App
