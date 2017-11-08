let Btn   = require('./Button')
let React = require('react')
let DOM   = require('react-dom')

class ActionButton extends React.Component {

  static propTypes = {
    label   : React.PropTypes.string.isRequired,
    onClick : React.PropTypes.func.isRequired
  }

  static defaultProps = {
    className : 'col-btn-fab',
    symbol    : '+'
  }

  focus() {
    DOM.findDOMNode(this).focus()
  }

  render() {
    let { className, disabled, label, onClick, symbol } = this.props

    return (
      <Btn className={ className } onClick={ onClick } disabled={ disabled }>
        <span className="col-hidden">{ label }</span>
        <span aria-hidden="true">{ symbol }</span>
      </Btn>
    )
  }

}

module.exports = ActionButton
