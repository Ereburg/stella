class Collapse {
  constructor(node) {
    this.node = node;
    this.btn = this.node.querySelector('.js-btn');
    this.content = this.node.querySelector('.js-content');
    this.projectItems = document.querySelectorAll('.projects__content');

    this.events();
  }

  events() {
    this.btn.addEventListener('click', this.handler.bind(this));
  }

  handler(e) {
    if (this.node.classList.contains('projects') && this.node.classList.contains('active') && window.innerWidth > 1149) {
      this.projectItems.forEach(item => item.classList.contains('active') ? item.classList.remove('active') : null);
    } 
    if (this.node.classList.contains('projects__item') && window.innerWidth > 1149) {
      let target = e.target;
      
      this.projectItems.forEach((item) => {
        if (!(item === target.nextElementSibling)) item.classList.contains('active') ? item.classList.remove('active') : null
      });
     
      target.nextElementSibling.classList.toggle('active');

      return;
    }
    this.node.classList.contains('active') ? this.hide() : this.show();
  }

  show() {
    Promise.resolve()
    .then(()=> {
      this.node.classList.add('active');
      Collapse.expand(this.content);
    })
    .then(() => {
      if (window.innerWidth > 1149) return;
      scrollBy({
        top: this.node.getBoundingClientRect().top,
        behavior: 'smooth'
      })
    })
  }

  hide() {
    Collapse.collapse(this.content);
    this.node.classList.remove('active');
  }

  static collapse(elem) {
    const height = {
      from: elem.scrollHeight,
      to: 0,
    };

    Collapse.animate(elem, height);
  }

  static expand(elem) {
    const height = {
      from: 0,
      to: elem.scrollHeight,
    };
    
    Collapse.animate(elem, height);
  }

  static animate(elem, height) {
    const handler = ({target, currentTarget}) => {
      if (target !== currentTarget) return false;
      
      elem.removeEventListener('transitionend', handler);
      elem.classList.remove('animate');
      elem.style.height = '';
    };

    elem.addEventListener('transitionend', handler);
    elem.classList.add('animate');
    elem.style.height = `${height.from}px`;

    requestAnimationFrame(() => {
      elem.style.height = `${height.to}px`;
    });
  }

  static setActive(elem) {
    elem.classList.add('active');
  }

  static removeActive(elem) {
    elem.classList.remove('active');
  }

  static init(element) {
    new  Collapse(element);
  }
}

class CollapseUI {
  static init() {
    document.querySelectorAll('.js-collapse').forEach(item => Collapse.init(item));
  }
}

document.addEventListener('DOMContentLoaded', () => { CollapseUI.init(); });