class Todo extends Backbone.Model
  urlRoot: "/todos"

class TodoRouter extends Backbone.Router
  routes:
    "" : "index"
    "help" : "help"

  initialize: ->
    #@collection = new TodoCollection
    #@collection.fetch()

  help: ->
    alert 'Here are your todos!'

  index: ->
    #view = new TodoCollectionView(collection: @collection)
    #$("#todo-container").html view.render().el

router = new TodoRouter
Backbone.history.start()
