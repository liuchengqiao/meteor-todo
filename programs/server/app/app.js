var require = meteorInstall({"imports":{"api":{"lists":{"server":{"publications.js":["meteor/meteor","../lists.js",function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/api/lists/server/publications.js                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var Meteor;module.import('meteor/meteor',{"Meteor":function(v){Meteor=v}});var Lists;module.import('../lists.js',{"Lists":function(v){Lists=v}});/* eslint-disable prefer-arrow-callback */
                                                                                                                      //
                                                                                                                      // 3
                                                                                                                      //
                                                                                                                      // 5
                                                                                                                      //
Meteor.publish('lists.public', function listsPublic() {                                                               // 7
  return Lists.find({                                                                                                 // 8
    userId: { $exists: false }                                                                                        // 9
  }, {                                                                                                                // 8
    fields: Lists.publicFields                                                                                        // 11
  });                                                                                                                 // 10
});                                                                                                                   // 13
                                                                                                                      //
Meteor.publish('lists.private', function listsPrivate() {                                                             // 15
  if (!this.userId) {                                                                                                 // 16
    return this.ready();                                                                                              // 17
  }                                                                                                                   // 18
                                                                                                                      //
  return Lists.find({                                                                                                 // 20
    userId: this.userId                                                                                               // 21
  }, {                                                                                                                // 20
    fields: Lists.publicFields                                                                                        // 23
  });                                                                                                                 // 22
});                                                                                                                   // 25
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"lists.js":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits","meteor/mongo","meteor/aldeed:simple-schema","meteor/factory","meteor/tap:i18n","../todos/todos.js",function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/api/lists/lists.js                                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({Lists:function(){return Lists}});var _classCallCheck;module.import('babel-runtime/helpers/classCallCheck',{"default":function(v){_classCallCheck=v}});var _possibleConstructorReturn;module.import('babel-runtime/helpers/possibleConstructorReturn',{"default":function(v){_possibleConstructorReturn=v}});var _inherits;module.import('babel-runtime/helpers/inherits',{"default":function(v){_inherits=v}});var Mongo;module.import('meteor/mongo',{"Mongo":function(v){Mongo=v}});var SimpleSchema;module.import('meteor/aldeed:simple-schema',{"SimpleSchema":function(v){SimpleSchema=v}});var Factory;module.import('meteor/factory',{"Factory":function(v){Factory=v}});var TAPi18n;module.import('meteor/tap:i18n',{"TAPi18n":function(v){TAPi18n=v}});var Todos;module.import('../todos/todos.js',{"Todos":function(v){Todos=v}});
                                                                                                                      //
                                                                                                                      //
                                                                                                                      // 1
                                                                                                                      // 2
                                                                                                                      // 3
                                                                                                                      // 4
                                                                                                                      //
                                                                                                                      // 6
                                                                                                                      //
var ListsCollection = function (_Mongo$Collection) {                                                                  //
  _inherits(ListsCollection, _Mongo$Collection);                                                                      //
                                                                                                                      //
  function ListsCollection() {                                                                                        //
    _classCallCheck(this, ListsCollection);                                                                           //
                                                                                                                      //
    return _possibleConstructorReturn(this, _Mongo$Collection.apply(this, arguments));                                //
  }                                                                                                                   //
                                                                                                                      //
  ListsCollection.prototype.insert = function insert(list, callback) {                                                //
    var language = arguments.length <= 2 || arguments[2] === undefined ? 'en' : arguments[2];                         // 9
                                                                                                                      //
    var ourList = list;                                                                                               // 10
    if (!ourList.name) {                                                                                              // 11
      var defaultName = TAPi18n.__('lists.insert.list', null, language);                                              // 12
      var nextLetter = 'A';                                                                                           // 13
      ourList.name = defaultName + ' ' + nextLetter;                                                                  // 14
                                                                                                                      //
      while (this.findOne({ name: ourList.name })) {                                                                  // 16
        // not going to be too smart here, can go past Z                                                              //
        nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);                                               // 18
        ourList.name = defaultName + ' ' + nextLetter;                                                                // 19
      }                                                                                                               // 20
    }                                                                                                                 // 21
                                                                                                                      //
    return _Mongo$Collection.prototype.insert.call(this, ourList, callback);                                          // 23
  };                                                                                                                  // 24
                                                                                                                      //
  ListsCollection.prototype.remove = function remove(selector, callback) {                                            //
    Todos.remove({ listId: selector });                                                                               // 26
    return _Mongo$Collection.prototype.remove.call(this, selector, callback);                                         // 27
  };                                                                                                                  // 28
                                                                                                                      //
  return ListsCollection;                                                                                             //
}(Mongo.Collection);                                                                                                  //
                                                                                                                      //
var Lists = new ListsCollection('Lists');                                                                             // 31
                                                                                                                      //
// Deny all client-side updates since we will be using methods to manage this collection                              //
Lists.deny({                                                                                                          // 34
  insert: function insert() {                                                                                         // 35
    return true;                                                                                                      // 35
  },                                                                                                                  // 35
  update: function update() {                                                                                         // 36
    return true;                                                                                                      // 36
  },                                                                                                                  // 36
  remove: function remove() {                                                                                         // 37
    return true;                                                                                                      // 37
  }                                                                                                                   // 37
});                                                                                                                   // 34
                                                                                                                      //
Lists.schema = new SimpleSchema({                                                                                     // 40
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },                                                                // 41
  name: { type: String },                                                                                             // 42
  incompleteCount: { type: Number, defaultValue: 0 },                                                                 // 43
  userId: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true }                                              // 44
});                                                                                                                   // 40
                                                                                                                      //
Lists.attachSchema(Lists.schema);                                                                                     // 47
                                                                                                                      //
// This represents the keys from Lists objects that should be published                                               //
// to the client. If we add secret properties to List objects, don't list                                             //
// them here to keep them private to the server.                                                                      //
Lists.publicFields = {                                                                                                // 52
  name: 1,                                                                                                            // 53
  incompleteCount: 1,                                                                                                 // 54
  userId: 1                                                                                                           // 55
};                                                                                                                    // 52
                                                                                                                      //
Factory.define('list', Lists, {});                                                                                    // 58
                                                                                                                      //
Lists.helpers({                                                                                                       // 60
  // A list is considered to be private if it has a userId set                                                        //
                                                                                                                      //
  isPrivate: function isPrivate() {                                                                                   // 62
    return !!this.userId;                                                                                             // 63
  },                                                                                                                  // 64
  isLastPublicList: function isLastPublicList() {                                                                     // 65
    var publicListCount = Lists.find({ userId: { $exists: false } }).count();                                         // 66
    return !this.isPrivate() && publicListCount === 1;                                                                // 67
  },                                                                                                                  // 68
  editableBy: function editableBy(userId) {                                                                           // 69
    if (!this.userId) {                                                                                               // 70
      return true;                                                                                                    // 71
    }                                                                                                                 // 72
                                                                                                                      //
    return this.userId === userId;                                                                                    // 74
  },                                                                                                                  // 75
  todos: function todos() {                                                                                           // 76
    return Todos.find({ listId: this._id }, { sort: { createdAt: -1 } });                                             // 77
  }                                                                                                                   // 78
});                                                                                                                   // 60
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"methods.js":["meteor/meteor","meteor/mdg:validated-method","meteor/aldeed:simple-schema","meteor/ddp-rate-limiter","meteor/underscore","./lists.js",function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/api/lists/methods.js                                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({insert:function(){return insert},makePrivate:function(){return makePrivate},makePublic:function(){return makePublic},updateName:function(){return updateName},remove:function(){return remove}});var Meteor;module.import('meteor/meteor',{"Meteor":function(v){Meteor=v}});var ValidatedMethod;module.import('meteor/mdg:validated-method',{"ValidatedMethod":function(v){ValidatedMethod=v}});var SimpleSchema;module.import('meteor/aldeed:simple-schema',{"SimpleSchema":function(v){SimpleSchema=v}});var DDPRateLimiter;module.import('meteor/ddp-rate-limiter',{"DDPRateLimiter":function(v){DDPRateLimiter=v}});var _;module.import('meteor/underscore',{"_":function(v){_=v}});var Lists;module.import('./lists.js',{"Lists":function(v){Lists=v}});
                                                                                                                      // 2
                                                                                                                      // 3
                                                                                                                      // 4
                                                                                                                      // 5
                                                                                                                      //
                                                                                                                      // 7
                                                                                                                      //
var LIST_ID_ONLY = new SimpleSchema({                                                                                 // 9
  listId: Lists.simpleSchema().schema('_id')                                                                          // 10
}).validator({ clean: true, filter: false });                                                                         // 9
                                                                                                                      //
var insert = new ValidatedMethod({                                                                                    // 13
  name: 'lists.insert',                                                                                               // 14
  validate: new SimpleSchema({                                                                                        // 15
    language: {                                                                                                       // 16
      type: String                                                                                                    // 17
    }                                                                                                                 // 16
  }).validator(),                                                                                                     // 15
  run: function run(_ref) {                                                                                           // 20
    var language = _ref.language;                                                                                     // 20
                                                                                                                      //
    return Lists.insert({}, null, language);                                                                          // 21
  }                                                                                                                   // 22
});                                                                                                                   // 13
                                                                                                                      //
var makePrivate = new ValidatedMethod({                                                                               // 25
  name: 'lists.makePrivate',                                                                                          // 26
  validate: LIST_ID_ONLY,                                                                                             // 27
  run: function run(_ref2) {                                                                                          // 28
    var listId = _ref2.listId;                                                                                        // 28
                                                                                                                      //
    if (!this.userId) {                                                                                               // 29
      throw new Meteor.Error('lists.makePrivate.notLoggedIn', 'Must be logged in to make private lists.');            // 30
    }                                                                                                                 // 32
                                                                                                                      //
    var list = Lists.findOne(listId);                                                                                 // 34
                                                                                                                      //
    if (list.isLastPublicList()) {                                                                                    // 36
      throw new Meteor.Error('lists.makePrivate.lastPublicList', 'Cannot make the last public list private.');        // 37
    }                                                                                                                 // 39
                                                                                                                      //
    Lists.update(listId, {                                                                                            // 41
      $set: { userId: this.userId }                                                                                   // 42
    });                                                                                                               // 41
  }                                                                                                                   // 44
});                                                                                                                   // 25
                                                                                                                      //
var makePublic = new ValidatedMethod({                                                                                // 47
  name: 'lists.makePublic',                                                                                           // 48
  validate: LIST_ID_ONLY,                                                                                             // 49
  run: function run(_ref3) {                                                                                          // 50
    var listId = _ref3.listId;                                                                                        // 50
                                                                                                                      //
    if (!this.userId) {                                                                                               // 51
      throw new Meteor.Error('lists.makePublic.notLoggedIn', 'Must be logged in.');                                   // 52
    }                                                                                                                 // 54
                                                                                                                      //
    var list = Lists.findOne(listId);                                                                                 // 56
                                                                                                                      //
    if (!list.editableBy(this.userId)) {                                                                              // 58
      throw new Meteor.Error('lists.makePublic.accessDenied', 'You don\'t have permission to edit this list.');       // 59
    }                                                                                                                 // 61
                                                                                                                      //
    // XXX the security check above is not atomic, so in theory a race condition could                                //
    // result in exposing private data                                                                                //
    Lists.update(listId, {                                                                                            // 65
      $unset: { userId: true }                                                                                        // 66
    });                                                                                                               // 65
  }                                                                                                                   // 68
});                                                                                                                   // 47
                                                                                                                      //
var updateName = new ValidatedMethod({                                                                                // 71
  name: 'lists.updateName',                                                                                           // 72
  validate: new SimpleSchema({                                                                                        // 73
    listId: Lists.simpleSchema().schema('_id'),                                                                       // 74
    newName: Lists.simpleSchema().schema('name')                                                                      // 75
  }).validator({ clean: true, filter: false }),                                                                       // 73
  run: function run(_ref4) {                                                                                          // 77
    var listId = _ref4.listId;                                                                                        // 77
    var newName = _ref4.newName;                                                                                      // 77
                                                                                                                      //
    var list = Lists.findOne(listId);                                                                                 // 78
                                                                                                                      //
    if (!list.editableBy(this.userId)) {                                                                              // 80
      throw new Meteor.Error('lists.updateName.accessDenied', 'You don\'t have permission to edit this list.');       // 81
    }                                                                                                                 // 83
                                                                                                                      //
    // XXX the security check above is not atomic, so in theory a race condition could                                //
    // result in exposing private data                                                                                //
                                                                                                                      //
    Lists.update(listId, {                                                                                            // 88
      $set: { name: newName }                                                                                         // 89
    });                                                                                                               // 88
  }                                                                                                                   // 91
});                                                                                                                   // 71
                                                                                                                      //
var remove = new ValidatedMethod({                                                                                    // 94
  name: 'lists.remove',                                                                                               // 95
  validate: LIST_ID_ONLY,                                                                                             // 96
  run: function run(_ref5) {                                                                                          // 97
    var listId = _ref5.listId;                                                                                        // 97
                                                                                                                      //
    var list = Lists.findOne(listId);                                                                                 // 98
                                                                                                                      //
    if (!list.editableBy(this.userId)) {                                                                              // 100
      throw new Meteor.Error('lists.remove.accessDenied', 'You don\'t have permission to remove this list.');         // 101
    }                                                                                                                 // 103
                                                                                                                      //
    // XXX the security check above is not atomic, so in theory a race condition could                                //
    // result in exposing private data                                                                                //
                                                                                                                      //
    if (list.isLastPublicList()) {                                                                                    // 108
      throw new Meteor.Error('lists.remove.lastPublicList', 'Cannot delete the last public list.');                   // 109
    }                                                                                                                 // 111
                                                                                                                      //
    Lists.remove(listId);                                                                                             // 113
  }                                                                                                                   // 114
});                                                                                                                   // 94
                                                                                                                      //
// Get list of all method names on Lists                                                                              //
var LISTS_METHODS = _.pluck([insert, makePublic, makePrivate, updateName, remove], 'name');                           // 118
                                                                                                                      //
if (Meteor.isServer) {                                                                                                // 126
  // Only allow 5 list operations per connection per second                                                           //
  DDPRateLimiter.addRule({                                                                                            // 128
    name: function name(_name) {                                                                                      // 129
      return _.contains(LISTS_METHODS, _name);                                                                        // 130
    },                                                                                                                // 131
                                                                                                                      //
                                                                                                                      //
    // Rate limit per connection ID                                                                                   //
    connectionId: function connectionId() {                                                                           // 134
      return true;                                                                                                    // 134
    }                                                                                                                 // 134
  }, 5, 1000);                                                                                                        // 128
}                                                                                                                     // 136
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"todos":{"server":{"publications.js":["meteor/meteor","meteor/aldeed:simple-schema","../todos.js","../../lists/lists.js",function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/api/todos/server/publications.js                                                                           //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var Meteor;module.import('meteor/meteor',{"Meteor":function(v){Meteor=v}});var SimpleSchema;module.import('meteor/aldeed:simple-schema',{"SimpleSchema":function(v){SimpleSchema=v}});var Todos;module.import('../todos.js',{"Todos":function(v){Todos=v}});var Lists;module.import('../../lists/lists.js',{"Lists":function(v){Lists=v}});/* eslint-disable prefer-arrow-callback */
                                                                                                                      //
                                                                                                                      // 3
                                                                                                                      // 4
                                                                                                                      //
                                                                                                                      // 6
                                                                                                                      // 7
                                                                                                                      //
Meteor.publishComposite('todos.inList', function todosInList(params) {                                                // 9
  new SimpleSchema({                                                                                                  // 10
    listId: { type: String }                                                                                          // 11
  }).validate(params);                                                                                                // 10
                                                                                                                      //
  var listId = params.listId;                                                                                         // 9
                                                                                                                      //
  var userId = this.userId;                                                                                           // 15
                                                                                                                      //
  return {                                                                                                            // 17
    find: function find() {                                                                                           // 18
      var query = {                                                                                                   // 19
        _id: listId,                                                                                                  // 20
        $or: [{ userId: { $exists: false } }, { userId: userId }]                                                     // 21
      };                                                                                                              // 19
                                                                                                                      //
      // We only need the _id field in this query, since it's only                                                    //
      // used to drive the child queries to get the todos                                                             //
      var options = {                                                                                                 // 26
        fields: { _id: 1 }                                                                                            // 27
      };                                                                                                              // 26
                                                                                                                      //
      return Lists.find(query, options);                                                                              // 30
    },                                                                                                                // 31
                                                                                                                      //
                                                                                                                      //
    children: [{                                                                                                      // 33
      find: function find(list) {                                                                                     // 34
        return Todos.find({ listId: list._id }, { fields: Todos.publicFields });                                      // 35
      }                                                                                                               // 36
    }]                                                                                                                // 33
  };                                                                                                                  // 17
});                                                                                                                   // 39
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"incompleteCountDenormalizer.js":["meteor/underscore","meteor/check","./todos.js","../lists/lists.js",function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/api/todos/incompleteCountDenormalizer.js                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _;module.import('meteor/underscore',{"_":function(v){_=v}});var check;module.import('meteor/check',{"check":function(v){check=v}});var Todos;module.import('./todos.js',{"Todos":function(v){Todos=v}});var Lists;module.import('../lists/lists.js',{"Lists":function(v){Lists=v}});
                                                                                                                      // 2
                                                                                                                      //
                                                                                                                      // 4
                                                                                                                      // 5
                                                                                                                      //
var incompleteCountDenormalizer = {                                                                                   // 7
  _updateList: function _updateList(listId) {                                                                         // 8
    // Recalculate the correct incomplete count direct from MongoDB                                                   //
    var incompleteCount = Todos.find({                                                                                // 10
      listId: listId,                                                                                                 // 11
      checked: false                                                                                                  // 12
    }).count();                                                                                                       // 10
                                                                                                                      //
    Lists.update(listId, { $set: { incompleteCount: incompleteCount } });                                             // 15
  },                                                                                                                  // 16
  afterInsertTodo: function afterInsertTodo(todo) {                                                                   // 17
    this._updateList(todo.listId);                                                                                    // 18
  },                                                                                                                  // 19
  afterUpdateTodo: function afterUpdateTodo(selector, modifier) {                                                     // 20
    var _this = this;                                                                                                 // 20
                                                                                                                      //
    // We only support very limited operations on todos                                                               //
    check(modifier, { $set: Object });                                                                                // 22
                                                                                                                      //
    // We can only deal with $set modifiers, but that's all we do in this app                                         //
    if (_.has(modifier.$set, 'checked')) {                                                                            // 25
      Todos.find(selector, { fields: { listId: 1 } }).forEach(function (todo) {                                       // 26
        _this._updateList(todo.listId);                                                                               // 27
      });                                                                                                             // 28
    }                                                                                                                 // 29
  },                                                                                                                  // 30
                                                                                                                      //
  // Here we need to take the list of todos being removed, selected *before* the update                               //
  // because otherwise we can't figure out the relevant list id(s) (if the todo has been deleted)                     //
  afterRemoveTodos: function afterRemoveTodos(todos) {                                                                // 33
    var _this2 = this;                                                                                                // 33
                                                                                                                      //
    todos.forEach(function (todo) {                                                                                   // 34
      return _this2._updateList(todo.listId);                                                                         // 34
    });                                                                                                               // 34
  }                                                                                                                   // 35
};                                                                                                                    // 7
                                                                                                                      //
module.export("default",exports.default=(incompleteCountDenormalizer));                                               // 38
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"methods.js":["meteor/meteor","meteor/underscore","meteor/mdg:validated-method","meteor/aldeed:simple-schema","meteor/ddp-rate-limiter","./todos.js","../lists/lists.js",function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/api/todos/methods.js                                                                                       //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({insert:function(){return insert},setCheckedStatus:function(){return setCheckedStatus},updateText:function(){return updateText},remove:function(){return remove}});var Meteor;module.import('meteor/meteor',{"Meteor":function(v){Meteor=v}});var _;module.import('meteor/underscore',{"_":function(v){_=v}});var ValidatedMethod;module.import('meteor/mdg:validated-method',{"ValidatedMethod":function(v){ValidatedMethod=v}});var SimpleSchema;module.import('meteor/aldeed:simple-schema',{"SimpleSchema":function(v){SimpleSchema=v}});var DDPRateLimiter;module.import('meteor/ddp-rate-limiter',{"DDPRateLimiter":function(v){DDPRateLimiter=v}});var Todos;module.import('./todos.js',{"Todos":function(v){Todos=v}});var Lists;module.import('../lists/lists.js',{"Lists":function(v){Lists=v}});
                                                                                                                      // 2
                                                                                                                      // 3
                                                                                                                      // 4
                                                                                                                      // 5
                                                                                                                      //
                                                                                                                      // 7
                                                                                                                      // 8
                                                                                                                      //
var insert = new ValidatedMethod({                                                                                    // 10
  name: 'todos.insert',                                                                                               // 11
  validate: Todos.simpleSchema().pick(['listId', 'text']).validator({ clean: true, filter: false }),                  // 12
  run: function run(_ref) {                                                                                           // 13
    var listId = _ref.listId;                                                                                         // 13
    var text = _ref.text;                                                                                             // 13
                                                                                                                      //
    var list = Lists.findOne(listId);                                                                                 // 14
                                                                                                                      //
    if (list.isPrivate() && list.userId !== this.userId) {                                                            // 16
      throw new Meteor.Error('todos.insert.accessDenied', 'Cannot add todos to a private list that is not yours');    // 17
    }                                                                                                                 // 19
                                                                                                                      //
    var todo = {                                                                                                      // 21
      listId: listId,                                                                                                 // 22
      text: text,                                                                                                     // 23
      checked: false,                                                                                                 // 24
      createdAt: new Date()                                                                                           // 25
    };                                                                                                                // 21
                                                                                                                      //
    Todos.insert(todo);                                                                                               // 28
  }                                                                                                                   // 29
});                                                                                                                   // 10
                                                                                                                      //
var setCheckedStatus = new ValidatedMethod({                                                                          // 32
  name: 'todos.makeChecked',                                                                                          // 33
  validate: new SimpleSchema({                                                                                        // 34
    todoId: Todos.simpleSchema().schema('_id'),                                                                       // 35
    newCheckedStatus: Todos.simpleSchema().schema('checked')                                                          // 36
  }).validator({ clean: true, filter: false }),                                                                       // 34
  run: function run(_ref2) {                                                                                          // 38
    var todoId = _ref2.todoId;                                                                                        // 38
    var newCheckedStatus = _ref2.newCheckedStatus;                                                                    // 38
                                                                                                                      //
    var todo = Todos.findOne(todoId);                                                                                 // 39
                                                                                                                      //
    if (todo.checked === newCheckedStatus) {                                                                          // 41
      // The status is already what we want, let's not do any extra work                                              //
      return;                                                                                                         // 43
    }                                                                                                                 // 44
                                                                                                                      //
    if (!todo.editableBy(this.userId)) {                                                                              // 46
      throw new Meteor.Error('todos.setCheckedStatus.accessDenied', 'Cannot edit checked status in a private list that is not yours');
    }                                                                                                                 // 49
                                                                                                                      //
    Todos.update(todoId, { $set: {                                                                                    // 51
        checked: newCheckedStatus                                                                                     // 52
      } });                                                                                                           // 51
  }                                                                                                                   // 54
});                                                                                                                   // 32
                                                                                                                      //
var updateText = new ValidatedMethod({                                                                                // 57
  name: 'todos.updateText',                                                                                           // 58
  validate: new SimpleSchema({                                                                                        // 59
    todoId: Todos.simpleSchema().schema('_id'),                                                                       // 60
    newText: Todos.simpleSchema().schema('text')                                                                      // 61
  }).validator({ clean: true, filter: false }),                                                                       // 59
  run: function run(_ref3) {                                                                                          // 63
    var todoId = _ref3.todoId;                                                                                        // 63
    var newText = _ref3.newText;                                                                                      // 63
                                                                                                                      //
    // This is complex auth stuff - perhaps denormalizing a userId onto todos                                         //
    // would be correct here?                                                                                         //
    var todo = Todos.findOne(todoId);                                                                                 // 66
                                                                                                                      //
    if (!todo.editableBy(this.userId)) {                                                                              // 68
      throw new Meteor.Error('todos.updateText.accessDenied', 'Cannot edit todos in a private list that is not yours');
    }                                                                                                                 // 71
                                                                                                                      //
    Todos.update(todoId, {                                                                                            // 73
      $set: {                                                                                                         // 74
        text: _.isUndefined(newText) ? null : newText                                                                 // 75
      }                                                                                                               // 74
    });                                                                                                               // 73
  }                                                                                                                   // 78
});                                                                                                                   // 57
                                                                                                                      //
var remove = new ValidatedMethod({                                                                                    // 81
  name: 'todos.remove',                                                                                               // 82
  validate: new SimpleSchema({                                                                                        // 83
    todoId: Todos.simpleSchema().schema('_id')                                                                        // 84
  }).validator({ clean: true, filter: false }),                                                                       // 83
  run: function run(_ref4) {                                                                                          // 86
    var todoId = _ref4.todoId;                                                                                        // 86
                                                                                                                      //
    var todo = Todos.findOne(todoId);                                                                                 // 87
                                                                                                                      //
    if (!todo.editableBy(this.userId)) {                                                                              // 89
      throw new Meteor.Error('todos.remove.accessDenied', 'Cannot remove todos in a private list that is not yours');
    }                                                                                                                 // 92
                                                                                                                      //
    Todos.remove(todoId);                                                                                             // 94
  }                                                                                                                   // 95
});                                                                                                                   // 81
                                                                                                                      //
// Get list of all method names on Todos                                                                              //
var TODOS_METHODS = _.pluck([insert, setCheckedStatus, updateText, remove], 'name');                                  // 99
                                                                                                                      //
if (Meteor.isServer) {                                                                                                // 106
  // Only allow 5 todos operations per connection per second                                                          //
  DDPRateLimiter.addRule({                                                                                            // 108
    name: function name(_name) {                                                                                      // 109
      return _.contains(TODOS_METHODS, _name);                                                                        // 110
    },                                                                                                                // 111
                                                                                                                      //
                                                                                                                      //
    // Rate limit per connection ID                                                                                   //
    connectionId: function connectionId() {                                                                           // 114
      return true;                                                                                                    // 114
    }                                                                                                                 // 114
  }, 5, 1000);                                                                                                        // 108
}                                                                                                                     // 116
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"todos.js":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits","meteor/mongo","meteor/factory","meteor/aldeed:simple-schema","faker","./incompleteCountDenormalizer.js","../lists/lists.js",function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/api/todos/todos.js                                                                                         //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.export({Todos:function(){return Todos}});var _classCallCheck;module.import('babel-runtime/helpers/classCallCheck',{"default":function(v){_classCallCheck=v}});var _possibleConstructorReturn;module.import('babel-runtime/helpers/possibleConstructorReturn',{"default":function(v){_possibleConstructorReturn=v}});var _inherits;module.import('babel-runtime/helpers/inherits',{"default":function(v){_inherits=v}});var Mongo;module.import('meteor/mongo',{"Mongo":function(v){Mongo=v}});var Factory;module.import('meteor/factory',{"Factory":function(v){Factory=v}});var SimpleSchema;module.import('meteor/aldeed:simple-schema',{"SimpleSchema":function(v){SimpleSchema=v}});var faker;module.import('faker',{"default":function(v){faker=v}});var incompleteCountDenormalizer;module.import('./incompleteCountDenormalizer.js',{"default":function(v){incompleteCountDenormalizer=v}});var Lists;module.import('../lists/lists.js',{"Lists":function(v){Lists=v}});
                                                                                                                      //
                                                                                                                      //
                                                                                                                      // 1
                                                                                                                      // 2
                                                                                                                      // 3
                                                                                                                      // 4
                                                                                                                      // 5
                                                                                                                      //
                                                                                                                      // 7
                                                                                                                      //
var TodosCollection = function (_Mongo$Collection) {                                                                  //
  _inherits(TodosCollection, _Mongo$Collection);                                                                      //
                                                                                                                      //
  function TodosCollection() {                                                                                        //
    _classCallCheck(this, TodosCollection);                                                                           //
                                                                                                                      //
    return _possibleConstructorReturn(this, _Mongo$Collection.apply(this, arguments));                                //
  }                                                                                                                   //
                                                                                                                      //
  TodosCollection.prototype.insert = function insert(doc, callback) {                                                 //
    var ourDoc = doc;                                                                                                 // 11
    ourDoc.createdAt = ourDoc.createdAt || new Date();                                                                // 12
    var result = _Mongo$Collection.prototype.insert.call(this, ourDoc, callback);                                     // 13
    incompleteCountDenormalizer.afterInsertTodo(ourDoc);                                                              // 14
    return result;                                                                                                    // 15
  };                                                                                                                  // 16
                                                                                                                      //
  TodosCollection.prototype.update = function update(selector, modifier) {                                            //
    var result = _Mongo$Collection.prototype.update.call(this, selector, modifier);                                   // 18
    incompleteCountDenormalizer.afterUpdateTodo(selector, modifier);                                                  // 19
    return result;                                                                                                    // 20
  };                                                                                                                  // 21
                                                                                                                      //
  TodosCollection.prototype.remove = function remove(selector) {                                                      //
    var todos = this.find(selector).fetch();                                                                          // 23
    var result = _Mongo$Collection.prototype.remove.call(this, selector);                                             // 24
    incompleteCountDenormalizer.afterRemoveTodos(todos);                                                              // 25
    return result;                                                                                                    // 26
  };                                                                                                                  // 27
                                                                                                                      //
  return TodosCollection;                                                                                             //
}(Mongo.Collection);                                                                                                  //
                                                                                                                      //
var Todos = new TodosCollection('Todos');                                                                             // 30
wTodos = Todos;                                                                                                       // 31
                                                                                                                      //
// Deny all client-side updates since we will be using methods to manage this collection                              //
Todos.deny({                                                                                                          // 34
  insert: function insert() {                                                                                         // 35
    return true;                                                                                                      // 35
  },                                                                                                                  // 35
  update: function update() {                                                                                         // 36
    return true;                                                                                                      // 36
  },                                                                                                                  // 36
  remove: function remove() {                                                                                         // 37
    return true;                                                                                                      // 37
  }                                                                                                                   // 37
});                                                                                                                   // 34
                                                                                                                      //
Todos.schema = new SimpleSchema({                                                                                     // 40
  _id: {                                                                                                              // 41
    type: String,                                                                                                     // 42
    regEx: SimpleSchema.RegEx.Id                                                                                      // 43
  },                                                                                                                  // 41
  listId: {                                                                                                           // 45
    type: String,                                                                                                     // 46
    regEx: SimpleSchema.RegEx.Id,                                                                                     // 47
    denyUpdate: true                                                                                                  // 48
  },                                                                                                                  // 45
  text: {                                                                                                             // 50
    type: String,                                                                                                     // 51
    max: 100,                                                                                                         // 52
    optional: true                                                                                                    // 53
  },                                                                                                                  // 50
  createdAt: {                                                                                                        // 55
    type: Date,                                                                                                       // 56
    denyUpdate: true                                                                                                  // 57
  },                                                                                                                  // 55
  checked: {                                                                                                          // 59
    type: Boolean,                                                                                                    // 60
    defaultValue: false                                                                                               // 61
  }                                                                                                                   // 59
});                                                                                                                   // 40
                                                                                                                      //
Todos.attachSchema(Todos.schema);                                                                                     // 65
                                                                                                                      //
// This represents the keys from Lists objects that should be published                                               //
// to the client. If we add secret properties to List objects, don't list                                             //
// them here to keep them private to the server.                                                                      //
Todos.publicFields = {                                                                                                // 70
  listId: 1,                                                                                                          // 71
  text: 1,                                                                                                            // 72
  createdAt: 1,                                                                                                       // 73
  checked: 1                                                                                                          // 74
};                                                                                                                    // 70
                                                                                                                      //
// TODO This factory has a name - do we have a code style for this?                                                   //
//   - usually I've used the singular, sometimes you have more than one though, like                                  //
//   'todo', 'emptyTodo', 'checkedTodo'                                                                               //
Factory.define('todo', Todos, {                                                                                       // 80
  listId: function listId() {                                                                                         // 81
    return Factory.get('list');                                                                                       // 81
  },                                                                                                                  // 81
  text: function text() {                                                                                             // 82
    return faker.lorem.sentence();                                                                                    // 82
  },                                                                                                                  // 82
  createdAt: function createdAt() {                                                                                   // 83
    return new Date();                                                                                                // 83
  }                                                                                                                   // 83
});                                                                                                                   // 80
                                                                                                                      //
Todos.helpers({                                                                                                       // 86
  list: function list() {                                                                                             // 87
    return Lists.findOne(this.listId);                                                                                // 88
  },                                                                                                                  // 89
  editableBy: function editableBy(userId) {                                                                           // 90
    return this.list().editableBy(userId);                                                                            // 91
  }                                                                                                                   // 92
});                                                                                                                   // 86
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},"startup":{"both":{"index.js":["./useraccounts-configuration.js",function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/startup/both/index.js                                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.import('./useraccounts-configuration.js');                                                                     // 1
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"useraccounts-configuration.js":["meteor/useraccounts:core",function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/startup/both/useraccounts-configuration.js                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var AccountsTemplates;module.import('meteor/useraccounts:core',{"AccountsTemplates":function(v){AccountsTemplates=v}});
                                                                                                                      //
/**                                                                                                                   //
 * The useraccounts package must be configured for both client and server to work properly.                           //
 * See the Guide for reference (https://github.com/meteor-useraccounts/core/blob/master/Guide.md)                     //
 */                                                                                                                   //
                                                                                                                      //
AccountsTemplates.configure({                                                                                         // 8
  showForgotPasswordLink: true,                                                                                       // 9
  defaultTemplate: 'Auth_page',                                                                                       // 10
  defaultLayout: 'App_body',                                                                                          // 11
  defaultContentRegion: 'main',                                                                                       // 12
  defaultLayoutRegions: {}                                                                                            // 13
});                                                                                                                   // 8
                                                                                                                      //
AccountsTemplates.configureRoute('signIn', {                                                                          // 16
  name: 'signin',                                                                                                     // 17
  path: '/signin'                                                                                                     // 18
});                                                                                                                   // 16
                                                                                                                      //
AccountsTemplates.configureRoute('signUp', {                                                                          // 21
  name: 'join',                                                                                                       // 22
  path: '/join'                                                                                                       // 23
});                                                                                                                   // 21
                                                                                                                      //
AccountsTemplates.configureRoute('forgotPwd');                                                                        // 26
                                                                                                                      //
AccountsTemplates.configureRoute('resetPwd', {                                                                        // 28
  name: 'resetPwd',                                                                                                   // 29
  path: '/reset-password'                                                                                             // 30
});                                                                                                                   // 28
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"server":{"fixtures.js":["meteor/meteor","../../api/lists/lists.js","../../api/todos/todos.js",function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/startup/server/fixtures.js                                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var Meteor;module.import('meteor/meteor',{"Meteor":function(v){Meteor=v}});var Lists;module.import('../../api/lists/lists.js',{"Lists":function(v){Lists=v}});var Todos;module.import('../../api/todos/todos.js',{"Todos":function(v){Todos=v}});
                                                                                                                      // 2
                                                                                                                      // 3
                                                                                                                      //
// if the database is empty on server start, create some sample data.                                                 //
Meteor.startup(function () {                                                                                          // 6
  if (Lists.find().count() === 0) {                                                                                   // 7
    (function () {                                                                                                    // 7
      var data = [{                                                                                                   // 8
        name: 'Meteor Principles',                                                                                    // 10
        items: ['Data on the Wire', 'One Language', 'Database Everywhere', 'Latency Compensation', 'Full Stack Reactivity', 'Embrace the Ecosystem', 'Simplicity Equals Productivity']
      }, {                                                                                                            // 9
        name: 'Languages',                                                                                            // 22
        items: ['Lisp', 'C', 'C++', 'Python', 'Ruby', 'JavaScript', 'Scala', 'Erlang', '6502 Assembly']               // 23
      }, {                                                                                                            // 21
        name: 'Favorite Scientists',                                                                                  // 36
        items: ['Ada Lovelace', 'Grace Hopper', 'Marie Curie', 'Carl Friedrich Gauss', 'Nikola Tesla', 'Claude Shannon']
      }];                                                                                                             // 35
                                                                                                                      //
      var timestamp = new Date().getTime();                                                                           // 48
                                                                                                                      //
      data.forEach(function (list) {                                                                                  // 50
        var listId = Lists.insert({                                                                                   // 51
          name: list.name,                                                                                            // 52
          incompleteCount: list.items.length                                                                          // 53
        });                                                                                                           // 51
                                                                                                                      //
        list.items.forEach(function (text) {                                                                          // 56
          Todos.insert({                                                                                              // 57
            listId: listId,                                                                                           // 58
            text: text,                                                                                               // 59
            createdAt: new Date(timestamp)                                                                            // 60
          });                                                                                                         // 57
                                                                                                                      //
          timestamp += 1; // ensure unique timestamp.                                                                 // 63
        });                                                                                                           // 64
      });                                                                                                             // 65
    })();                                                                                                             // 7
  }                                                                                                                   // 66
});                                                                                                                   // 67
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"index.js":["./fixtures.js","./reset-password-email.js","./security.js","./register-api.js",function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/startup/server/index.js                                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.import('./fixtures.js');module.import('./reset-password-email.js');module.import('./security.js');module.import('./register-api.js');// This defines a starting set of data to be loaded if the app is loaded with an empty db.
                                                                                                                      // 2
                                                                                                                      //
// This file configures the Accounts package to define the UI of the reset password email.                            //
                                                                                                                      // 5
                                                                                                                      //
// Set up some rate limiting and other important security settings.                                                   //
                                                                                                                      // 8
                                                                                                                      //
// This defines all the collections, publications and methods that the application provides                           //
// as an API to the client.                                                                                           //
                                                                                                                      // 12
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"register-api.js":["../../api/lists/methods.js","../../api/lists/server/publications.js","../../api/todos/methods.js","../../api/todos/server/publications.js",function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/startup/server/register-api.js                                                                             //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.import('../../api/lists/methods.js');module.import('../../api/lists/server/publications.js');module.import('../../api/todos/methods.js');module.import('../../api/todos/server/publications.js');
                                                                                                                      // 2
                                                                                                                      // 3
                                                                                                                      // 4
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"reset-password-email.js":["meteor/accounts-base",function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/startup/server/reset-password-email.js                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var Accounts;module.import('meteor/accounts-base',{"Accounts":function(v){Accounts=v}});                              // 1
                                                                                                                      //
Accounts.emailTemplates.siteName = 'Dora\'s Dream';                                                                   // 4
Accounts.emailTemplates.from = 'Meteor Todos Accounts <joc98@163.com>';                                               // 5
                                                                                                                      //
Accounts.emailTemplates.resetPassword = {                                                                             // 7
  subject: function subject() {                                                                                       // 8
    return 'Reset your password on Dora\'s Dream';                                                                    // 9
  },                                                                                                                  // 10
  html: function html(user, url) {                                                                                    // 11
    return 'Hello!\n\n<h1>Click the link below to reset your password on Meteor Todos.</h1>\n\n' + url + '\n\nIf you didn\'t request this email, please ignore it.\n\nThanks,\nThe Meteor Todos team\n';
  }                                                                                                                   // 23
};                                                                                                                    // 7
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"security.js":["meteor/meteor","meteor/ddp-rate-limiter","meteor/underscore",function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/startup/server/security.js                                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var Meteor;module.import('meteor/meteor',{"Meteor":function(v){Meteor=v}});var DDPRateLimiter;module.import('meteor/ddp-rate-limiter',{"DDPRateLimiter":function(v){DDPRateLimiter=v}});var _;module.import('meteor/underscore',{"_":function(v){_=v}});
                                                                                                                      // 2
                                                                                                                      // 3
                                                                                                                      //
// Don't let people write arbitrary data to their 'profile' field from the client                                     //
Meteor.users.deny({                                                                                                   // 6
  update: function update() {                                                                                         // 7
    return true;                                                                                                      // 8
  }                                                                                                                   // 9
});                                                                                                                   // 6
                                                                                                                      //
// Get a list of all accounts methods by running `Meteor.server.method_handlers` in meteor shell                      //
var AUTH_METHODS = ['login', 'logout', 'logoutOtherClients', 'getNewToken', 'removeOtherTokens', 'configureLoginService', 'changePassword', 'forgotPassword', 'resetPassword', 'verifyEmail', 'createUser', 'ATRemoveService', 'ATCreateUserServer', 'ATResendVerificationEmail'];
                                                                                                                      //
// Only allow 2 login attempts per connection per 5 seconds                                                           //
DDPRateLimiter.addRule({                                                                                              // 31
  name: function name(_name) {                                                                                        // 32
    return _.contains(AUTH_METHODS, _name);                                                                           // 33
  },                                                                                                                  // 34
                                                                                                                      //
                                                                                                                      //
  // Rate limit per connection ID                                                                                     //
  connectionId: function connectionId() {                                                                             // 37
    return true;                                                                                                      // 37
  }                                                                                                                   // 37
}, 2, 5000);                                                                                                          // 31
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}}},"i18n":{"en.i18n.json":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// i18n/en.i18n.json                                                                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,
    package_name = "project",
    namespace = "project";

if (package_name != "project") {
    namespace = TAPi18n.packages[package_name].namespace;
}
TAPi18n._enable({"helper_name":"_","supported_languages":null,"i18n_files_route":"/tap-i18n","preloaded_langs":[],"cdn_path":null});
TAPi18n.languages_names["en"] = ["English","English"];
// integrate the fallback language translations 
translations = {};
translations[namespace] = {"lists":{"makePrivate":{"notLoggedIn":"Must be logged in to make private lists.","lastPublicList":"Cannot make the last public list private."},"makePublic":{"notLoggedIn":"Must be logged in.","accessDenied":"You don't have permission to edit this list."},"updateName":{"accessDenied":"You don't have permission to edit this list."},"remove":{"accessDenied":"'You don't have permission to remove this list.'","lastPublicList":"Cannot delete the last public list.","confirm":"Are you sure you want to delete the list"},"show":{"cancel":"Cancel","showMenu":"Show Menu","selectAction":"Select an action","makePublic":"Make Public","makePrivate":"Make Private","delete":"Delete","makeListPublic":"Make list public","makeListPrivate":"Make list private","deleteList":"Delete list","typeToAdd":"Type to add new tasks","noTasks":"No tasks here","addAbove":"Add new tasks using the field above","loading":"Loading tasks..."},"insert":{"list":"List"}},"todos":{"insert":{"accessDenied":"Cannot add todos to a private list that is not yours"},"setCheckedStatus":{"accessDenied":"Cannot edit todos in a private list that is not yours"},"updateText":{"accessDenied":"Cannot edit todos in a private list that is not yours"},"remove":{"accessDenied":"Cannot remove todos in a private list that is not yours"},"item":{"taskName":"Task name"}},"useraccounts":{"atTitle":{"subtitle":"Signing in allows you to have private lists"}},"layouts":{"appBody":{"logout":"Logout","login":"Sign In","join":"Join","newList":"New List","newListError":"Could not create list.","tryingToConnect":"Trying to connect","connectionIssue":"There seems to be a connection issue"}},"pages":{"appNotFound":{"pageNotFound":"Page not found"}}};
TAPi18n._loadLangFileObject("en", translations);
TAPi18n._registerServerTranslator("en", namespace);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"fr.i18n.json":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// i18n/fr.i18n.json                                                                                                  //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _ = Package.underscore._,
    package_name = "project",
    namespace = "project";

if (package_name != "project") {
    namespace = TAPi18n.packages[package_name].namespace;
}
TAPi18n.languages_names["fr"] = ["French (France)","Français"];
if(_.isUndefined(TAPi18n.translations["fr"])) {
  TAPi18n.translations["fr"] = {};
}

if(_.isUndefined(TAPi18n.translations["fr"][namespace])) {
  TAPi18n.translations["fr"][namespace] = {};
}

_.extend(TAPi18n.translations["fr"][namespace], {"lists":{"makePrivate":{"notLoggedIn":"Doit être connecté pour réaliser des listes privées.","lastPublicList":"Vous ne pouvez pas faire la dernière liste publique privée."},"makePublic":{"notLoggedIn":"Doit être connecté.","accessDenied":"Vous n'êtes pas autorisé à modifier cette liste."},"updateName":{"accessDenied":"Vous n'êtes pas autorisé à modifier cette liste."},"remove":{"accessDenied":"'Vous n'êtes pas autorisé à supprimer cette liste.'","lastPublicList":"Vous ne pouvez pas supprimer la dernière liste publique.","confirm":"Etes-vous sûr de vouloir supprimer la liste"},"show":{"cancel":"Annuler","showMenu":"Afficher le menu","selectAction":"Sélectionnez une action","makePublic":"Rendre publique","makePrivate":"Rendre privé","delete":"Effacer","makeListPublic":"Ouvrir la liste pour le public","makeListPrivate":"Fermer la liste au public","deleteList":"Effacer la liste","typeToAdd":"Tapez pour ajouter de nouvelles tâches","noTasks":"Aucune tâche ici","addAbove":"Ajouter de nouvelles tâches ci-dessus","loading":"Chargement sauvé tâches..."},"insert":{"list":"Liste"}},"todos":{"insert":{"accessDenied":"Vous ne pouvez pas ajouter todo à une liste privée qui ne vous appartient pas"},"setCheckedStatus":{"accessDenied":"Vous ne pouvez pas modifier todos dans une liste privée qui ne vous appartient pas"},"updateText":{"accessDenied":"Vous ne pouvez pas modifier todos dans une liste privée qui ne vous appartient pas"},"remove":{"accessDenied":"Vous ne pouvez pas supprimer todos dans une liste privée qui ne vous appartient pas"},"item":{"taskName":"Nom de la tâche"}},"useraccounts":{"atTitle":{"subtitle":"Connexion à vous permet d'avoir des listes privées"}},"layouts":{"appBody":{"logout":"Se déconnecter","login":"Se connecter","join":"Joindre","newList":"Nouvelle liste","newListError":"La liste ne peut être créé.","tryingToConnect":"Tentative de connexion","connectionIssue":"Il semble y avoir un problème de connexion"}},"pages":{"appNotFound":{"pageNotFound":"Page non trouvée"}}});
TAPi18n._registerServerTranslator("fr", namespace);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"server":{"main.js":["/imports/startup/server","/imports/startup/both","meteor/email",function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/main.js                                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
module.import('/imports/startup/server');module.import('/imports/startup/both');var Email;module.import('meteor/email',{"Email":function(v){Email=v}});
                                                                                                                      // 2
                                                                                                                      // 3
                                                                                                                      //
Accounts.emailTemplates.siteName = "dorasdream.com";                                                                  // 5
Accounts.emailTemplates.from = "Dorasdream Admin <joc98@163.com>";                                                    // 6
Accounts.emailTemplates.enrollAccount.subject = function (user) {                                                     // 7
    return "Welcome to Awesome Town, " + user.profile.name;                                                           // 8
};                                                                                                                    // 9
Accounts.emailTemplates.enrollAccount.text = function (user, url) {                                                   // 10
    return "You have been selected to participate in building a better future!" + " To activate your account, simply click the link below:\n\n" + url;
};                                                                                                                    // 14
Accounts.emailTemplates.resetPassword.from = function () {                                                            // 15
    // Overrides value set in Accounts.emailTemplates.from when resetting passwords                                   //
    return "AwesomeSite Password Reset <joc98@163.com>";                                                              // 17
};                                                                                                                    // 18
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]}},{"extensions":[".js",".json"]});
require("./i18n/en.i18n.json");
require("./i18n/fr.i18n.json");
require("./server/main.js");
//# sourceMappingURL=app.js.map
