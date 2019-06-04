import {Node, Container, Content} from "./structure";
import {Connectable, Connector} from "./connection";
import {CRUD, NodeReplace} from "./crud";

Node = Connectable(Node);
Node = CRUD(Node);

Container = Connector(Container);
Container = NodeReplace(Container);
