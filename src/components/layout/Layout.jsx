import React from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';

import { Grid, Icon } from 'semantic-ui-react';

import './Layout.css';

import Home from '../home/Home';
import Info from '../info/Info';
import Chat from '../chat/Chat';
import Mine from '../mine/Mine';
import NotFound from '../404/NotFound';

function MenuLink({ menuName, to, activeOnlyWhenExact, iconName }) {
	return (
		<Route
			path={to}
			exact={activeOnlyWhenExact}
			children={({ match }) => {
				return (
					<Link to={to}>
						<div className={match ? 'placeholder active' : 'placeholder'}>
							<Icon name={iconName} />
							<div>{menuName}</div>
						</div>
					</Link>
				);
			}}
		/>
	);
}

export default class Layout extends React.Component {
	render() {
		return (
			<div>
				<div className="main-content">
					<Switch>
						<Route path="/layout/home" component={Home} />
						<Route path="/layout/info" component={Info} />
						<Route path="/layout/chat" component={Chat} />
						<Route path="/layout/mine" component={Mine} />
						<Redirect exact from="/layout" to="/layout/home" />
						<Route component={NotFound} />
					</Switch>
				</div>
				<div className="main-menu">
					<Grid centered padded>
						<Grid.Row columns={4}>
							<Grid.Column>
								<MenuLink
									activeOnlyWhenExact={true}
									to="/layout/home"
									menuName="首页"
									iconName="user secret"
								/>
							</Grid.Column>
							<Grid.Column>
								<MenuLink to="/layout/info" menuName="资讯" iconName="window restore" />
							</Grid.Column>
							<Grid.Column>
								<MenuLink to="/layout/chat" menuName="微聊" iconName="microchip" />
							</Grid.Column>
							<Grid.Column>
								<MenuLink to="/layout/mine" menuName="我的" iconName="window maximize" />
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</div>
			</div>
		);
	}
}
