import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn, signOut } from '../actions'

export class GoogleAuth extends Component {

    componentDidMount(){
        // loading the gapi library
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '538234652461-hu4gvsfe469lf6t52lcp7cnc1t05rs4r.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                // Initializing the auth library
                this.auth = window.gapi.auth2.getAuthInstance();
                // update auth in redux store
                this.onAuthChange(this.auth.isSignedIn.get())
                // listening for change in status
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }
    onAuthChange = (isSignedIn) => {
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId())
        } else {
            this.props.signOut()
        }
    }

    onSignIn = () => {
        this.auth.signIn()
    }

    onSignOut = () => {
        this.auth.signOut()
    }

    renderAuthButton() {
        if(this.props.isSignedIn === null){
            return null
        } else if (this.props.isSignedIn){
            return (
            <button onClick={this.onSignOut} className="ui red google button">
                <i className="google icon" />
                Sign Out
            </button>
            )
        } else {
            return (
                <button onClick={this.onSignIn} className="ui red google button">
                    <i className="google icon" />
                    Sign In
                </button>
                )
        }
    }

   

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth)

