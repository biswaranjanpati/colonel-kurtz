let React         = require('react')
let PropTypes     = require('prop-types')
let ActionButton  = require('./ActionButton')
let Actions       = require('../actions/blocks')
let Blocks        = require('../stores/Blocks')
let SwitchNav     = require('./SwitchNav')
let classNames    = require('classnames')
let typesForBlock = require('../utils/typesForBlock')

class Switch extends React.Component {

  static propTypes = {
    app : PropTypes.object.isRequired
  }

  state = {
    open: false
  }

  componentWillReceiveProps() {
    this.setState({ open: false })
  }

  open = () => {
    this.setState({ open: true })
  }

  close = () => {
    this.setState({ open: false }, () => {
      this.toggle.focus()
    })
  }

  getToggle() {
    if (this.state.open) return null

    return (<ActionButton ref={ (el) => this.toggle = el }
                          disabled={ this.hasMaxChildren() }
                          label="Open the block menu and create a block"
                          onClick={ this._onToggle } />)
  }

  getNav(blockTypes) {
    if (!this.state.open) return null

    return (<SwitchNav ref={ (el) => this.nav = el }
                       blockTypes={ blockTypes }
                       onAdd={ this._onAdd }
                       onExit={ this.close } />)
  }

  hasMaxChildren() {
    let { app, parent } = this.props

    if (!parent) {
      return Blocks.filterChildren(app.state.blocks).length >= app.state.maxChildren
    }

    let children = Blocks.getChildren(app.state.blocks, parent)
    let type     = app.state.blockTypes.filter(t => t.id === parent.type)[0]

    return children.length >= type.maxChildren
  }

  depth() {
    let { app, parent } = this.props
    return Blocks.getDepth(app.state.blocks, parent, app.state.maxDepth) + 1;
  }

  hasHitMaxDepth() {
    let { app, parent } = this.props
    if (!app.state.maxDepth) return false

    return this.depth() >= app.state.maxDepth
  }

  render() {
    let { app, parent, position } = this.props
    let types = typesForBlock(app.state.blockTypes, parent)

    let className = classNames('col-switch', {
      'col-switch-disabled': (this.hasMaxChildren() || this.hasHitMaxDepth())
    })

    return types.length ? (
      <div className={ className } onKeyUp={ this._onKeyUp }>
        { this.getToggle() }
        { this.getNav(types) }
      </div>
    ) : null
  }

  _onAdd = (type) => {
    let { app, position, parent } = this.props
    app.push(Actions.create, [type.id, position, parent])
  }

  _onToggle = () => {
    let { app, position, parent } = this.props

    let types = typesForBlock(app.state.blockTypes, parent)
    // If only one type exists, instead of opening the nav, just
    // create that element
    if (types.length === 1) {
      app.push(Actions.create, [types[0].id, position, parent])
    }

    this.open()
  }

  _onKeyUp = (e) => {
    if (e.key === 'Escape') {
      this.close()
    }
  }

}

module.exports = Switch
