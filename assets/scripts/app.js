class ProjectList {
  items = [];
  constructor(type) {
    this.type = type;
    const listItems = document.querySelectorAll(`#${type}-projects li`);
    for (const item of listItems) {
      this.items.push(new ProjectItem(item.id, this.type));
    }
  }
  
  remove(id, ) {
    this.items = this.items.filter((p) => p.id !== id);
  }
  add(id) {
    const el = document.getElementById(id);
    const newParent = document.getElementById(`${this.type}-projects`);
    newParent.append(el);
    this.items.push(new ProjectItem(id, this.type));
  }
}

class ProjectItem {
  constructor(id, type) {
    this.id = id;
    this.type = type;
    this.clearEventListeners();
    this.connectSwitchButton();
  }

  switchProjects() {
    const [activeProjectsList, finishedProjectsList] = [...App.projectLists];
    const [active, finished] = [...App.types];
    const el = document.getElementById(this.id);
    if (this.type === active) {
      activeProjectsList.remove(this.id, this.type);
      // el.removeEventListener('click', this.switchProjects);
      finishedProjectsList.add(this.id, this.type);
      return;
    } else {
      finishedProjectsList.remove(this.id);
      // el.removeEventListener('click', this.switchProjects);
      activeProjectsList.add(this.id);
      return;
    }
  }

  clearEventListeners() {
    const el = document.getElementById(this.id);
    const elClone = el.cloneNode(true);
    el.replaceWith(elClone);
  }

  connectSwitchButton() {
    const element = document.getElementById(this.id);
    const button = element.querySelector('button');
    // element.addEventListener('click', this.switchProjects.bind(this));
    button.addEventListener('click', this.switchProjects.bind(this));
  }
}

class App {
  static types = ['active', 'finished'];
  static projectLists = [];
  static init() {
    const [active, finished] = [...this.types];
    this.projectLists.push(new ProjectList(active));
    this.projectLists.push(new ProjectList(finished));
  }
}

App.init();
