import React, {Component} from 'react';
import {connect} from 'react-redux'
import * as actions from '../actions/index'

class TaskItem extends Component {

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id)
    }

    onDelete = () => {
        this.props.onDelete(this.props.task.id)
        this.props.onCloseForm()
    }

    onEditTask = () => {
        this.props.onEditTask(this.props.task)
        this.props.onOpenForm()
    }

    render() {
        const { task, index } = this.props

        return (
            <tr>
                <td className="text-center">{ index + 1 }</td>
                <td>{ task.name }</td>
                <td className="status text-center">
                    <span 
                        className={task.status === true ? 'text-success' : 'text-danger'}
                        onClick={this.onUpdateStatus}>
                            {task.status === true ? 'Active' : 'Hide'}
                    </span>
                </td>
                <td className="text-center">
                    <button 
                        type="button" 
                        className="btn btn-warning"
                        onClick={ this.onEditTask }>
                        <span className="fas fa-pencil-alt"></span>
                    </button>&nbsp;
                    <button 
                        type="button" 
                        className="btn btn-danger"
                        onClick={ this.onDelete }>
                        <span className="fa fa-trash"></span>
                    </button>
                </td>
            </tr>
        )
        }
    }

    const mapStateToProps = state => {
        return {}
      }
        
    const mapDispatchToProps = (dispatch, props) => {
        return {
            onUpdateStatus: (id) => {
                dispatch(actions.updateStatus(id))
            },
            onDelete : (id) => {
                dispatch(actions.deleteTask(id))
            },
            onCloseForm : () => {
                dispatch(actions.closeForm())
            },
            onOpenForm : () => {
                dispatch(actions.openForm())
            },
            onEditTask : (task) => {
                dispatch(actions.editTask(task))
            },
        } 
    }
    
export default connect(mapStateToProps, mapDispatchToProps) (TaskItem);

