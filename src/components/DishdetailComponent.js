import React,{Component} from 'react';
import {Card, CardImg, CardText, CardBody,CardTitle ,Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody,Label,Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class ComponentForm extends Component{
    constructor(props) {
        super(props);
    
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
          isModalOpen: false
        };
    }
    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }
    render(){
    return(
        <div>
        <Button outline onClick={this.toggleModal}>
            <span className='fa fa-pencil'></span>Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}> 
            <ModalHeader isOpen={this.state.isModalOpen} toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <div className="form-group">
                    <Label htmlFor="rating">Rating</Label>
                        <Control.select model=".rating" name="rating" className="form-control">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Control.select>
                </div>
                <div className="form-group">
                    <Label htmlFor="author">Your Name</Label>
                        <Control.text model=".author" id="author" name="author" placeholder="Your Name" className="form-control" 
                        validators={{     required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="message" >Comments</Label>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="6"
                                        className="form-control" />
                            </div>
                            <div className="form-group">
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                            </div>

                </LocalForm>
            </ModalBody>
        </Modal>
        </div>
    );
    }
        

}
function RenderComments({comments}){

    const com = comments.map((comment)=>{
    return (
        <div>
            <div key={comment.id}>
                <ul className='list-unstyled'>
                    <li>{comment.comment}</li>
                    <li>--{comment.author},{comment.date}</li>
                </ul>
            </div>
        </div>
    );

});
return (
<div>
<h4>Comments</h4>
<div>{com}</div>
<ComponentForm/>
</div>);}
 function  RenderDish({dish}) {
    if (dish != null)
        return(
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    else
        return(
            <div></div>
        );
}
function DishDetail(props){
 
 


          return (
             <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
                </div>
        );
}
export default DishDetail;