import React from "react";
import {  connect } from "react-redux";

const LoginComponent = () => {
    return <div>Ingrese primiero</div>
};

const mapStateToProps = state => state;

export const ConnectedLogIn = connect(mapStateToProps)(LoginComponent);