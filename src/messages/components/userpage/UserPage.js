import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Linkify from 'react-linkify'
import ProfilePicture from '../../../user/components/profilepicture/ProfilePicture'
import MessageItemContainer from '../messageitem/MessageItemContainer'

// icons
import iconDrop from '../../../icons/icon-profile-drop.svg'
import iconSubs from '../../../icons/icon-profile-subs.svg'

class UserPage extends PureComponent {
  // constructor(props) {
  //   super(props)
  // this.followUser = this.followUser.bind(this)
  // this.unfollowUser = this.unfollowUser.bind(this)
  // }

  componentDidMount() {
    this.props.fetchUserMessages(this.props.address)
  }

  componentWillUnmount() {
    this.props.resetUserMessages()
  }

  // followUser() {
  //   this.props.followUser(this.props.address)
  // }

  // unfollowUser() {
  //   this.props.unfollowUser(this.props.address)
  // }

  render() {
    let user = this.props.user

    // temporary values until the data is fetched from the blockchain
    if (this.props.user === null) {
      user = {
        username: '',
        bio: '',
        drops: '',
        followers: '',
        ipfsHash: '',
        userUrl: '',
      }
    }

    return (
      <main className="user-page">
        <div className="container">
          <div className="row my-4">
            <div id="profile" className="col-sm-3 mt-2 text-left">
              <ProfilePicture diameter={190} address={this.props.address} url={user.userUrl} />
              <h3 id="profile-page-username" className="mt-4 mb-1">
                @{user.username}
              </h3>
              <div id="profile-page-occupation">
                <Linkify properties={{ target: '_blank' }}>{user.bio}</Linkify>
              </div>

              <div id="profile-page-userstats" className="my-4">
                <img src={iconDrop} width="35" height="35" className="" alt="" />
                <span id="profile-page-drops" className="ml-1">
                  {user.drops}
                </span>

                <img src={iconSubs} width="35" height="35" className="ml-5" alt="" />
                <span id="profile-page-subs" className="ml-1">
                  {user.followers}
                </span>
              </div>
            </div>

            <div id="profile-page-messages" className="col-sm-7 mt-2">
              {this.props.messages.map(msg => (
                <div className="mb-3" key={msg.id}>
                  <MessageItemContainer message={msg} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

  //   <div id="follow-buttons">
  //   <button id="follow-user-button" className="btn btn-green my-4 px-4 d-block">
  //     Follow
  //   </button>
  // </div>
}

UserPage.propTypes = {
  address: PropTypes.string,
  user: PropTypes.object,
  messages: PropTypes.array,
  fetchUserMessages: PropTypes.func,
  resetUserMessages: PropTypes.func,
  followUser: PropTypes.func,
  unfollowUser: PropTypes.func,
}

export default UserPage
