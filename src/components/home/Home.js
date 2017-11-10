import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Home.css';
import {Link} from 'react-router-dom';
import {Switch, Route} from 'react-router';
import ListDetails from '../list/ListDetails';
class Home extends Component {
  componentWillReceiveProps(props) {
    console.log(props, 'props')
  }
  removeItem(item, title, description, list) {
    this.props.dispatch({
      type:'REMOVE_ITEM',
      title,
      description,
      list
    })
  }
  itemInProgress(item, title, description) {
    this.props.dispatch({
      type:'ITEM_IN_PROGRESS',
      title,
      description
    })
  }
  itemCompleted(item, title, description) {
    this.props.dispatch({
      type:'ITEM_COMPLETED',
      title,
      description
    })
  }
  selectItem(item, title, description, status) {
    this.props.dispatch({
      type:'SELECT_ITEM',
      title,
      description,
      status
    })
  }
  render() {
    let props = this.props,
        newList = (
          <section className='home-new-empty'>
            <div className='home-new-placeholder'>
              You don't have anything to do!
            </div>
          </section>
        ),
        inProgressList = (
          <section className='home-in-progress-empty'>
            <div className='home-in-progress-placeholder'>
              You don't have anything in progress!
            </div>
          </section>
        ),
        completedList = (
          <section className='home-completed-empty'>
            <div className='home-completed-placeholder'>
              You don't have anything completed!
            </div>
          </section>
        );
    if (props.newList.length > 0) {
      newList = props.newList.map((el, i)=>{
        console.log(el)
        return (
          <section className='home-new-list-elements' key={i}>
            <Link to='/' onClick={(e)=>{this.removeItem(e.target, el.title, el.description, 'new')}} className='home-new-erase'/>
            <div onClick={(e)=>{this.itemInProgress(e.target, el.title, el.description)}} className='home-new-move'/>
            <Link to={`/${i+1}`} onClick={(e)=>{this.selectItem(e.target, el.title, el.description, 'new')}} className='home-new-list-container'>
              <div className='home-new-list-title'>{el.title}</div>
              <div className='home-new-line'/>
              <div className='home-new-list-description'>{el.description}</div>
            </Link>
          </section>
        )
      })
    }
    if (props.inProgressList.length > 0) {
      inProgressList = props.inProgressList.map((el, i)=>{
        console.log(el)
        return (
          <section className='home-in-progress-list-elements' key={i}>
            <Link to='/' onClick={(e)=>{this.removeItem(e.target, el.title, el.description, 'progress')}} className='home-in-progress-delete'/>
            <div onClick={(e)=>{this.itemCompleted(e.target, el.title, el.description)}} className='home-in-progress-move'/>
            <Link to={`/${i+1}`} onClick={(e)=>{this.selectItem(e.target, el.title, el.description, 'progress')}} className='home-in-progress-list-container'>
              <div className='home-in-progress-list-title'>{el.title}</div>
              <div className='home-in-progress-line'/>
              <div className='home-in-progress-list-description'>{el.description}</div>
            </Link>
          </section>
        )
      })
    }
    if (props.completedList.length > 0) {
      completedList = props.completedList.map((el, i)=>{
        console.log(el)
        return (
          <section className='home-completed-list-elements' key={i}>
            <Link to='/' onClick={(e)=>{this.removeItem(e.target, el.title, el.description, 'completed')}} className='home-completed-delete'/>
            <Link to={`/${i+1}`} onClick={(e)=>{this.selectItem(e.target, el.title, el.description, 'complete')}} className='home-completed-list-container'>
              <div className='home-completed-list-title'>{el.title}</div>
              <div className='home-completed-line'/>
              <div className='home-completed-list-description'>{el.description}</div>
            </Link>
          </section>
        )
      })
    }

    return (
      <main className='home-container'>
        <section className='home-list-section'>
          <div className='home-new'>
            <header className='home-new-header'>
              New Task
            </header>
            <div className='home-new-list'>
              {newList}
            </div>
            <footer className='home-new-footer'/>
          </div>
          <div className='home-in-progress'>
            <header className='home-in-progress-header'>
              In Progress
            </header>
            <div className='home-in-progress-list'>
              {inProgressList}
            </div>
            <footer className='home-in-progress-footer'/>
          </div>
          <div className='home-completed'>
            <header className='home-completed-header'>
              Completed
            </header>
            <div className='home-completed-list'>
              {completedList}
            </div>
            <footer className='home-completed-footer'/>
          </div>
        </section>
        <section className='home-detailed-view'>
          <Switch>
            <Route path='/' component={ListDetails}/>
          </Switch>
        </section>
      </main>
    )
  }
}

export default connect(function mapStateToProps(state) {
  return {
    newList: state.newList,
    inProgressList: state.inProgressList,
    completedList: state.completedList
  }
})(Home)