import React from 'react';
import './List.css';

import {Icon,Item} from 'semantic-ui-react'

import axios from 'axios'

export default class List extends React.Component {
	constructor() {
		super();

		this.state = {
			house_list: []
		};
	}

	async componentWillMount() {
        const house_type = new URLSearchParams(this.props.location.search).get('house_type');
        const res = await axios.post('homes/list',{home_type: house_type})
        
		this.setState({
            house_list: res.data.data
		});
	}

	render() {
        const {house_list} = this.state
		return (
			<div className="house-list">
				<div className="house-list-title">
					<Icon onClick={() => {this.props.history.goBack()}} name="angle left" size="large" />
					<span>{new URLSearchParams(this.props.location.search).get('house_title')}</span>
				</div>
				<div className="house-list-content">
                <Item.Group unstackable>
                    {
                        house_list.map(item =>{
                            return (
                                <Item key={item.id}>
                                    <Item.Image size='tiny' src='http://47.96.21.88:8086/public/home.png' />
                                    <Item.Content>
                                        <Item.Header>{item.home_name}</Item.Header>
                                        <Item.Meta>{item.home_desc}</Item.Meta>
                                        <Item.Description>{item.home_tags}</Item.Description>
                                        <Item.Description>{item.home_price}</Item.Description>
                                    </Item.Content>
                                </Item>
                            )
                        })
                    }
                </Item.Group>
                </div>
			</div>
		);
	}
}
