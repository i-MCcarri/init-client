import React, { Component } from 'react';
import InitContentContext from '../../contexts/initContentContext';
import { buffTo64 } from '../../components/Utils/Utils';
import InitContentApiService from '../../services/init-content-api-service';
import FeedGallery from '../../components/FeedGallery/FeedGallery';


class Feed extends Component {
    static contextType = InitContentContext

    state = {
        photos: []
    }

    // componentDidMount() {
    //     const { setCurrentAvatar } = this.context
    //     InitContentApiService.getAvatar()
    //         .then(res => setCurrentAvatar({ currentAvatar: res }))
    //         // .catch(this.context.setError)
    // }

    handleGetAvatar = ev => {
        ev.preventDefault()

        InitContentApiService.getAvatar()
            .then(res => this.setState({ photos: res }))
            .catch((err) => {
                console.log("Went Wrong", err);
        })
    }

    renderPhotos() {
        if (this.state.photos) {
            return (
                this.state.photos.map((val) => (
                  <div className="slot" key={val.id}>
                    <h4>Name: {val.name}</h4>
                    <h4>Created:{new Date(val.date).toLocaleString()}</h4>
                    <img
                      alt=""
                      src={`data:image/${val.img_type};base64,${buffTo64(val.img_file.data)}`}
                    />
                    <hr />
                  </div>
                ))
            )
        } else {
            return ''
        }
    }

    render() {
        return (
            <div>
                <h1>Le Feed</h1>
                {/* <button onClick={this.handleGetAvatar}>Click Me</button> */}
                <FeedGallery />
                {this.renderPhotos()}
            </div>
        );
    };
};

export default Feed;