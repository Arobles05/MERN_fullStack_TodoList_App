import { createStore, applyMiddleware, combineReducers } from "redux";
import { defaultState } from "../../server/defaultState";
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
import * as sagas from './sagas.mock';
import * as mutations from './mutations'

export const store = createStore(combineReducers({
    tasks(tasks = defaultState.tasks, action) {
        switch (action.type) {
            case mutations.CREATE_TASK:
                console.log(action)
                return [...tasks, {
                    id: action.taskID,
                    name: "New Task",
                    group: action.groupID,
                    owner: action.ownerID,
                    isComplete: false
                }]
            case mutations.SET_TASK_COMPLETE:
                return tasks.map(task => {
                    return (task.id === action.taskID) ? {
                        // ...tasks,
                        id: action.id,
                        name: task.name,
                        group: task.group,
                        owner: task.owner,
                        isComplete: action.isComplete
                    } : task;
                })
            case mutations.SET_TASK_GROUP:
                return tasks.map(task => {
                    return (task.id === action.taskID) ? {
                        // ...tasks,
                        id: task.id,
                        name: task.name,
                        group: action.groupID,
                        owner: task.owner,
                        isComplete: task.isComplete
                    } : task;
                })
            case mutations.SET_TASK_NAME:
                return tasks.map(task => {
                    return (task.id === action.taskID) ? {
                        // ...tasks,
                        id: task.taskID,
                        name: action.name,
                        group: task.group,
                        owner: task.owner,
                        isComplete: task.isComplete
                    } : task;
                })
        }
        return tasks;
    },
    comments(comments = defaultState.comments, action) {
        console.log("disparando comentarios")
        return comments;
    },
    groups(groups = defaultState.groups) {
        return groups;
    },
    users(users = defaultState.users) {
        return users
    }
}), applyMiddleware(createLogger(), sagaMiddleware));

for (let saga in sagas) {
    sagaMiddleware.run(sagas[saga]);
}