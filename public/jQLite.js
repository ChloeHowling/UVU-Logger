class jQueryLite {
  constructor(sel) {
    if (typeof sel === 'string' || sel instanceof String) {
      if (sel.startsWith('<') && sel.endsWith('>')) {
        this.elements = [
          document.createElement(sel.substring(1, sel.length - 1)),
        ];
        console.log(sel.substring(1, sel.length - 1));
      } else {
        this.elements = [...document.querySelectorAll(sel)];
      }
    } else if (sel instanceof Array) {
      this.elements = sel;
    } else {
      this.elements = [sel];
    }
  }
  get(index) {
    return this.elements[index];
  }
  set html(htmlString) {
    this.elements.forEach((el) => (el.innerHTML = htmlString));
  }
  get html() {
    if (this.elements.length == 1) return this.elements[0].innerHTML;
    return this.elements.map((el) => el.innerHTML);
  }
  set text(textString) {
    this.elements.forEach((el) => (el.innerText = textString));
  }
  get text() {
    if (this.elements.length == 1) return this.elements[0].innerText;
    return this.elements.map((el) => el.innerText);
  }
  set val(value) {
    this.elements.forEach((el) => (el.value = value));
  }
  get val() {
    if (this.elements.length == 1) return this.elements[0].value;
    return this.elements.map((el) => el.value);
  }
  prop(name, state = null) {
    if (state === null) {
      if (this.elements.length == 1) return this.elements[0][name];
      return this.elements.map((el) => el[name]);
    }
    this.elements.forEach((el) => (el[name] = state));
  }
  css(name, val = null) {
    if (val) {
      this.elements.forEach((el) => (el.style[name] = val));
    } else {
      if (this.elements.length == 1) return this.elements[0].style[name];
      return this.elements.map((el) => el.style[name]);
    }
  }
  toggle(displayStyle = 'block') {
    this.elements.forEach((el) => {
      if (el.style.display === 'none') {
        el.style.display = displayStyle;
      } else {
        el.style.display = 'none';
      }
    });
  }
  show() {
    this.elements.forEach((el) => (el.style.display = 'block'));
  }
  hide() {
    this.elements.forEach((el) => (el.style.display = 'none'));
  }
  on(event, callback) {
    this.elements.forEach((el) => el.addEventListener(event, callback));
  }
  removeClass(className) {
    this.elements.forEach((el) => el.classList.remove(className));
  }
  addClass(className) {
    this.elements.forEach((el) => el.classList.add(className));
  }
  hasClass(className) {
    for (const i in this.elements) {
      if (this.elements[i].classList.contains(className)) return true;
    }
    return false;
  }
  valid() {
    return this.elements
      .map((el) => el.checkValidity())
      .every((el) => el === true);
  }
  append(element) {
    this.elements.forEach((el) => el.appendChild(element));
  }
}
let $ = (sel) => new jQueryLite(sel);
export default $;
