import React from "react";
import { connect } from "react-redux";
import { ConnectedTaskList } from "./TaskList";
export const Dashboard = ({ groups, tasks }) => (
  <div>
    <h2>Dashboard</h2>
    {groups.map((group) => (
      <ConnectedTaskList key={group.id} id={group.id} name={group.name} tasks={tasks} />
    ))}
  </div>
);
function mapStateToProps(state) {
  return {
    groups: state.groups,
    tasks: state.tasks
  };
}
export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
