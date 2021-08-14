import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from './../actions/index'

class TaskForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            name: '',
            status: false
        }
    }

    componentDidMount() {
        console.log('componentDidMount')
        if (this.props.itemEditing && this.props.itemEditing.id !== null) {
            this.setState({
                id: this.props.itemEditing.id,
                name: this.props.itemEditing.name,
                status: this.props.itemEditing.status,
            })
        } else {
            this.onClearForm()
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.itemEditing) {
            this.setState({
                id: nextProps.itemEditing.id,
                name: nextProps.itemEditing.name,
                status: nextProps.itemEditing.status
            })
        } else if (nextProps && nextProps.task === null) {
            this.setState({
                id: '',
                name: '',
                status: false
            })
        }
    }

    onCloseForm = () => {
        this.props.onCloseForm()
    }

    onChangeForm = (event) => {
        var target = event.target
        var name = target.name
        var value = target.value
        if (name === 'status') {
            value = target.value === 'true' ? true : false
        }
        this.setState({
            [name] : value
        })
    }

    onSubmitForm = (event) => {
        event.preventDefault();
        this.props.onSaveTask( this.state )
        this.onClearForm()
        this.onCloseForm()
    }

    onClearForm = () => {
        this.setState({
            name: '',
            status: false
        })
    }

    render() {
        const { id } = this.state
        if (!this.props.isDisplayForm) return '' // isDisplayForm == false

        return (
            <div className="card border-warning">
                <div className="card-header bg-warning">
                    <h3 className="card-title text-left">
                        { id !== '' ? 'Cập nhật công việc' : 'Thêm Công Việc'} 
                        <span onClick={this.onCloseForm}>
                            <i className="fa fa-times-circle text-right mt-2"></i>
                        </span>
                    </h3>
                </div>
                <div className="card-body">
                    <form onSubmit={this.onSubmitForm}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="name"
                                value={this.state.name}
                                onChange={this.onChangeForm}/>
                        </div>
                        <label>Status:</label>
                        <select 
                            className="form-control"
                            name="status"
                            value={this.state.status}
                            onChange={this.onChangeForm}>

                            <option value={true}>Active</option>
                            <option value={false}>Hide</option>
                        </select>
                        <br/>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">Save</button>&nbsp;
                            <button type="button" className="btn btn-danger" onClick={this.onClearForm}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isDisplayForm : state.isDisplayForm,
        itemEditing: state.itemEditing
    }
}
  
const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveTask : (task) => {
            dispatch(actions.saveTask(task))
        },
        onCloseForm : () => {
            dispatch(actions.closeForm())
        }
    } 
}

export default connect(mapStateToProps, mapDispatchToProps) (TaskForm)

// mapStateToProps : chuyển state từ store thành props của component
// mapDispatchToProps : chuyển các action thành props.