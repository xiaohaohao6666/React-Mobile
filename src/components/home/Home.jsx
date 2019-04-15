import React from 'react';

import { Input, Dimmer, Loader, Grid, Icon, Item, Button } from 'semantic-ui-react';

import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import './Home.css';

import axios from 'axios';

import Map from '../map/Map'

/**
 * 资讯
 */
const Info = ({ infos }) => {
	return (
		<div className="home-msg">
			<Item.Group unstackable>
				<Item className="home-msg-img">
					<Item.Image size="tiny" src="http://47.96.21.88:8086/public/zixun.png" />
					<Item.Content>
						{infos.map((item) => {
							return (
								<Item.Header key={item.id}>
									<span>限购·</span>
									<span>{item.info_title}</span>
								</Item.Header>
							);
						})}
						<div className="home-msg-more">
							<Icon name="angle right" size="big" />
						</div>
					</Item.Content>
				</Item>
			</Item.Group>
		</div>
	);
};

/**
 * 问答
 */
const Faq = ({ faqs }) => {
	return (
		<div className="home-ask">
			<div className="home-ask-title">好客问答</div>
			<ul>
				{faqs.map((item) => {
					return (
						<li key={item.question_id}>
							<div>
								<Icon name="question circle outline" />
								<span>{item.question_name}</span>
							</div>
							<div>
								{item.question_tag.split(',').map((item) => {
									return (
										<Button key={item} basic color="green">
											{item}
										</Button>
									);
								})}
								<div>
									{item.atime}·<Icon name="comment alternate outline" />
									{item.qnum}
								</div>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

/**
 * 房源展示
 */
const HouseDis = ({ arr, name }) => {
	return (
		<div>
			<div className="home-hire-title">{name}</div>
			<Item.Group unstackable>
				{arr.map((item) => {
					return (
						<Item key={item.id}>
							<Item.Image size="tiny" src="http://47.96.21.88:8086/public/home.png" />
							<Item.Content>
                                <Item.Header>{item.home_name}</Item.Header>
                                <Item.Meta>{item.home_desc}</Item.Meta>
                                <Item.Description>
                                    {item.home_tags.split(',').map((sub) => {
                                        return (
                                            <Button key={sub} basic color="green">{sub}</Button>
                                        );
                                    })}
                                </Item.Description>
                                <Item.Description>{item.home_price}</Item.Description>
							</Item.Content>
						</Item>
					);
				})}
			</Item.Group>
		</div>
	);
};
const House = ({ houses }) => {
	// 最新开盘
	const newHouse = houses.filter((item) => item.home_type === 1);
	// 二手精选
	const oldHouse = houses.filter((item) => item.home_type === 2);
	// 热门房源
	const hotHouse = houses.filter((item) => item.home_type === 3);

	return (
        <div>
            <HouseDis arr={newHouse} name="最新开盘"></HouseDis>
            <HouseDis arr={oldHouse} name="二手精选"></HouseDis>
            <HouseDis arr={hotHouse} name="最新开盘"></HouseDis>
        </div>
    );
};

export default class Home extends React.Component {
	constructor() {
		super();

		this.state = {
			swipes: [],
			menus: [],
			infos: [],
			faqs: [],
			houses: [],
			isLoading: true
		};
	}

	componentWillMount() {
		Promise.all([
			axios.post('homes/swipe'),
			axios.post('homes/menu'),
			axios.post('homes/info'),
			axios.post('homes/faq'),
			axios.post('homes/house')
		]).then((res) => {
			this.setState({
				swipes: res[0].data.data.list,
				menus: res[1].data.data.list,
				infos: res[2].data.data.list,
				faqs: res[3].data.data.list,
				houses: res[4].data.data.list,
				isLoading: false,
				isShowMap: false
			});
		});
    }
    
    menuTap = id=>{
        switch (id) {
            case 1:
                this.props.history.push({pathname:'/list',search: "?house_type=1&house_title=二手房"})
                break;
            case 2:
                this.props.history.push({pathname:'/list',search: "?house_type=2&house_title=新房"})
                break;
            case 3:
                this.props.history.push({pathname:'/list',search: "?house_type=3&house_title=租房"})
                break;
            case 4:
                this.props.history.push({pathname:'/list',search: "?house_type=4&house_title=海外"})
				break;
			case 5:
                this.setState({isShowMap: true})
				break;
			case 7:
                
                break;
            default:
                break;
        }
	}
	
	hideMap = ()=>{
		this.setState({
			isShowMap: false
		})
	}

	render() {
		const { swipes, isLoading, menus, infos, faqs, houses, isShowMap } = this.state;

		// 九宫格列表
		const Menu = ({ menus }) => {
			return (
				<Grid padded>
					<Grid.Row columns={4}>
						{menus.map((item) => {
							return (
								<Grid.Column key={item.id} onClick={()=>{this.menuTap(item.id)}}>
									<div className="home-menu-item">
										<Icon name="home" size="big" />
									</div>
									<div style={{ marginTop: 5 }}>{item.menu_name}</div>
								</Grid.Column>
							);
						})}
					</Grid.Row>
				</Grid>
			);
        };

		return (
			<div className="home-container">
				<Dimmer active={isLoading} inverted>
					<Loader size="medium">正在加载中...</Loader>
				</Dimmer>
				{/* map */}
				{isShowMap && <Map hideMap={this.hideMap}/>}
				{/* 搜索框 */}
				<div className="home-topbar">
					<Input fluid icon={{ name: 'search', circular: true, link: true }} placeholder="Search..." />
				</div>
				<div className="home-content">
					{/* 轮播图 */}
					<ImageGallery
						items={swipes}
						showPlayButton={false}
						showFullscreenButton={false}
						showThumbnails={false}
					/>
					{/* 九宫格列表 */}
					<Menu menus={menus} />
					{/* 资讯 */}
					<Info infos={infos} />
					{/* 问答 */}
					<Faq faqs={faqs} />
					{/* 房屋分类列表 */}
					<House houses={houses} />
				</div>
			</div>
		);
	}
}
