import React, { Component } from 'react';

import { Editor } from 'slate-react'
import Plain from 'slate-plain-serializer';
import { initializeApp } from 'firebase';
// const existingValue = localStorage.getItem('content')
const initialValue = Plain.deserialize(
  'A string of plain text.'
)
 
class SlateRichTextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: initialValue,
    }
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    let value = Plain.deserialize(
      'name:' + this.props.name + ", email: " + this.props.email
    )
    this.setState({ value })
  }

  onChange = ({ value }) => {
    if (value.document !== this.state.value.document) {
      const content = Plain.serialize(value)
      localStorage.setItem('content', content)
    }
    this.setState({ value })
  }

  onKeyDown = (event, change) => {
    console.log(event.key)
  }

  render() {
    return (
      <Editor 
        value={this.state.value} 
        onChange={this.onChange} 
        onKeyDown={this.onKeyDown}
      />
    )
  }
}
 
export default SlateRichTextEditor