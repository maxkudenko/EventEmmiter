class EventEmitter {

  constructor() {
    this._events = {};
  }

  subscribe(name, callback) {
    if( !(name in this._events) ){
      this._events[name] = [];
    }
    this._events[name].push(callback);
  }

  unsubscribe(name, callback) {
    if(name in this._events) {
      this._events[name] = this._events[name].filter( (event) => event !== callback );
      if(this._events[name].length === 0) {
        delete this._events[name];
      }
    }
  }

  emit(name, data) {
    if(name in this._events) {
      this._events[name].forEach( (event) => event(data) );
    }
  }

}

class User {

  constructor(name) {
    this.name = name;
    this.showNews = this.showNews.bind(this);
  }

  showNews(data) {
    console.log(`${data} for ${this.name}`);
  }
}


class News {

  constructor(name, obj) {
    this.name = name;
    this.obj = obj;
  }

  generateNews(theme) {
    let news = `${this.name} ${Math.random() * 100000000}`;
    this.obj.emit(theme, news);
  }

}


const emitter = new EventEmitter();

const user1 = new User('Tom');
const user2 = new User('Sam');
const user3 = new User('Bob');

const magazine = new News('About all', emitter);

emitter.subscribe('sport', user1.showNews);
emitter.subscribe('sport', user2.showNews);
emitter.subscribe('it', user3.showNews);

magazine.generateNews('sport');
magazine.generateNews('sport');
magazine.generateNews('it');


emitter.unsubscribe('sport', user2.showNews);
emitter.unsubscribe('it', user3.showNews);