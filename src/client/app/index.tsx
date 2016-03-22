import * as React from "react";
import * as ReactDOM from "react-dom";
import RootContainer from 'client/containers/root.container';
import {registerActionCreators} from 'client/actions/register';
import {configureRoutes} from 'client/config/routes.config';
import {configureStore} from 'client/config/store.config';
import {configureKernel} from 'client/config/kernel.config';
import {configureMaterialUi} from 'client/config/material.config';

configureMaterialUi();

const {store, history} = configureStore();
const routes = configureRoutes(history);
export const kernel = configureKernel(store);

registerActionCreators();

ReactDOM.render(
  <RootContainer store={store} routes={routes} />,
  document.getElementById("root")
)
