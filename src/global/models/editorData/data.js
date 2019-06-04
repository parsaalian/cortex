let { Node, Container, Content } = require("./structure");
let { Connectable, Connector } = require("./connection");
let { CRUD, NodeReplace } = require("./crud");

Node = Connectable(Node);
Node = CRUD(Node);

Container = Connector(Container);
Container = NodeReplace(Container);
