/**
 * Created by benpo on 03/05/2017.
 */
import React, { Component } from 'react';
import './App.css';
import 'reddit.js';
import ImageList from './arr to list';
import {Navbar,FormGroup,FormControl,Button, Col, Pager } from 'react-bootstrap';

let reddit = window.reddit;

class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            picturesArr: [],
            urlArr: [],
            titleArr:[],
            nextPage: null,
            previousPage:'',
            limit: 9,
            currentPage:null,
            valueToSearch: "",
            currentSearch:""

        };

        this.loadSubreddit = this.loadSubreddit.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.searchWasStarted = this.searchWasStarted.bind(this);
        this.searchValueInput = this.searchValueInput.bind(this);
        this.checkIfStartSearch = this.checkIfStartSearch.bind(this)
    }

    loadSubreddit(subre, before){
        let pictures = [];
        let urls =[];
        let titles=[];
        let nextpage =this.state.nextPage;
        let pageback=null;
        let currentPage=this.state.currentPage;
        reddit.hot(subre).after(before).limit(this.state.limit).fetch(function(res) {
            pageback=currentPage;
            currentPage=nextpage;

            nextpage = res.data.after.toString();
            for (let i = 0; i < res.data.children.length; i++){
                if (checkIfPicture(res.data.children[i].data.url))
                    pictures.push(res.data.children[i].data.url);
                else if(res.data.children[i].data.url.includes('imgur'))
                    pictures.push(res.data.children[i].data.url.concat('.jpg'));
                else
                    pictures.push(res.data.children[i].data.url);
                urls.push(res.data.children[i].data.permalink);
                titles.push(res.data.children[i].data.title);

            }

            this.setState({
                picturesArr: pictures,
                urlArr: urls,
                titleArr: titles,
                nextPage: nextpage,
                previousPage:pageback,
                currentPage: currentPage
            })
        }.bind(this));

        }

    previousPage(){
        this.loadSubreddit(this.state.currentSearch,this.state.previousPage);
    }
    nextPage(){
        this.loadSubreddit(this.state.currentSearch,this.state.nextPage);
    }

    searchWasStarted(){
        this.setState({
            currentSearch: this.state.valueToSearch
        }, () => {this.loadSubreddit(this.state.currentSearch,null)});

    }
    searchValueInput(searchValue){
        this.setState({
            valueToSearch: searchValue.target.value
        })
    }
    checkIfStartSearch(event){
        if (event.keyCode === 13)
            this.searchWasStarted()
    }

  render() {
        return (
        <div className="App">
        <div className="App-header">
            <h2>Reddit Gallery Search</h2>
            <Navbar.Form >
                <FormGroup>
                    <FormControl
                        action=""
                        method="get"
                        type="text"
                        placeholder="Search"
                        onChange={this.searchValueInput}
                        onKeyDown = {this.checkIfStartSearch}  />
                </FormGroup>
                {' '}
                <Button type="submit" id="btnSearch" onClick={this.searchWasStarted}>Submit</Button>
            </Navbar.Form>
        </div>
            <Col sm={8} md={10} smOffset={2} mdOffset={1} >
                <ImageList picturese={this.state.picturesArr} urls={this.state.urlArr} topicNames={this.state.titleArr} />
            </Col>

            <Col sm={12}>
                <Pager>
                    <Pager.Item onSelect={this.previousPage}>&larr; Previous Page</Pager.Item>
                    <Pager.Item onSelect={this.nextPage} >Next Page &rarr;</Pager.Item>
                </Pager>
            </Col>
        </div>
    );
  }
}


function checkIfPicture(url) {

    return (url.includes('.png')||url.includes('.jpg')||url.includes('.png')||url.includes('.gif'))
}

export default App;
