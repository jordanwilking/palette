import React, { Component } from 'react'
import MiniPalette from './MiniPalette'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import mediaSizes from './mediaSizes'
import bg from './bg.svg'
import { Button } from '@material-ui/core'

const Page = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  z-index: 1;
  /* background by SVGBackgrounds.com */
  background-color: #121b63;
  background-image: url(${bg});
  background-repeat: repeat;
  overflow: hidden;

  @media (max-width: ${mediaSizes.xs}) {
    overflow-y: scroll;
  }
`

const PalettesPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 66%;

  @media (max-width: ${mediaSizes.xl}) {
    width: 80%;
  }

  @media (max-width: ${mediaSizes.xs}) {
    width: 70%;
  }
`

const PalettesHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
`

const AppName = styled.div`
  color: white;
  font-size: 2rem;
  font-weight: 500;
`

const CreateLink = styled(Link)`
  color: rgba(255, 255, 255, 0.5);
`

const PalettesContainer = styled(TransitionGroup)`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-content: flex-start;
  height: 100%;
  width: 100%;

  .fade-exit-active {
    opacity: 0;
    transition: opacity 500ms ease-out;
  }
`

const Reset = styled(Button)`
  && {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 10;
    opacity: 0;
    transition: all 0.3s ease-in-out;

    &:hover {
      opacity: 1;
    }
  }
`

// TODO: can't do justify-content flex-start and space-between at the same time
class PaletteList extends Component {
  constructor(props) {
    super(props)
    this.goToPalette = this.goToPalette.bind(this)
  }

  goToPalette(id) {
    this.props.history.push(`palette/${id}`)
  }

  handleResetClick() {
    window.localStorage.clear()
    window.location.reload()
  }

  render() {
    const { deletePalette, palettes } = this.props

    return (
      <>
        <Page>
          <PalettesPageContainer>
            <PalettesHeader>
              <AppName>React Colors</AppName>
              <CreateLink to='/palette/new'>Create Palette</CreateLink>
            </PalettesHeader>
            <PalettesContainer>
              {palettes.map(palette => (
                <CSSTransition key={palette.id} classNames='fade' timeout={500}>
                  <MiniPalette
                    key={palette.id}
                    id={palette.id}
                    palette={palette}
                    onClick={this.goToPalette}
                    onDelete={deletePalette}
                  />
                </CSSTransition>
              ))}
            </PalettesContainer>
          </PalettesPageContainer>
        </Page>
        <Reset onClick={this.handleResetClick} variant='contained'>
          Reset Local Storage
        </Reset>
      </>
    )
  }
}

export default PaletteList
