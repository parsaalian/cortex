import _ from "lodash";

class ComponentRegistration {
  constructor() {
    this.viewSet = {};
  }

  register(components) {
    _.merge(this.viewSet, components);
  }

  getView(componentType) {
    return this.viewSet[componentType];
  }
}

export default new ComponentRegistration();
