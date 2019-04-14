import React from 'react'


import {Input} from 'semantic-ui-react'

import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

import './Home.css'

export default class Home extends React.Component {
    render() {
        const images = [
            {
                original: 'http://lorempixel.com/1000/600/nature/1/',
                thumbnail: 'http://lorempixel.com/250/150/nature/1/',
            },
            {
                original: 'http://lorempixel.com/1000/600/nature/2/',
                thumbnail: 'http://lorempixel.com/250/150/nature/2/'
            },
            {
                original: 'http://lorempixel.com/1000/600/nature/3/',
                thumbnail: 'http://lorempixel.com/250/150/nature/3/'
            }
        ]
        return (
            <div className="home-container">
                <div className="home-topbar">
                    <Input fluid icon={{ name: 'search', circular: true, link: true }} placeholder='Search...' />
                </div>
                <div className="home-content">
                    <ImageGallery items={images} showPlayButton={false} showFullscreenButton={false} showThumbnails={false}></ImageGallery>
                </div>
            </div>
        )           
    }
}
