import React from "react";
import { connect } from "react-redux";
import {
    receiveFriendsWannabes,
    deleteFriend,
    acceptAsFriend
} from "./actions";

class Friends extends React.Component {
    constructor(props) {
        super(props);
        //this.state
    }

    componentDidMount() {
        // PASSING TO DISPATCH THE ACTION CREATOR THAT IS RESPONSIBLE FOR MAKING THE GET AXIOS REQUEST TO GET LIST OF FRIENDS AND WANNABEES
        this.props.dispatch(receiveFriendsWannabes());
    }

    render() {
        console.log("this.props", this.props);

        const { friends, wannabees } = this.props;

        if (!friends || !wannabees) {
            return null;
        } else {
            return (
                <div className="friends-wannabees-container">
                    <div className="friends-container">
                        <h1>YOUR FRIENDS</h1>
                        {friends.map(friends => {
                            //console.log("friends images", friends.profilepic);

                            const image_2 =
                                friends.profilepic || "./images/funny.gif";

                            console.log("friends in map", friends);
                            //MAP MUST RETURN AN OBJ
                            return (
                                <div className="friends-list" key={friends.id}>
                                    <div className="friends-names">
                                        {friends.first}
                                        <br />
                                        {friends.last}
                                    </div>
                                    <img src={image_2} height="80" width="80" />
                                </div>
                            );
                        })}
                    </div>

                    <div className="wannabees-container">
                        <h1>YOUR WANNABEES FRIENDS</h1>
                        {wannabees.map(wannabees => {
                            const image =
                                wannabees.profilepic || "./images/funny.gif";

                            //MAP MUST RETURN AN OBJ
                            return (
                                <div
                                    className="friends-list"
                                    key={wannabees.id}
                                >
                                    <div className="friends-names">
                                        {wannabees.first}
                                        <br />
                                        {wannabees.last}
                                    </div>
                                    <img
                                        src={image} /*|| "./images/funny.gif"*/
                                        height="80"
                                        width="80"
                                    />
                                    <button
                                        className="FriendButton"
                                        id="style-change"
                                        onClick={() =>
                                            this.props.dispatch(
                                                acceptAsFriend(wannabees.id)
                                            )
                                        }
                                    >
                                        ACCEPT AS FRIEND
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    console.log("STATE : ", state);
    return {
        // from MDN DOCUMENTATION:  word => word.length > 6
        friends:
            state.friendsKey &&
            state.friendsKey.filter(friend => friend.accepted === true),

        wannabees:
            state.friendsKey &&
            state.friendsKey.filter(wannabees => wannabees.accepted === false)
        // wannabes: , // use filter method  _> accepted: false
        // friends:
    };
};

export default connect(mapStateToProps)(Friends);
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
//                         <div className="buttons">
//                             <button>Not</button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         );
//         return (
//             <div id="hot">
//                 {!users.length && <div>Nobody is hot!</div>}
//                 {!!users.length && hotUsers}
//                 <nav>
//                     <Link to="/">Home</Link>
//                     <Link to="/not">See who&apos;s not</Link>
//                 </nav>
//             </div>
//         );
//     }
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
