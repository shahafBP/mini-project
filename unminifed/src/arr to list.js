/**
 * Created by benpo on 03/05/2017.
 */
import React from 'react';
import {ListGroup, ListGroupItem, Col } from 'react-bootstrap';
import './img.css';


        const ImageList = ({picturese,urls,topicNames}) => {
            let picture;
            picture = picturese.map((pic, i) => {
                return ( <Col sm={6} md={4} key={i} >
                        <ListGroupItem>
                            <img
                                className="redditPics"
                                style={{'height':'150px'}}
                                alt="Sorry, This is not an Image"
                                src={pic}
                                title={topicNames[i]}
                                onClick={()=>{return(window.open('https:\\reddit.com' + urls[i]))}}
                        />
                        </ListGroupItem>
                    </Col>
                )
            });

            return (
                <ListGroup>
                    {picture}
                </ListGroup>
            )
        };

        export default ImageList;

