import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as mutations from '../store/mutations';
const TaskDetail = ({ id,
    comments,
    task,
    groups,
    isComplete,
    setTaskCompletion,
    setTaskGroup,
    setTaskName,
   }) => (<div>
    <label>Name Task</label>
    <input type="text" onChange={setTaskName} value={task.name} />
    <div>
        <button onClick={()=>setTaskCompletion(id,!isComplete)}> {isComplete ? `Reopen Task` :`Complete`}</button>
    </div>
    <div>
        <select onChange={setTaskGroup} value={task.group}>
            {groups.map(group => (
                <option value={group.id} key={group.id}>{ group.name}</option>
            ) )}
        </select>
    </div>

    <div>
        <Link to="/dashboard">
            <button>Done!</button>
        </Link>
    </div>
</div>);

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id;
    let task = state.tasks.find(task => task.id === id);
    let groups = state.groups;
    let isComplete = task.isComplete;
    return {
        id,
        task,
        groups,
        isComplete: isComplete
    }
    
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const id = ownProps.match.params.id;
    return {
        setTaskCompletion(id, isComplete) {
            dispatch(mutations.SetTaskCompletion(id, isComplete));
        }, 
        setTaskGroup(e) {
            dispatch(mutations.SetTaskGroup(id, e.target.value));
        },
        setTaskName(e) {
            dispatch(mutations.SetTaskName(id, e.target.value));
        }
    }
}

export const ConnectTaskDetail = connect(mapStateToProps,mapDispatchToProps)(TaskDetail);