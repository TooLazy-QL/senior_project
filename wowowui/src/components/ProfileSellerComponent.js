import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, Row, FormFeedback} from 'reactstrap';
import {Link} from 'react-router-dom';
var config = require('../config');

class ProfileSeller extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            nickname: '',
            phone:'',
            email: '',
            address:'',
            city:'',
            theState:'',
            zipcode:'',
            touched: {
                username: false,
                password: false,
                nickname: false,
                phone: false,
                email: false
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    componentDidMount() {
        fetch(config.serverUrl+'/profileseller/'+this.props.username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+this.props.token
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                username: data.username,
                password: data.password,
                nickname: data.nickname,
                phone: data.phone,
                email: data.email,
                address: data.address,
                city: data.city,
                theState: data.theState,
                zipcode: data.zipcode,
                credit: data.credit
            })
        })

    }

    handleInputChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event){
        event.preventDefault();
        let databody = {
            "nickname": this.state.nickname,
            "phone": this.state.phone,
            "email": this.state.email,
            "address": this.state.address,
            "city": this.state.city,
            "theState": this.state.theState,
            "zipcode": this.state.zipcode
        }
        fetch(config.serverUrl+'/profileseller/'+this.props.username, {
            method: 'PUT',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+this.props.token
            },
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                alert(data.status);
                this.props.history.push('/profileseller');
            }
            else
                alert(JSON.stringify(data));
        })
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    }

    validate(username, password, nickname, phone, email) {

        const errors = {
            username: '',
            password: '',
            nickname: '',
            phone: '',
            email: ''
        };

        if (this.state.touched.username && username.length < 1)
            errors.username = 'Username should be >= 1 characters';
        else if (this.state.touched.username && username.length > 10)
            errors.username = 'Userame should be <= 10 characters';

        if (this.state.touched.nickname && nickname.length < 1)
            errors.nickname = 'Nickname should be >= 1 characters';
        else if (this.state.touched.nickname && nickname.length > 10)
            errors.nickname = 'Nickname should be <= 10 characters';

        if (this.state.touched.password && password.length < 6)
            errors.password = 'Password should be >= 6 characters';
        else if (this.state.touched.password && password.length > 20)
            errors.password = 'Password should be <= 20 characters';

        const reg = /^\d+$/;
        if (this.state.touched.phone && !reg.test(phone))
            errors.phone = 'Phone Number should contain only numbers';

        if (this.state.touched.phone && phone.length !== 10)
            errors.phone = 'Phone Number should have 10 digits';
            
        if (this.state.touched.email && email.includes("@case.edu") !== true && email.includes("@CASE.EDU") !== true)  
            errors.email = 'Please use your Case email for sign up';

        return errors;
    }

    render() {
        const errors = this.validate(this.state.username, this.state.password, this.state.nickname, this.state.phone, this.state.email);
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/homeseller'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Profile</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3><b>Profile for <em>{this.state.nickname}</em></b></h3>
                    </div>
                </div>

                <div className="row row-content">
                    <div className="col-12">
                        <h3>Account Details</h3>
                        <hr className="seperation" />
                    </div>
                    <div className="col-12">
                        <Form onSubmit={this.handleSubmit} class="form-style">
                            <Row>
                                <Col md={6}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="username" className="form-style-label">Username</Label>
                                        <Input disabled type="text" id="username" name="username" className="form-style-input" placeholder={this.state.username} value={this.state.username} valid={errors.username === ''} invalid={errors.username !== ''} onChange={this.handleInputChange} onBlur={this.handleBlur('username')}/>
                                        <FormFeedback>{errors.username}</FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="nickname" className="form-style-label">Nickname</Label>
                                        <Input type="text" id="nickname" name="nickname" className="form-style-input" placeholder={this.state.nickname} value={this.state.nickname} valid={errors.nickname === ''} invalid={errors.nickname !== ''} onChange={this.handleInputChange} onBlur={this.handleBlur('nickname')}/>
                                        <FormFeedback>{errors.nickname}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="email" className="form-style-label">Email</Label>
                                        <Input type="text" id="email" name="email" className="form-style-input" placeholder={this.state.email} value={this.state.email} valid={errors.email === ''} invalid={errors.email !== ''} onChange={this.handleInputChange} onBlur={this.handleBlur('email')}/>
                                        <FormFeedback>{errors.email}</FormFeedback>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="phone" className="form-style-label">Phone</Label>
                                        <Input type="text" id="phone" name="phone" className="form-style-input" placeholder={this.state.phone} value={this.state.phone} valid={errors.phone === ''} invalid={errors.phone !== ''} onChange={this.handleInputChange} onBlur={this.handleBlur('phone')}/>
                                        <FormFeedback>{errors.phone}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="credit" className="form-style-label">Credit Score</Label>
                                        <Input disabled type="text" id="credit" name="credit" className="form-style-input" placeholder={this.state.credit} value={this.state.credit} onChange={this.handleInputChange} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={5}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="address" className="form-style-label">Address</Label>
                                        <Input type="text" id="address" name="address" className="form-style-input" placeholder={this.state.address} value={this.state.address} onChange={this.handleInputChange}/>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="city" className="form-style-label">City</Label>
                                        <Input type="text" id="city" name="city" className="form-style-input" placeholder={this.state.city} value={this.state.city} onChange={this.handleInputChange}/>
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="theState" className="form-style-label">State</Label>
                                        <Input type="text" id="theState" name="theState" className="form-style-input" placeholder={this.state.theState} value={this.state.theState} onChange={this.handleInputChange}/>
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="zipcode" className="form-style-label">Zipcode</Label>
                                        <Input type="text" id="zipcode" name="zipcode" className="form-style-input" placeholder={this.state.zipcode} value={this.state.zipcode} onChange={this.handleInputChange}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <FormGroup>
                                    <Button disabled={errors.username !== ''||errors.password!==''||errors.nickname!==''||errors.phone!==''||errors.email!==''||this.state.username===''||this.state.password===''||this.state.nickname===''||this.state.phone===''||this.state.email===''} type="submit" className="button-width button-mr" color="primary">
                                        Save
                                    </Button>
                                    <Button type="reset" className="button-width">
                                        Cancel
                                    </Button>
                                </FormGroup>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileSeller;