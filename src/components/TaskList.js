import React, {Component} from 'react';
import {connect} from 'react-redux'
import * as actions from '../actions/index'
import TaskItem from './TaskItem'

class TaskList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            filterName: '', 
            filterStatus: -1 // all: -1, active: 1, hide: 0
        }
    }

    onChangeList = (event) => {
        var target = event.target
        var name = target.name
        var value= target.value
        var filter = {
            name: name === 'filterName' ? value : this.state.filterName,
            status: name === 'filterStatus' ? +value : +this.state.filterStatus // convert string to number
        }
        this.props.onFilterTable(filter)
        this.setState({
            [name]: value
        })
    }

    render() {
        var { tasks, filterTable, keyword, sort } = this.props 

        // Filter Table
        if (filterTable) {
            if (filterTable.name) {
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(filterTable.name.toLowerCase()) !== -1
                })
            }
            tasks = tasks.filter((task) => {
                if (filterTable.status === -1) {
                    return task
                } else {
                    return task.status === (filterTable.status === 1 ? true : false)
                }
            })
        }

        // Search
        tasks = tasks.filter((task) => {
            return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        })
        
        // Sort
        if (sort.by === 'name') {
            tasks.sort((a, b) => {
                if (a.name > b.name) return sort.value // increase
                else if (a.name < b.name) return -sort.value // decrease
                else return 0
            })
        } else {
            tasks.sort((a, b) => {
                if (a.status > b.status) return -sort.value // increase
                else if (a.status < b.status) return sort.value // decrease
                else return 0
            })
        }

        var elementTasks = tasks.map((task, index) => {
            return <TaskItem 
                        key = {task.id}
                        index = {index}
                        task = {task} />
        })

        return (
            <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Name</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="filterName"
                                        value={ this.state.filterName }
                                        onChange={ this.onChangeList }/>
                                </td>
                                <td>
                                    <select 
                                        className="form-control"
                                        name="filterStatus"
                                        value={ this.state.filterStatus }
                                        onChange={ this.onChangeList }>

                                        <option value="-1">All</option>
                                        <option value="0">Hide</option>
                                        <option value="1">Active</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>
                            { elementTasks }
                        </tbody>
                    </table>
                </div>
            </div>
        )
        }
    }

var mapStateToProps = (state) => {
    return {
        tasks : state.tasks,
        filterTable: state.filterTable,
        keyword: state.search,
        sort: state.sort,
    }
} 

var mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterTable: (filter) => {
            dispatch(actions.filterTask(filter))
        }
    } 
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)

// mapStateToProps : chuyển state từ store thành props của component
// mapDispatchToProps : chuyển các action thành props.