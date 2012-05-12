(function() {
  var Todo, TodoCollection, TodoCollectionView, TodoRouter, TodoView,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Todo = (function(_super) {

    __extends(Todo, _super);

    function Todo() {
      Todo.__super__.constructor.apply(this, arguments);
    }

    return Todo;

  })(Backbone.Model);

  TodoCollection = (function(_super) {

    __extends(TodoCollection, _super);

    function TodoCollection() {
      TodoCollection.__super__.constructor.apply(this, arguments);
    }

    TodoCollection.prototype.model = Todo;

    TodoCollection.prototype.url = "/todos";

    return TodoCollection;

  })(Backbone.Collection);

  TodoView = (function(_super) {

    __extends(TodoView, _super);

    function TodoView() {
      this.render = __bind(this.render, this);
      TodoView.__super__.constructor.apply(this, arguments);
    }

    TodoView.prototype.tagName = "li";

    TodoView.prototype.render = function() {
      $(this.el).html(this.model.get("text"));
      return this;
    };

    return TodoView;

  })(Backbone.View);

  TodoCollectionView = (function(_super) {

    __extends(TodoCollectionView, _super);

    function TodoCollectionView() {
      this.addAll = __bind(this.addAll, this);
      this.render = __bind(this.render, this);
      TodoCollectionView.__super__.constructor.apply(this, arguments);
    }

    TodoCollectionView.prototype.template = "<h1><%= collection.length %> Todos</h1>\n<ul></ul>";

    TodoCollectionView.prototype.initialize = function() {
      this.collection.on('reset', this.render);
      return this.collection.on('reset', this.addAll);
    };

    TodoCollectionView.prototype.render = function() {
      $(this.el).html(_.template(this.template, {
        collection: this.collection
      }));
      return this;
    };

    TodoCollectionView.prototype.addAll = function() {
      var _this = this;
      return this.collection.each(function(todo) {
        var todoHtml;
        todoHtml = new TodoView({
          model: todo
        }).render().el;
        return $(_this.el).find("ul").append(todoHtml);
      });
    };

    return TodoCollectionView;

  })(Backbone.View);

  TodoRouter = (function(_super) {

    __extends(TodoRouter, _super);

    function TodoRouter() {
      TodoRouter.__super__.constructor.apply(this, arguments);
    }

    TodoRouter.prototype.routes = {
      "": "index",
      "help": "help"
    };

    TodoRouter.prototype.initialize = function() {
      this.collection = new TodoCollection;
      return this.collection.fetch();
    };

    TodoRouter.prototype.help = function() {
      return alert('Here are your todos!');
    };

    TodoRouter.prototype.index = function() {
      var view;
      view = new TodoCollectionView({
        collection: this.collection
      });
      return $("#todo-container").html(view.render().el);
    };

    return TodoRouter;

  })(Backbone.Router);

  $(function() {
    var router;
    router = new TodoRouter;
    return Backbone.history.start();
  });

}).call(this);
