import React from "react";
import { connect } from "react-redux";

class Online extends React.Component {
    constructor(props) {
        super(props);
        //this.state
    }

    render() {
        console.log("this.props.", this.props);
        const { onlineUsers } = this.props;

        console.log("onlineUsers", onlineUsers);
        if (!onlineUsers) {
            return null;
        } else {
            return (
                <div className="online-users-container">
                    <h1>FIND ALL USERS THAT ARE ONLINE</h1>
                    {onlineUsers.map(user => {
                        console.log("friends images", user.profilepic);

                        const image_2 = user.profilepic || "./images/funny.gif";

                        console.log("online user in map", user);
                        //MAP MUST RETURN AN OBJ
                        return (
                            <div className="friends-list" key={user.id}>
                                <div className="friends-names">
                                    {user.first}
                                    <br />
                                    {user.last}
                                </div>
                                <img src={image_2} height="80" width="80" />
                            </div>
                        );
                    })}
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    console.log("STATE : ", state);
    return {
        onlineUsers: state.onlineUsers

        // // from MDN DOCUMENTATION:  word => word.length > 6
        // friends:
        //     state.friendsKey &&
        //     state.friendsKey.filter(friend => friend.accepted === true),
        //
        // wannabees:
        //     state.friendsKey &&
        //     state.friendsKey.filter(wannabees => wannabees.accepted === false)
        // // wannabes: , // use filter method  _> accepted: false
        // // friends:
    };
};

export default connect(mapStateToProps)(Online);
//
//  FROM IVANAS EXAMPLE
//
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
//
// class Hot extends React.Component {
//     render() {
//         const { users } = this.props;
//         if (!users) {
//             return null;
//         }
//         const hotUsers = (
//             <div className="users">
//                 {users.map(user => (
//                     <div className="user">
//                         <img src={user.image} />
// <div className="buttons">
// <button>Not</button>
// </div>
// </div>
// ))}
// </div>
// );
// return (
// <div id="hot">
// {!users.length && <div>Nobody is hot!</div>}
// {!!users.length && hotUsers}
// <nav>
// <Link to="/">Home</Link>
// <Link to="/not">See who&apos;s not</Link>
// </nav>
// </div>
// );
// }
// }
//
//
// const mapStateToProps = state => {
//     return {
//         users: state.users && state.users.filter(user => user.hot === true)
//     };
// };
//
// export default connect(mapStateToProps)(Hot);
//
//
