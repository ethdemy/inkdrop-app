import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Form, FormGroup, Input, Card, CardBody } from 'reactstrap'

import iconPhoto from '../../../icons/icon-photo.svg'
import iconVideo from '../../../icons/icon-video.svg'
import iconPlace from '../../../icons/icon-place.svg'

class MessageForm extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      content: '',
      drops: 0, // TODO: add drop slider
      focus: false,
    }
  }

  onFocus() {
    this.setState({ focus: true })
  }

  onBlur() {
    this.setState({ focus: false })
  }

  getClass() {
    if (this.state.focus === true) return 'selected'
    else return ''
  }

  onContentChange(event) {
    this.setState({ content: event.target.value })
  }

  async handleSubmit(event) {
    event.preventDefault()
    if (this.state.content === '' && this.state.content.length < 2) {
      return alert('Please share something valuable.')
    }

    if (this.state.drops < 0) {
      return alert('Please add some drops to your post.')
    }

    let newMsg = {
      content: this.state.content,
      username: this.props.user.name,
      timestamp: Date.now(),
      likes: 0,
      drops: this.state.drops,
      userUrl: this.props.user.imgUrl,
      userAdr: this.props.accounts[0],
      id: this.props.messages.length,
      commentIds: [],
      comments: [],
      fromBlockchain: false,
      initialized: false,
    }

    this.props.onCreateMessage(newMsg)
    // TODO: delete content after TX_BROADCAST
    this.setState({ content: '' })
  }

  render() {
    var inputClass = this.getClass()
    return (
      <div id="post-message" className={`col-sm-7 ${inputClass}`}>
        <Card className="message-card">
          <CardBody className="d-flex flex-row pb-2">
            <img
              id="post-message-profile-picture"
              className="mr-2 profile-img"
              src={this.props.user.imgUrl || 'https://via.placeholder.com/50/85bd3e/85bd3e'}
              alt="profile"
            />
            <div>
              <strong id="post-message-username" className="align-top d-block card-username">
                @{this.props.user.name}
              </strong>
              <span className="card-message-time">now</span>
            </div>
          </CardBody>
          <CardBody className="py-2">
            <div id="send-area">
              <Form onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup>
                  <Input
                    type="textarea"
                    name="text"
                    rows="2"
                    id="content"
                    placeholder="Share something valuable"
                    value={this.state.content}
                    onChange={this.onContentChange.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                    onFocus={this.onFocus.bind(this)}
                  />
                </FormGroup>
                <Button color="green">Send</Button>
              </Form>
            </div>
          </CardBody>
          <CardBody className="pt-2">
            <div className="row">
              <div className="col">
                <div id="write-message-photo" className="float-left">
                  <img src={iconPhoto} width="20" height="20" className="" alt="add snapshot" />
                </div>
              </div>
              <div className="col">
                <div id="write-message-video" className="mx-auto">
                  <img src={iconVideo} width="20" height="20" className="" alt="add video" />
                </div>
              </div>
              <div className="col text-right">
                <div id="write-message-place" className="float-right mr-3">
                  <img src={iconPlace} width="20" height="20" className="" alt="add location" />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    )
  }
}

MessageForm.propTypes = {
  accounts: PropTypes.object,
  user: PropTypes.object,
  messages: PropTypes.array,
}

export default MessageForm
