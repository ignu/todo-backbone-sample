(function() {
  var Todo, TodoRouter, router,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Todo = (function(_super) {

    __extends(Todo, _super);

    function Todo() {
      Todo.__super__.constructor.apply(this, arguments);
    }

    Todo.prototype.urlRoot = "/todos";

    return Todo;

  })(Backbone.Model);

  TodoRouter = (function(_super) {

    __extends(TodoRouter, _super);

    function TodoRouter() {
      TodoRouter.__super__.constructor.apply(this, arguments);
    }

    TodoRouter.prototype.routes = {
      "": "index",
      "help": "help"
    };

    TodoRouter.prototype.initialize = function() {};

    TodoRouter.prototype.help = function() {
      return alert('Here are your todos!');
    };

    TodoRouter.prototype.index = function() {};

    return TodoRouter;

  })(Backbone.Router);

  router = new TodoRouter;

  Backbone.history.start();

}).call(this);
