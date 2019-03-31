export default class Controller {
  constructor(view) {
    
    if(!view) throw new Error('"view" parameter cannot be null.');

    this.view = view;
  }
}