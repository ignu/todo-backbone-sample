class Todo extends Backbone.Model
  urlRoot: "/todos"
window.Todo = Todo

class TodoCollection extends Backbone.Collection
  model: Todo
  url: "/todos"



class TodoView extends Backbone.View
  tagName: "li"
  render: =>
    $(@el).html @model.get("text")
    @



class TodoCollectionView extends Backbone.View
  template: """
     <h1><%= collection.length %> Todos</h1>
     <ul></ul>
  """
  initialize: ->
    @collection.on('reset', @render)
    @collection.on('reset', @addAll)
  render: =>
    $(@el).html(_.template @template, collection: @collection)
    @
  addAll: =>
    @collection.each (todo) =>
      todoHtml = new TodoView( model: todo).render().el
      $(@el).find("ul").append todoHtml



class TodoRouter extends Backbone.Router
  routes:
    "" : "index"
    "help" : "help"

  initialize: ->
    @collection = new TodoCollection
    @collection.fetch()

  help: ->
    alert 'Here are your todos!'

  index: ->
    view = new TodoCollectionView(collection: @collection)
    $("#todo-container").html view.render().el

$ ->
  router = new TodoRouter
  Backbone.history.start()
