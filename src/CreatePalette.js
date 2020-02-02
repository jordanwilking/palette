import React, { Component } from 'react'
import clsx from 'clsx'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import QueueIcon from '@material-ui/icons/Queue'
import styled from 'styled-components'
import { Button, Typography } from '@material-ui/core'
import { ChromePicker } from 'react-color'
import seedColors from './seedColors'
import DraggableColorBox from './DraggableColorBox'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const CreatePaletteContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: white;
`

const CreateHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const CreateText = styled.div`
  font-weight: 600;
  margin-left: 1rem;
`

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const HeaderActionsSection = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 30%;
`

const Palettes = styled.div`
  display: flex;
  flex-flow: row wrap;
  height: 100%;
`

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
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      currentColor: 'teal',
      newName: '',
      colors: [
        { color: 'purple', name: 'purple' },
        { color: '#e15764', name: 'other' }
      ]
    }
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this)
    this.handleDrawerClose = this.handleDrawerClose.bind(this)
    this.updateCurrentColor = this.updateCurrentColor.bind(this)
    this.addNewColor = this.addNewColor.bind(this)
    this.handleChange = this.handleChange.bind(this)
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

  updateCurrentColor(newColor) {
    this.setState({ currentColor: newColor.hex })
  }

  addNewColor() {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newName
    }
    this.setState({ colors: [...this.state.colors, newColor], newName: '' })
  }

  handleChange(e) {
    this.setState({ newName: e.target.value })
  }

  render() {
    const { classes } = this.props
    const { open, currentColor, newName, colors } = this.state

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position='fixed'
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar>
            <CreateHeader>
              <HeaderLeft>
                <IconButton
                  onClick={this.handleDrawerOpen}
                  className={clsx(classes.menuButton, open && classes.hide)}
                >
                  <QueueIcon />
                </IconButton>
                <CreateText>Create A Palette</CreateText>
              </HeaderLeft>
              <HeaderActionsSection>
                <Button
                  style={{ marginRight: '1rem' }}
                  color='secondary'
                  variant='contained'
                >
                  Go Back
                </Button>
                <Button color='primary' variant='contained'>
                  Save Palette
                </Button>
              </HeaderActionsSection>
            </CreateHeader>
          </Toolbar>
        </AppBar>
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
                <Button variant='contained' color='secondary'>
                  Clear Palette
                </Button>
                <Button variant='contained' color='primary'>
                  Random Color
                </Button>
              </PickerActions>
              <ChromePicker
                color={currentColor}
                onChangeComplete={this.updateCurrentColor}
              />
              <ValidatorForm onSubmit={this.addNewColor}>
                <TextValidator
                  value={newName}
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
                  style={{ backgroundColor: currentColor }}
                >
                  Add Color
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
          {colors.map(color => (
            <DraggableColorBox color={color.color} name={color.name} />
          ))}
        </main>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(CreatePalette)
