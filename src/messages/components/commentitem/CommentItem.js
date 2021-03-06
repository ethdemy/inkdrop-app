import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import Linkify from 'react-linkify'
import { CardFooter } from 'reactstrap'
import Moment from 'react-moment'
import ProfilePicture from '../../../user/components/profilepicture/ProfilePicture'

import loadingSpinner from '../../../icons/loading-spinner.svg'

class CommentItem extends PureComponent {
  renderTxStatus() {
    if (!this.props.comment.fromBlockchain) {
      let message = ''
      let cls = 'text-muted'
      if (this.props.comment.error) {
        message = this.props.comment.error
        cls = 'text-danger'
      } else if (this.props.comment.sendingMessage) {
        message = this.props.comment.sendingMessage
      }
      return (
        <CardFooter className="tx-card py-0">
          <div className="row">
            <div className="col">
              {!this.props.comment.error && (
                <img
                  className="mr-2 my-1"
                  src={loadingSpinner}
                  alt="loading"
                  width="20"
                  height="20"
                />
              )}
              <small className={cls}>{message}</small>
            </div>
          </div>
        </CardFooter>
      )
    }
  }

  render() {
    return (
      <div
        key={this.props.comment.id}
        className={`comment-card mb-4 ${this.props.comment.fromBlockchain ? '' : 'muted'}`}>
        <div>
          <div className="d-flex flex-row">
            <ProfilePicture
              diameter={50}
              address={this.props.comment.userAdr}
              url={this.props.comment.userUrl}
            />
            <div className="ml-2">
              <Link to={`/user/${this.props.comment.userAdr}`} className="message-header-link">
                <strong className="align-top d-block card-username">
                  @{this.props.comment.username}
                </strong>
              </Link>
              <span className="card-message-time">
                <Moment fromNow>{this.props.comment.timestamp}</Moment>
              </span>
            </div>
          </div>
          <div className="pt-2">{this.props.comment.content}</div>
        </div>
        {this.renderTxStatus()}
      </div>
    )
  }
}

CommentItem.propTypes = {
  comment: PropTypes.object,
}

export default CommentItem
