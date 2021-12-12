import { createComponent } from "@viYou/render/vdom";
import { renderDOM } from "@viYou/render";
import App from "@client/present/App";

renderDOM('root', createComponent(App, {key: 'root'}))