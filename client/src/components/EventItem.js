
import { ListGroupItem, Button, Alert,Col, Row, Label } from 'reactstrap';
import React, { Component } from 'react';
import {CSSTransition, TransitionGroup } from 'react-transition-group';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getEvents, deleteEvent, joinEvent} from '../actions/eventAction';
import {clearErrors} from '../actions/errorActions';

class EventItem extends Component {
    componentDidMount(){
        this.props.getEvents();
    }
    onDeleteClick = (id) =>{
        this.props.deleteEvent(id);

    }
      
    onJoinClick = (id) =>{
        console.log('join cicked', id);
        
        let user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        const event = {
            id: id,
            user_id: user.id,
            user_name: user.name,
            }
        this.props.joinEvent(event);
    }
    static propTypes ={
        //isAuthenticated:PropTypes.bool,
        error:PropTypes.object.isRequired,
        //login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }
    componentDidUpdate(prevProps){
        
        const {error} = this.props;
        const{item} = this.props;
        if(error != prevProps.error){
            //check for join event error
            if(error.id === 'JOIN_FAIL'){
                this.setState({msg:error.msg.msg,
                event:{
                    name: error.msg.event.event_name}

            });
            }else if(error.id === 'DELETE_EVENT_FAIL'){
                this.setState({msg:error.msg.msg,
                     event:{
                         name: error.msg.event.event_name}
    
                });
            }else if (item.event.id === 'SUCCESS_JOIN'){
                
                this.setState({msg:'You have successfully joined.'  ,event:{
                    name: error.msg.event.event_name}})
                
            }
            else{
                
                this.setState({msg:null  ,event:null})
                
            }
        }
        else if(item != prevProps.item){
            if(item.id === 'SUCCESS_JOIN'){
                this.setState({msg:'You have successfully joined the event:'  ,event:{
                    name: item.event.event_name}})
            }
            else if(item.id === 'SUCCESS_DELETE'){
                this.setState({msg:'You have successfully deleted the event:'  ,event:{
                    name: item.event.event_name}})
            }
        }
     }

    render() {
        const { items } = this.props.item;
        return (
            <div>
                 <TransitionGroup className="event-list">
                 
                        {items && items.map(({_id, event_name,sport_type,players_required,venue,additional_info,imageURL,start}) =>
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                


                                <ListGroupItem style={{marginBottom:"2%"}}>
                                    <Row>
                                        <Col>
                                            <img src={imageURL} style={{width:"80%"}} />
                                        </Col>
                                        <Col>
                                                <h2>{event_name}</h2>
                                                <br/>
                                                <Label><strong> Sports Type :</strong></Label>{sport_type}
                                                <br/>
                                                <Label><strong> Players Required :</strong></Label>{players_required}
                                                <br/>
                                                <Label><strong> Venue :</strong></Label>{venue}
                                                <br/>
                                                <Label><strong> Additional Info :</strong></Label>{additional_info}
                                                <br/>
                                                <Label><strong> Date :</strong></Label>{start}
                                                <br/>
                                                <Button 
                                                className="join-btn" 
                                                color ="danger" 
                                                
                                                onClick={this.onDeleteClick.bind(this,_id)}
                                                > <i class="fa fa-trash"></i>&nbsp;Delete</Button>
                                                <Button 
                                                className="join-btn" 
                                                color ="danger" 
                                                onClick={this.onJoinClick.bind(this,_id)}
                                                > <i class="fa fa-user-plus"></i> Join</Button> &nbsp;
                                            {(this.state.msg && (this.state.event.name === event_name) )? 
                                            (<Alert color='danger'>{this.state.msg} {this.state.event.name}</Alert>):
                                            null}                         
                                        </Col>
                                    </Row>
                                    
                                    
                                                     
                                </ListGroupItem>
                                    
                            </CSSTransition>
                        )}
                        
                    </TransitionGroup>
                    
            </div>
        )
    }
}
EventItem.propTypes = {
    getEvents: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item,
    event: state.event, 
    auth: state.auth,
    user: state.auth.user,
    error: state.error
})

export default connect(
    mapStateToProps,{getEvents,clearErrors,joinEvent,deleteEvent})
    (EventItem);