import React, {Component} from 'react';
import './Header.css';
import {connect} from 'react-redux';
import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title:'',
      description:''
    }
  }
  addItem() {
    if (this.state.title) {
      this.props.dispatch({
        type:'ADD_NEW_ITEM',
        title:this.state.title,
        description:this.state.description
      })
      this.setState({
        title:'',
        description:''
      })
      let form = document.getElementById('header-input-form');
      form.reset();
    } else {
      alert('please add a title to your task!');
    }
  }

  handleChange(val, type) {
    type==='T'?
    this.setState({
      title:val
    }):
    this.setState({
      description:val
    })
  }
  goHome() {
    this.props.dispatch({
      type:'CLEAR_ITEM_SELECTED'
    })
  }

  render() {
    return(
      <header className='header-container'>
        <Link onClick={(e)=>{this.goHome()}} to='/' className='header-title-section'>
          Todo App
        </Link>
        <section className='header-menu-section'>
          <form id='header-input-form' className='header-input-form'>
            <input onChange={(e)=>{this.handleChange(e.target.value, 'T')}} className='header-title-input' placeholder='Title'/>
            <textarea onChange={(e)=>{this.handleChange(e.target.value, 'D')}} className='header-description-input' placeholder='Description'/>
            <div onClick={()=>{this.addItem()}} className='header-add-button'/>
          </form>
        </section>
      </header>
    )
  }
}

export default connect()(Header)