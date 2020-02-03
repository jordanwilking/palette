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
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'))
    this.state = {
      palettes: savedPalettes || seedColors
    }
    this.addPalette = this.addPalette.bind(this)
    this.deletePalette = this.deletePalette.bind(this)
  }

  findPalette(id) {
    return this.state.palettes.find(palette => palette.id === id)
  }

  deletePalette(id) {
    const newPalettes = this.state.palettes.filter(palette => palette.id !== id)
    this.setState({ palettes: newPalettes }, this.syncLocalStorage)
  }

  addPalette(newPallete) {
    this.setState(
      { palettes: [...this.state.palettes, newPallete] },
      this.syncLocalStorage
    )
  }

  syncLocalStorage() {
    window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes))
  }

  render() {
    const { palettes } = this.state

    return (
      <Switch>
        <Route
          exact
          path='/'
          render={routeProps => (
            <PaletteList
              palettes={palettes}
              deletePalette={this.deletePalette}
              {...routeProps}
            />
          )}
        />
        <Route
          exact
          path='/palette/new'
          render={routeProps => (
            <CreatePalette
              savePalette={this.addPalette}
              palettes={palettes}
              {...routeProps}
            />
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
