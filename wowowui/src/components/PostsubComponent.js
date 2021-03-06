import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col, Row, FormFeedback, Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Link} from 'react-router-dom';
import Select from 'react-select';
var config = require('../config');

class Postsub extends Component {

    constructor(props){
        super(props);

        this.state = {
            image:['','',''],
            title:'',
            price:'',
            quantity:'',
            condition:'',
            delivery:'',
            category:'',
            subCategories:[],
            sizeInfo:'',
            detachable:'',
            careIns:'',
            productInsurance:'',
            damage:'',
            touched: {
                img1: false,
                title: false,
                price: false,
                quantity: false
            },
            isModalOpen: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleImgURLChange = this.handleImgURLChange.bind(this);
        this.handleMultiInputChange = this.handleMultiInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.toggleImgInstruction = this.toggleImgInstruction.bind(this);
    }

    toggleImgInstruction(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

            this.setState({
                [name]: value
            });
    }

    handleMultiInputChange = (events) => {
        var value = [];
        if(events){
        for(var i = 0;i < events.length;i++){
            value.push(events[i].value);
        }
    }
        this.setState({subCategories: value});
    }

    handleImgURLChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        var imgs = this.state.image.slice();

        if(name == 'img1') imgs[0] = value;
        else if(name == 'img2') imgs[1] = value;
        else
            imgs[2] = value;
        this.setState({image: imgs});
    }

