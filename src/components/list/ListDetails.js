import React, {Component} from 'react';
import {connect} from 'react-redux';
import './ListDetails.css';

class ListDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit:false,
      title:'',
      description:'',
    }
  }
  toggleEdit() {
    this.setState({
      edit: this.state.edit? false : true
    })
  }
  handleChange(val, type) {
    type==='title'?
    this.setState({
      title: val,
    }) :
    this.setState({
      description: val,
    })
  }
  saveChanges(comp, oldTitle, oldDescription) {
    if (this.state.title && this.state.description) {
      this.props.dispatch({
        type: 'SAVE_CHANGES',
        title: this.state.title,
        description: this.state.description,
        comp,
        oldTitle,
        oldDescription
      })
    } else if (this.state.title) {
      this.props.dispatch({
        type: 'SAVE_CHANGES',
        title: this.state.title,
        comp,
        oldTitle,
        oldDescription
      })
    } else if (this.state.description) {
      this.props.dispatch({
        type: 'SAVE_CHANGES',
        description: this.state.description,
        comp,
        oldTitle,
        oldDescription
      })
    } else {
      alert('please edit title or description to save!');
    }
    this.setState({
      title:'',
      description:'',
    })
    let titleForm = document.getElementById('list-details-title-form'),
        descriptionForm = document.getElementById('list-details-description-form');
    titleForm.value = '';
    descriptionForm.value = '';
  }
  cancelChanges() {
    this.setState({
      edit: false,
      title: '',
      description: '',
    })
    let titleForm = document.getElementById('list-details-title-form'),
        descriptionForm = document.getElementById('list-details-description-form');
    titleForm.value = '';
    descriptionForm.value = '';
    this.props.dispatch({
      type: 'CLEAR_ITEM_SELECTED',
    })
  }
  render() {
    let propItem = this.props, 
    currentItem = (
      <div className='list-details-item-loading'>
        Select an item to view details!
      </div>
    )
    let edit = this.state.edit?
    (
      <div className='list-details-edit-section'>
        <input placeholder='Edit Title' id='list-details-title-form' onChange={(e)=>{this.handleChange(e.target.value, 'title')}} className='list-details-edit-title'/>
        <input placeholder='Edit Description' id='list-details-description-form' onChange={(e)=>{this.handleChange(e.target.value, 'description')}} className='list-details-edit-description'/>
        <div onClick={(e)=>{this.saveChanges(propItem.itemSelected.completed, propItem.itemSelected.title, propItem.itemSelected.description)}} className='list-details-edit-save-button'/>
        <div onClick={(e)=>{this.cancelChanges()}} className='list-details-edit-cancel-button'/>
      </div>
    ) : null
    if (propItem.itemSelected && propItem.itemSelected.title) {
      currentItem = (
        <div className='list-details-item-loaded'>
          <header className='list-details-item-header'>
            {propItem.itemSelected.completed==='new'? 'INCOMPLETE' : propItem.itemSelected.completed==='progress'? 'IN PROGRESS' : 'COMPLETE'}
          </header>
          <section className='list-details-list-elements'>
            <div onClick={(e)=>{this.toggleEdit()}} className='list-details-list-toggle-edit'/>
            <div className='list-details-content-container'>
              <div className='list-details-list-container'>
                <div className='list-details-list-title'>{propItem.itemSelected.title}</div>
                <div className='list-details-line'/>
                <div className='list-details-list-description'>{propItem.itemSelected.description}</div>
              </div>
              {edit}
            </div>
          </section>
          <footer className='list-details-list-footer'/>
        </div>
      )
    }
    return(
      <main className='list-details-container'>
        {currentItem}
      </main>
    )
  }
}
function mapStateToProps(state) {
  return {
    itemSelected: state.itemSelected
  }
}
export default connect(mapStateToProps)(ListDetails)