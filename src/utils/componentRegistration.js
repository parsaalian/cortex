class ComponentRegistration {
  componentSet = {};
  viewSet = {};

  register(components) {
    components.map(component => {
      this.componentSet[String(component[0]).split(' ')[1]] = component[0];
      this.viewSet[String(component[0]).split(' ')[1]] = component[1];
      return true;
    });
  }

  getComponent(componentName) {
    console.log(this.componentSet);
    return this.componentSet[componentName];
  }

  getView(componentInstance) {
    return this.viewSet[componentInstance.constructor.name];
  }

  getType(componentInstance) {
    return componentInstance.constructor.name;
  }
}

export default new ComponentRegistration();
