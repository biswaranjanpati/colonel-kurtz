/**
 * This component adds a medium.com-like rich text editor block type.
 *
 * Source for this component can be found here:
 * https://github.com/daviferreira/medium-editor
 */

let MediumEditor = require('./vendor/medium-editor')
let React        = require('react')
let DOM          = require('react-dom')

class Medium extends React.Component {

  static propTypes = {
    content  : React.PropTypes.object.isRequired,
    onChange : React.PropTypes.func.isRequired
  }

  static defaultProps = {
    content: {
      html: '',
      text: ''
    },
    options: {
      buttons: [ 'header1', 'header2', 'bold', 'italic', 'underline', 'anchor', 'quote',  'unorderedlist', 'orderedlist' ],
      firstHeader: 'h1',
      secondHeader: 'h2',
      diffLeft: 0,
      diffTop: -10,
      disableDoubleReturn: true
    }
  }

  shouldComponentUpdate(props: Object, state: Object){
    return false
  }

  componentDidMount() {
    this.setState({
      editor: new MediumEditor(DOM.findDOMNode(this.editor), this.props.options)
    })
  }

  componentWillUnmount() {
    this.state.editor.deactivate()
  }

  render() {
    return (
      <div className="col-block-medium">
        <div className="col-medium" onBlur={ this._onBlur } role="textarea" aria-multiline="true" ref={ (el) => this.editor = el } dangerouslySetInnerHTML={{ __html: this.props.content.html }} />
        { this.props.children }
      </div>
    )
  }

  _onBlur = () => {
    var editor = DOM.findDOMNode(this.editor)

    this.props.onChange({
      text: editor.textContent,
      html: editor.innerHTML
    })
  }

}

module.exports = Medium