    handleSubmit(event){
        event.preventDefault();
        let databody = {
            "image": this.state.image,
            "title": this.state.title,
            "price": this.state.price,
            "quantity": this.state.quantity,
            "condition": this.state.condition,
            "delivery": this.state.delivery,
            "category": this.state.category,
            "subCategories": this.state.subCategories,
            "sizeInfo": this.state.sizeInfo,
            "detachable": this.state.detachable,
            "careIns": this.state.careIns,
            "productInsurance": this.state.productInsurance,
            "damage": this.state.damage
        }
        fetch(config.serverUrl+'/postsub/'+this.props.username, {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+this.props.token
            },
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) this.props.history.push('/homeseller');
            else
                alert(JSON.stringify(data.err));
        })
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    }

    validate(img1, title, price, quantity) {

        const errors = {
            img1:'',
            title: '',
            price:'',
            quantity:''
        };

        if (this.state.touched.img1 && img1.length < 1)
            errors.img1 = 'At least one image should be uploaded';


        if (this.state.touched.title && title.length < 1)
            errors.title = 'Title should be >= 1 characters';

        const reg = /^\d+$/;
        if (this.state.touched.price && !reg.test(price))
            errors.price = 'Price should contain only numbers';
        if (this.state.touched.quantity && !reg.test(quantity))
            errors.quantity = 'Quantity should contain only numbers';

        return errors;
    }

    renderSelection(category){
        const options_home = [
            { value: 'furniture', label: 'Furniture' },
            { value: 'livingroom', label: 'Living room' },
            { value: 'bathroom', label: 'Bathroom' },
            { value: 'bedroom', label: 'Bedroom' },
            { value: 'dormroom', label: 'Dorm room' },
            { value: 'kitchen', label: 'Kitchen' },
            { value: 'storageOrganization', label: 'Storage and organization' },
            { value: 'homeDecor', label: 'Home Decor' },
            { value: 'others', label: 'Others' }
        ]
        const options_books = [
            { value: 'textbook', label: 'Textbook' },
            { value: 'others', label: 'Others' }
        ]
        const options_stationery = [
            { value: 'writingUtensils', label: 'Writing Utensils' },
            { value: 'organizationUtensils', label: 'Organization Utensils' },
            { value: 'notebook', label: 'Notebook' },
            { value: 'papers', label: 'Papers' },
            { value: 'others', label: 'Others' }
        ]
        const options_electronics = [
            { value: 'computer', label: 'Computer' },
            { value: 'phone', label: 'Phone' },
            { value: 'iclicker', label: 'iClicker' },
            { value: 'ipad', label: 'iPad' },
            { value: 'TV', label: 'TV' },
            { value: 'gaming', label: 'Gaming' },
            { value: 'headphone', label: 'Headphone' },
            { value: 'printer', label: 'Printer' },
            { value: 'others', label: 'Others' }
        ]
        const options_motors = [
            { value: 'bike', label: 'Bike' },
            { value: 'car', label: 'Phone' },
            { value: 'unicycle', label: 'Unicycle' },
            { value: 'skateboard', label: 'Skateboard' },
            { value: 'others', label: 'Others' }
        ]
        const options_pets = [
            { value: 'petSupplies', label: 'Pet Supplies' },
            { value: 'petFood', label: 'Pet Food' },
            { value: 'others', label: 'Others' }
        ]
        if(category == 'home'){
            return(
                options_home
            );
        }
        else if(category == 'books'){
            return(
                options_books
            );
        }
        else if(category== 'stationery'){
            return(
                options_stationery
            );
        }
        else if(category == 'electronics'){
            return(
                options_electronics
            );
        }
        else if(category == 'motors'){
            return(
                options_motors
            );
        }
        // pets
        else{
            return(
                options_pets
            );
        }
    }

    render() {
        const errors = this.validate(this.state.image[0], this.state.title, this.state.price, this.state.quantity);
        const { subCategory } = this.state;
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/homeseller'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Seller Post</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h5 style={{marginTop:"22px", fontFamily:"Arial Black"}}>Post Your Goods</h5>
                        <hr className="seperation" />
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <Form onSubmit={this.handleSubmit} class="form-style">
                            <Row>
                                <Col sm={12} md={{size:6, offset:3}}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="img1" className="form-style-label">URL for Image 1 (Required)</Label>
                                        <Input type="text" id="img1" name="img1" className="form-style-input" value={this.state.image[0]} valid={errors.img1 === ''} invalid={errors.img1 !== ''} onChange={this.handleImgURLChange} onBlur={this.handleBlur('img1')}/>
                                        <FormFeedback>{errors.img1}</FormFeedback>
                                        <iframe style={{width: "220px", marginTop:"20px"}} src={this.state.image[0]}></iframe>
                                        <Row>
                                        <Button className="button-mr" onClick={this.toggleImgInstruction} style={{marginBottom: "15px", border:"none", fontSize:"10px", color:"black", background:"none"}}>
                                        <i class="fa fa-question-circle" aria-hidden="true"></i> Images upload instruction
                                    </Button>
                                    </Row>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} md={{size:6, offset:3}}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="img2" className="form-style-label">URL for Image 2</Label>
                                        <Input type="text" id="img2" name="img2" className="form-style-input" value={this.state.image[1]} onChange={this.handleImgURLChange}/>
                                        <iframe style={{width: "220px", marginTop:"20px"}} src={this.state.image[1]}></iframe>                                    
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} md={{size:6, offset:3}}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="img3" className="form-style-label">URL for Image 3</Label>
                                        <Input type="text" id="img3" name="img3" className="form-style-input" value={this.state.image[2]} onChange={this.handleImgURLChange}/>
                                        <iframe style={{width: "220px", marginTop:"20px"}} src={this.state.image[2]}></iframe>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} md={{size:6, offset:3}}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="title" className="form-style-label">Title (Required)</Label>
                                        <Input type="text" id="title" name="title" className="form-style-input" placeholder="Title" value={this.state.title} valid={errors.title === ''} invalid={errors.title !== ''} onChange={this.handleInputChange} onBlur={this.handleBlur('title')}/>
                                        <FormFeedback>{errors.title}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={{size:6, offset:3}}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="price" className="form-style-label">Price (Required)</Label>
                                        <Input type="text" id="price" name="price" className="form-style-input" placeholder="Price in US Dollar" value={this.state.price} valid={errors.price === ''} invalid={errors.price !== ''} onChange={this.handleInputChange}/>
                                        <FormFeedback>{errors.price}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={{size:6, offset:3}}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="quantity" className="form-style-label">Quantity</Label>
                                        <Input type="text" id="quantity" name="quantity" className="form-style-input" value={this.state.quantity} valid={errors.quantity=== ''} invalid={errors.quantity !== ''} onChange={this.handleInputChange}/>
                                        <FormFeedback>{errors.quantity}</FormFeedback>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={6} md={{size:6, offset:3}}>
                                    <FormGroup>
                                        <select name="condition" className="select-list" onChange={this.handleInputChange}>
                                            <option selected disabled>Condition (Required)</option>
                                            <option value ="99">99% new - Package has been opened but not used</option>
                                            <option value ="90">90% new - Slightly used or color faded</option>
                                            <option value ="70">70% new - Visible scratches and visible lost paint/color</option>
                                            <option value ="50">50% new - Heavily used but still functional</option>
                                        </select> 
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={6} md={{size:6, offset:3}}>
                                    <FormGroup>
                                        <select name="delivery" className="select-list" onChange={this.handleInputChange}>
                                            <option selected disabled>Delivery Option (Required)</option>
                                            <option value ="pickup">Pick up</option>
                                            <option value ="delivery">Delivery</option>
                                            <option value ="both">Both</option>
                                        </select> 
                                    </FormGroup>
                                </Col>
                            </Row>
                            <div className="col-12 col-md-6 offset-md-3">
                                <p style={{fontSize:"16px", fontFamily:"Arial Black"}}>More about your goods</p>
                                <p style={{fontSize:"12px", marginTop:"-20px"}}>Please provide as much info as possible.</p>
                            </div>
                            <Row>
                                <Col xs={12} md={6} md={{size:6, offset:3}}>
                                    <FormGroup>
                                        <select name="category" className="select-list" onChange={this.handleInputChange}>
                                            <option selected disabled>Category and Subcategory (Required)</option>
                                            <option value ="home">Home</option>
                                            <option value ="books">Books</option>
                                            <option value ="stationery">Stationery</option>
                                            <option value ="electronics">Electronics</option>
                                            <option value ="motors">Motors</option>
                                            <option value ="pets">Pets</option>
                                        </select> 
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={6} md={{size:6, offset:3}}>
                                    <FormGroup>
                                        <Label htmlFor="subCategories">Subcategories</Label>
                                        <Select
                                            isMulti
                                            name="subCategories"
                                            value= {subCategory}
                                            options={this.renderSelection(this.state.category)}
                                            classNamePrefix="select"
                                            onChange={this.handleMultiInputChange}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} md={{size:6, offset:3}}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="sizeInfo" className="form-style-label">Size Info</Label>
                                        <Input type="text" id="sizeInfo" name="sizeInfo" className="form-style-input" value={this.state.sizeInfo} onChange={this.handleInputChange}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} md={{size:6, offset:3}}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="productInsurance" className="form-style-label">Product Insurance</Label>
                                        <Input type="text" id="productInsurance" name="productInsurance" className="form-style-input" placeholder="Ex. No insurance" value={this.state.productInsurance} onChange={this.handleInputChange}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} md={6} md={{size:6, offset:3}}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="detachable" className="form-style-label">Detaching Info</Label>
                                        <Input type="textarea" rows="5" id="detachable" name="detachable" value={this.state.detachable} onChange={this.handleInputChange}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} md={{size:6, offset:3}}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="careIns" className="form-style-label">Care Instruction</Label>
                                        <Input type="textarea" id="careIns" name="careIns" rows="5" value={this.state.careIns} onChange={this.handleInputChange}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} md={{size:6, offset:3}}>
                                    <FormGroup className="form-style-form-group">
                                        <Label htmlFor="damage" className="form-style-label">Description on damage(s)</Label>
                                        <Input type="textarea" id="damage" name="damage" rows="5" value={this.state.damage} onChange={this.handleInputChange}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} md={{size:6, offset:3}}>
                                    <FormGroup>
                                        <Button type="submit" value="submit" style={{background:"rgba(132,0,255,0.57)", width:"100%", fontFamily:"Arial Black"}}>Submit</Button>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleImgInstruction}>
                    <ModalHeader toggle={this.toggleImgInstruction}>Images Upload Instruction</ModalHeader>
                    <ModalBody>
                        <div className="row" style={{marginLeft:"5px"}}>
                            <p>1. Upload your image(s) to Google Drive</p>
                        </div>
                        <div className="row" style={{marginLeft:"5px"}}>
                            <p>For each image,</p>
                        </div>
                        <div classname="row" style={{marginLeft:"12px"}}>
                            <p>2. Open your image in Google Drive</p>
                            <p>3. Click on the icon at the right-top cornor (More actions)</p>
                            <p>4. Choose "Open in new window"</p>
                            <p>5. Click on the icon at the right-top cornor (More actions)</p>
                            <p>6. Choose "Embed item..."</p>
                            <p>7. Copy and paste the link after "src="</p>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default Postsub;