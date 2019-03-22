import React from "react";
import Uploader from "./uploader";
import axios from "./axios";
import Profile from "./profile";
import OtherProfile from "./otherprofile";
import Friends from "./friends";
import Online from "./online";
import Chat from "./chat";
import { BrowserRouter, Route } from "react-router-dom";
import ProfilePic from "./profilepic";

// MAKING THE UPLOADER
// want to randomily assign a photo that is connected to the id, but as soon as it has been set to be fixed @checklater!
export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = { uploaderIsVisible: false };

        //bind it later
        this.showUploader = this.showUploader.bind(this);
        this.hideUploader = this.hideUploader.bind(this);
        this.setImage = this.setImage.bind(this);
        this.setBio = this.setBio.bind(this);
    }

    showUploader(e) {
        console.log("clociked on the image");
        e.preventDefault();
        this.setState({ uploaderIsVisible: true });
    }
    hideUploader() {
        this.setState({ uploaderIsVisible: false });
    }

    setImage(image) {
        console.log("IMAGE in setImage", image);
        this.setState({ profilePic: image, uploaderIsVisible: false }); //image: image
    }

    setBio(bio) {
        console.log("IMAGE in setImage", bio);
        this.setState({ bio: bio });
    }

    // WILL RETURN THE LOGGED-IN USER'S INFO(id, firstName, lastName, profile pic url)
    // AFTER AJAX RESPONSE HAS BEEN RECEIVED -> the app instance should pass it to the setState() -> so that it will be able to pass user info to any of the components it contains
    // invoked immediately after a component is mounted  (inserted into the tree)

    // async componentDidMount() {
    //     let response = await axios.get("/user");
    //     //trigger an extra rendering, but it will happen before the browser updates the screen. This guarantees that even though the render() will be called twice in this case, the user won’t see the intermediate state.
    //     console.log("DATA in componentDidMount", response);
    //     this.setState({
    //         id: response.data.id,
    //         firstName: response.data.first,
    //         lastName: response.data.last
    //     });
    // }
    componentDidMount() {
        axios.get("/user").then(data => {
            //trigger an extra rendering, but it will happen before the browser updates the screen. This guarantees that even though the render() will be called twice in this case, the user won’t see the intermediate state.
            // console.log("DATA in componentDidMount", data);
            // console.log("The IMG in componentDidMount", data.profilepic);
            this.setState({
                id: data.data.id,
                firstName: data.data.first,
                lastName: data.data.last,
                profilePic: data.data.profilepic,
                bio: data.data.bio
            });
        });
    }

    render() {
        // console.log("this.state in app!", this.state);
        if (!this.state.id) {
            return null;
        } else {
            const image = this.state.profilePic || "./images/profile_pic.png";

            return (
                <div>
                    <div className="header-container">
                        <ProfilePic
                            style={{ height: "20px", width: "20px" }}
                            image={image}
                            first={this.state.first}
                            last={this.state.last}
                            onClick={this.showUploader}
                        />
                    </div>
                    <div className="navigation-container">
                        <a href="/getFriends" id="nav_1">
                            list of friends
                        </a>

                        <a href="/chat" id="nav_2">
                            chat
                        </a>

                        <a href="/getOnlineUsers" id="nav_3">
                            see who is online
                        </a>

                        <a href="/logout" id="nav_4">
                            logout
                        </a>
                    </div>

                    <div className="content-container">
                        {this.state.uploaderIsVisible && (
                            <Uploader
                                hideUploader={this.hideUploader}
                                setImage={this.setImage}
                            />
                        )}
                        <BrowserRouter>
                            <div>
                                <Route
                                    exact
                                    path="/"
                                    render={() => (
                                        <Profile
                                            id={this.state.id}
                                            first={this.state.firstName}
                                            last={this.state.lastName}
                                            onClick={this.showUploader}
                                            image={this.state.profilePic}
                                            bio={this.state.bio}
                                            setBio={this.setBio}
                                        />
                                    )}
                                />
                                <Route
                                    path="/user/:id"
                                    component={OtherProfile}
                                />
                                <Route path="/getFriends" component={Friends} />
                                <Route
                                    path="/getOnlineUsers"
                                    component={Online}
                                />
                                <Route path="/chat" component={Chat} />
                            </div>
                        </BrowserRouter>
                    </div>
                </div>
            );
        }
    }
}

/*
<Profile
    image={this.state.profilePic}
    first={this.state.firstName}
    last={this.state.lastName}
    onClick={this.showUploader}
    id={this.state.id}
    bio={this.state.bio}
    setBio={this.setBio}
/>
*/

//<Uploader uploadNewImage={this.state.image} />
// {this.state.uploaderIsVisible && (
//     <Uploader
//         hideUploader={this.hideUploader}
//         setImage={this.setImage}
//     />
// )}

//if uploader visible !! in app
//THE BUTTON SHOULD BE A LABLE
// <label htmlFor="file">BROWSE</label>
// <input type="file" id="file" onChange={e=> (
//     //-> make it hide!!//UPDATING THE ROW IN THE USER TABLE AND NOT INSERTING SET image
//         const fd = new FormData;
//         fs.append('file', e.target.files[0]);
// )}>

/*BrowserRouter -> it bases its matching on the path portion of the url rather than the hash.

It does this using the history API, which allows it to add browser history entries when users click on links to defined routes and to detect when users navigate to routes by using the browser's back button.

Using BrowserRouter requires diligence about using React Router's Link component for all links to routes. Link creates <a> elements that have click handlers attached to them that override the default link behavior. The href of the link is not automatically navigated to in response to a click. Instead, the url is updated and the component that corresponds to the new url is rendered. If plain <a> tags were used instead of the Link component, clicks on links would result in the page unloading and a request for an HTML page being made to the server, breaking the single page app experience.

It will still be possible for requests for pages to make it to the server. For example, the server will receive a request if a user navigates by typing a url into the browser's location bar rather than by clicking a link. For this reason, it is necessary to have a catch-all ('*') route that serves index.html. When index.html loads, React Router will determine and automatically render the correct component(s) based on the url.

For the catch-all route to serve its purpose, it is necessary that in your Express app there are no routes that match any of the paths you specify for your Route components in your React app. If, for example, you set the path prop of a Route component to '/user/:id', there should be no '/user/:id' route on the server. You might use '/api/user/:id' or '/user/:id.json' for your server route instead.

2 Route components 1. Profile
                2. new OtherProfile

In the case of Profile, the Route component will look a little different than the Route components did in the HashRouter contained by the Welcome component.

Because Profile must be passed props, we cannot use the component prop to specify the component to use. Instead, we must use the render prop and set it to a function that renders the Profile.
*/
