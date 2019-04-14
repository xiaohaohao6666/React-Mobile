import React from 'react'
import './Login.css'

import { Form } from 'semantic-ui-react'
import axios from 'axios'

export default class Login extends React.Component {
    constructor(){
        super()

        this.state = {
            uname: '',
            pwd: ''
        }

    }

    render() {
        return (
            <div className="login-container">
                <div className="login-title">登录</div>
                <div className="login-form">
                    <Form>
                        <Form.Field>
                            <Form.Input name='uname' value={this.state.uname} onChange={this.change} icon='user' placeholder='请输入用户名' iconPosition='left'/>
                        </Form.Field>
                        <Form.Field>
                            <Form.Input name='pwd' value={this.state.pwd} onChange={this.change} icon='lock' placeholder='请输入密码' iconPosition='left' type='password'/>
                        </Form.Field>
                        <Form.Button type='submit' positive onClick={this.click}>Submit</Form.Button>
                    </Form>
                </div>
            </div>
        )
    }

    change = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    click = ()=>{
        axios.post('users/login',this.state).then(res=>{
            console.log(res);
            if(res.data.meta.status === 200){
                this.props.history.push('/layout')
            }
        })
    }
}
