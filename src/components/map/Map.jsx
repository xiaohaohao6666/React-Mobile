import React from 'react'
import './Map.css'

import {Icon} from 'semantic-ui-react'

export default class Mpa extends React.Component {
    render() {
        return (
            <div className="map-house">
                <div className="map-house-title">
                   <Icon onClick={()=>{this.props.hideMap()}} size="large" name="angle left"/>
                <span>地图找房</span>
                </div>
            </div>
        )
    }
}
