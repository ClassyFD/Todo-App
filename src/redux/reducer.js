const ADD_NEW_ITEM = 'ADD_NEW_ITEM',
      REMOVE_ITEM = 'REMOVE_ITEM',
      ITEM_IN_PROGRESS = 'ITEM_IN_PROGRESS',
      ITEM_COMPLETED = 'ITEM_COMPLETED',
      SELECT_ITEM = 'SELECT_ITEM',
      CLEAR_ITEM_SELECTED = 'CLEAR_ITEM_SELECTED',
      SAVE_CHANGES = 'SAVE_CHANGES';

let initialState = {
  newList: [],
  inProgressList: [],
  completedList: [],
  itemSelected:{
    title:null,
    description:null,
    completed:null,
  }
}

export default function reducer(state = initialState, action){
  console.log(action.type);
  switch(action.type){
    case SAVE_CHANGES:
      return Object.assign({}, state, action.comp==='new'? {newList: state.newList.map((e)=>{
        
        return Object.assign({}, e, {
          title:action.title && action.oldTitle === e.title? action.title : e.title, 
          description:action.description && action.oldDescription === e.description? action.description:e.description,
        });
      }), itemSelected:{
        title: action.title? action.title : state.itemSelected.title,
        description: action.description? action.description : state.itemSelected.description,
        completed: state.itemSelected.completed, 
      }} : action.comp==='progress'? {inProgressList: state.inProgressList.map((e)=>{
        return Object.assign({}, e, {
          title:action.title && action.oldTitle === e.title? action.title:e.title, 
          description:action.description && action.oldDescription === e.description? action.description:e.description,
        });
      }), itemSelected:{
        title: action.title? action.title : state.itemSelected.title,
        description: action.description? action.description : state.itemSelected.description,
        completed: state.itemSelected.completed, 
      }}: {completedList: state.completedList.map((e)=>{
        return Object.assign({}, e, {
          title:action.title && action.oldTitle === e.title? action.title:e.title, 
          description:action.description && action.oldDescription === e.description? action.description:e.description,
        });
      }), itemSelected:{
        title: action.title? action.title : state.itemSelected.title,
        description: action.description? action.description : state.itemSelected.description,
        completed: state.itemSelected.completed, 
      }})
    case CLEAR_ITEM_SELECTED:
      return Object.assign({}, state, {
        itemSelected: {
          title: null,
          description: null,
          completed: null,
        }
      })
    case ADD_NEW_ITEM:
      return Object.assign({}, state, {
        newList: [...state.newList,{
          title:action.title, description:action.description
        }]
      });
    case REMOVE_ITEM:
      return action.list==='new'?
        Object.assign({}, state, {newList: state.newList.filter((e)=>{
          return e.title!==action.title && e.description!==action.description
        }), itemSelected:{
          title: action.title===state.itemSelected.title? null : state.itemSelected.title,
          description: action.description===state.itemSelected.description? null : state.itemSelected.description,
          completed: action.description===state.itemSelected.description? null : state.itemSelected.completed,
        }}) : action.list==='progress'?
        Object.assign({}, state, {inProgressList: state.inProgressList.filter((e)=>{
          return e.title!==action.title && e.description!==action.description
        }), itemSelected:{
          title: action.title===state.itemSelected.title? null : state.itemSelected.title,
          description: action.description===state.itemSelected.description? null : state.itemSelected.description,
          completed: action.description===state.itemSelected.description? null : state.itemSelected.completed,
        }}) :
        Object.assign({}, state, {completedList: state.completedList.filter((e)=>{
          return e.title!==action.title && e.description!==action.description
        }), itemSelected:{
          title: action.title===state.itemSelected.title? null : state.itemSelected.title,
          description: action.description===state.itemSelected.description? null : state.itemSelected.description,
          completed: action.description===state.itemSelected.description? null : state.itemSelected.completed,
        }}) 
    case ITEM_IN_PROGRESS:
      return Object.assign({}, state, {
        newList: state.newList.filter((e)=>{
          return (e.title!==action.title && e.description!==action.description)
        }), 
        inProgressList:[...state.inProgressList, {
          title:action.title, description:action.description
        }],
        itemSelected: action.title === state.itemSelected.title && action.description === state.itemSelected.description?
        {
          title:action.title,
          description: action.description,
          completed: 'progress'
        } :
        {
          title:state.itemSelected.title,
          description: state.itemSelected.description,
          completed:state.itemSelected.completed
        }
      })
    case ITEM_COMPLETED:
      return Object.assign({}, state, {
        inProgressList: state.inProgressList.filter((e)=>{
          return e.title!==action.title && e.description!==action.description
        }),
        completedList: [...state.completedList, {
          title:action.title, description:action.description
        }],
        itemSelected: action.title === state.itemSelected.title && action.description === state.itemSelected.description?
        {
          title:action.title,
          description: action.description,
          completed: 'complete'
        } :
        {
          title:state.itemSelected.title,
          description: state.itemSelected.description,
          completed:state.itemSelected.completed
        }
      })
    case SELECT_ITEM:
      return Object.assign({}, state, {itemSelected: {
        title: action.title,
        description: action.description,
        completed: action.status
      }})
    default:
      return Object.assign({}, state)
  }
}