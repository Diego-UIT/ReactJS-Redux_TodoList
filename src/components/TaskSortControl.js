import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions/index'

class TaskSortControl extends Component {

    onClick = (sortBy, sortValue) => {
        this.props.onSort({
            by: sortBy,
            value: sortValue
        })
    }

  render() {
    var { sort } = this.props

    return (
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Sort
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <li onClick={() => this.onClick('name', 1)} 
                        className="dropdown-item">
                        <a className={(sort.by === 'name' && sort.value === 1) ? 'sort_selected' : ''}>
                            <i className="fa fa-sort-alpha-up"></i>Name A-Z
                        </a>
                    </li>
                    <li onClick={() => this.onClick('name', -1)} 
                        className="dropdown-item">
                        <a className={(sort.by === 'name' && sort.value === -1) ? 'sort_selected' : ''}>
                            <i className="fa fa-sort-alpha-up-alt"></i>Name Z-A
                        </a>
                    </li>
                    <div className="dropdown-divider"></div>
                    <li onClick={() => this.onClick('status', 1)} 
                        className="dropdown-item">
                        <a className={(sort.by === 'status' && sort.value === 1) ? 'sort_selected' : ''}>
                            Status Active
                        </a>
                    </li>
                    <li onClick={() => this.onClick('status', -1)}
                        className="dropdown-item">
                        <a className={(sort.by === 'status' && sort.value === -1) ? 'sort_selected' : ''}>
                            Status Hide
                        </a>
                    </li>
                </div>
            </div>
        </div>
      )
    }
  }

var mapStateToProps = state => {
    return {
        sort: state.sort
    }
} 
  
var mapDispatchToProps = (dispatch, props) => {
    return {
      onSort: (sort) => {
        dispatch(actions.sortTask(sort))
      }
    } 
}
  
export default connect(mapStateToProps, mapDispatchToProps)(TaskSortControl)
  
