import React, { Component } from 'react'
import styled from 'styled-components'
import { Route, Switch, Redirect } from 'react-router-dom'
import Palette from './Palette'
import PaletteList from './PaletteList'
import seedColors from './seedColors'
import { generatePalette } from './colorHelpers'
import SingleColorPalette from './SingleColorPalette'
import CreatePalette from './CreatePalette'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const Transition = styled(TransitionGroup)`
  .page-enter {
    opacity: 0;
  }
  .page-enter-active {
    opacity: 1;
  }
  .page-exit-active {
    opacity: 0;
  }
`

const TransitionPage = styled.div`
  height: 100vh;
  width: 100%;
  position: fixed;
  transition: opacity 500ms ease-in;
`

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
      <Route
        render={({ location }) => (
          <Transition>
            <CSSTransition key={location.key} classNames='page' timeout={500}>
              <Switch location={location}>
                <Route
                  exact
                  path='/'
                  render={routeProps => (
                    <TransitionPage>
                      <PaletteList
                        palettes={palettes}
                        deletePalette={this.deletePalette}
                        {...routeProps}
                      />
                    </TransitionPage>
                  )}
                />
                <Route
                  exact
                  path='/palette/new'
                  render={routeProps => (
                    <TransitionPage>
                      <CreatePalette
                        savePalette={this.addPalette}
                        palettes={palettes}
                        {...routeProps}
                      />
                    </TransitionPage>
                  )}
                />
                <Route
                  exact
                  path='/palette/:id'
                  render={routeProps => (
                    <TransitionPage>
                      <Palette
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.id)
                        )}
                      />
                    </TransitionPage>
                  )}
                />
                <Route
                  exact
                  path='/palette/:paletteId/:colorId'
                  render={routeProps => (
                    <TransitionPage>
                      <SingleColorPalette
                        colorId={routeProps.match.params.colorId}
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.paletteId)
                        )}
                        {...routeProps}
                      />
                    </TransitionPage>
                  )}
                />
                <Redirect from='/' to='/' />
              </Switch>
            </CSSTransition>
          </Transition>
        )}
      />
    )
  }
}

export default App
