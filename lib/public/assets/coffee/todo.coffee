class Todo extends Backbone.Model
  url: "/todos"

class TodoCollection extends Backbone.Collection
  model: Todo
  url: "/todos"

class TodoCollectionView extends Backbone.View
  template: """
     <h1><%= collection.length %> Todos</h1>
     <div class="todo-list">
     </div>
  """
  initialize: ->
    @collection.on('reset', @render)
    @collection.on('reset', @addAll)
  render: =>
    console.log @collection
    $(@el).html(_.template @template, collection: @collection)
    @
  addAll: =>
    @collection.each (item) ->
      console.log item

class TodoRouter extends Backbone.Router
  routes:
    "" : "index"
    "help" : "help"

  initialize: ->
    @collection = new TodoCollection
    @collection.fetch()

  help: ->
    console.log 'help'

  index: ->
    view = new TodoCollectionView(collection: @collection)
    $("#todo-container").html view.render().el

$ ->
  router = new TodoRouter
  Backbone.history.start()
