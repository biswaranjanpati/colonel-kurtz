let React     = require('react')
let PropTypes = require('prop-types')
let Animator  = require('./Animator')
let FocusTrap = require('react-focus-trap')
let Handle    = require('./MenuHandle')
let Item      = require('./MenuItem')
let menuItems = require('../config/menu')

class BlockMenu extends React.Component {

  static Item = Item

  static propTypes = {
    app    : PropTypes.object.isRequired,
    block  : PropTypes.object.isRequired
  }

  static defaultProps = {
    items: []
  }

  getMenuItem(item) {
    let { id } = item
    return (<Item key={ id } ref={ (el) => this[id] = el } { ...item } { ...this.props } />)
  }

  getMenuItems() {
    return this.props.items.concat(menuItems).map(this.getMenuItem, this)
  }

  getMenu() {
    if (!this.props.active) return null;

    return React.createElement(FocusTrap, {
      active    : true,
      key       : 'menu',
      className : 'col-menu',
      element   : 'nav',
      onExit    : this.props.onExit,
      role      : 'navigation'
    }, this.getMenuItems())
  }

  render() {
    return (
      <Animator className="col-menu-wrapper" transitionName="col-menu" transitionEnterTimeout={ 300 } transitionLeaveTimeout={ 200 }>
        <Handle key="handle" ref={ (el) => this.handle = el } onClick={ this.props.onOpen }/>
        { this.getMenu() }
      </Animator>
    )
  }

}

module.exports = BlockMenu
