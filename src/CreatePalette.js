import React, { Component } from 'react'
import clsx from 'clsx'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import styled from 'styled-components'
import { Button, Typography } from '@material-ui/core'
import seedColors from './seedColors'
import DraggableColorList from './DraggableColorList'
import { arrayMove } from 'react-sortable-hoc'
import CreatePaletteNav from './CreatePaletteNav'
import ColorPickerForm from './ColorPickerForm'
import mediaSizes from './mediaSizes'

const PalettePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 90%;
  margin: 1rem;
`

const PickerActions = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const drawerWidth = 400

const styles = theme => ({
  root: {
    display: 'flex',

    [`@media (max-width: ${mediaSizes.xs})`]: {
      overflow: 'hidden'
    }
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    display: 'flex',
    alignItems: 'center',

    [`@media (max-width: ${mediaSizes.xs})`]: {
      width: '100vw'
    }
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
})

class CreatePalette extends Component {
  static defaultProps = { maxColors: 20 }
  constructor(props) {
    super(props)
    this.state = {
      open: true,
      newPaletteName: '',
      colors: seedColors[0].colors
    }
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this)
    this.handleDrawerClose = this.handleDrawerClose.bind(this)
    this.handleGoBack = this.handleGoBack.bind(this)
    this.savePalette = this.savePalette.bind(this)
    this.addNewColor = this.addNewColor.bind(this)
    this.removeColor = this.removeColor.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onSortEnd = this.onSortEnd.bind(this)
    this.clearColors = this.clearColors.bind(this)
    this.addRandomColor = this.addRandomColor.bind(this)
  }

  handleDrawerOpen() {
    this.setState({ open: true })
  }

  handleDrawerClose() {
    this.setState({ open: false })
  }

  handleGoBack() {
    this.props.history.goBack()
  }

  savePalette({ paletteName, emoji }) {
    const newPalette = {
      paletteName,
      id: paletteName.toLowerCase().replace(/ /g, '-'),
      emoji,
      colors: this.state.colors
    }
    this.props.savePalette(newPalette)
    this.props.history.push('/')
  }

  addNewColor(newColor) {
    this.setState({
      colors: [...this.state.colors, newColor]
    })
  }

  removeColor(colorName) {
    const newColors = this.state.colors.filter(
      color => color.name !== colorName
    )
    this.setState({ colors: [...newColors] })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  clearColors() {
    this.setState({ colors: [] })
  }

  addRandomColor() {
    const allColors = this.props.palettes.map(palette => palette.colors).flat()
    let rand = Math.floor(Math.random() * allColors.length)
    const randomColor = allColors[rand]
    this.setState({ colors: [...this.state.colors, randomColor] })
  }

  onSortEnd({ oldIndex, newIndex }) {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex)
    }))
  }

  render() {
    const { classes, maxColors, palettes } = this.props
    const { open, newPaletteName, colors } = this.state
    const paletteFull = colors.length >= maxColors

    return (
      <div className={classes.root}>
        <CreatePaletteNav
          open={open}
          newPaletteName={newPaletteName}
          palettes={palettes}
          savePalette={this.savePalette}
          openDrawer={this.handleDrawerOpen}
          goBack={this.handleGoBack}
        />
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider width='100%' />
          <PalettePickerContainer>
            <Typography variant='h4' gutterBottom>
              Design Your Palette
            </Typography>
            <PickerActions>
              <Button
                onClick={this.clearColors}
                variant='contained'
                color='secondary'
                style={{ width: '50%' }}
              >
                Clear Palette
              </Button>
              <Button
                onClick={this.addRandomColor}
                variant='contained'
                color='primary'
                style={{ width: '50%' }}
                disabled={paletteFull}
              >
                Random Color
              </Button>
            </PickerActions>
            <ColorPickerForm
              paletteFull={paletteFull}
              addNewColor={this.addNewColor}
              colors={colors}
            />
          </PalettePickerContainer>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList
            colors={this.state.colors}
            onDelete={this.removeColor}
            axis='xy'
            onSortEnd={this.onSortEnd}
          />
        </main>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(CreatePalette)
