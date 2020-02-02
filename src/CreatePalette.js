import React, { Component } from 'react'
import clsx from 'clsx'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import styled from 'styled-components'
import { Button, Typography } from '@material-ui/core'
import { ChromePicker } from 'react-color'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import seedColors from './seedColors'
import DraggableColorList from './DraggableColorList'
import { arrayMove } from 'react-sortable-hoc'
import CreatePaletteNav from './CreatePaletteNav'

const PalettePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  height: 50%;
  width: 90%;
  margin: 1rem;
  border: 2px solid red;
`

const PickerActions = styled.div`
  display: flex;
  flex-direction: row;
`

const drawerWidth = 400

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
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
      open: false,
      currentColor: 'teal',
      newColorName: '',
      newPaletteName: '',
      colors: seedColors[0].colors
    }
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this)
    this.handleDrawerClose = this.handleDrawerClose.bind(this)
    this.handleGoBack = this.handleGoBack.bind(this)
    this.savePalette = this.savePalette.bind(this)
    this.updateCurrentColor = this.updateCurrentColor.bind(this)
    this.addNewColor = this.addNewColor.bind(this)
    this.removeColor = this.removeColor.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onSortEnd = this.onSortEnd.bind(this)
    this.clearColors = this.clearColors.bind(this)
    this.addRandomColor = this.addRandomColor.bind(this)
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isColorNameUnique', value =>
      this.state.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    )
    ValidatorForm.addValidationRule('isColorUnique', value =>
      this.state.colors.every(({ color }) => color !== this.state.currentColor)
    )
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

  savePalette(newPaletteName) {
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, '-'),
      colors: this.state.colors
    }
    this.props.savePalette(newPalette)
    this.props.history.push('/')
  }

  updateCurrentColor(newColor) {
    this.setState({ currentColor: newColor.hex })
  }

  addNewColor() {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    }
    this.setState({
      colors: [...this.state.colors, newColor],
      newColorName: ''
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
    const {
      open,
      currentColor,
      newColorName,
      newPaletteName,
      colors
    } = this.state
    const paletteFull = colors.length >= maxColors

    return (
      <div className={classes.root}>
        <CreatePaletteNav
          open={open}
          classes={classes}
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
          <Divider />
          <PalettePickerContainer>
            <>
              <Typography variant='h4'>Design Your Palette</Typography>
              <PickerActions>
                <Button
                  onClick={this.clearColors}
                  variant='contained'
                  color='secondary'
                >
                  Clear Palette
                </Button>
                <Button
                  onClick={this.addRandomColor}
                  variant='contained'
                  color='primary'
                  disabled={paletteFull}
                >
                  Random Color
                </Button>
              </PickerActions>
              <ChromePicker
                color={currentColor}
                onChangeComplete={this.updateCurrentColor}
              />
              <ValidatorForm onSubmit={this.addNewColor}>
                <TextValidator
                  value={newColorName}
                  name='newColorName'
                  onChange={this.handleChange}
                  validators={[
                    'required',
                    'isColorNameUnique',
                    'isColorUnique'
                  ]}
                  errorMessages={[
                    'This field is required',
                    'Color name must be unique',
                    'Color already used'
                  ]}
                />
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  style={{
                    backgroundColor: paletteFull ? 'grey' : currentColor
                  }}
                  disabled={paletteFull}
                >
                  {paletteFull ? 'Palette Full' : 'Add Color'}
                </Button>
              </ValidatorForm>
            </>
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
