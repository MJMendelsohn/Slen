var data = new GameData(new GameParameters(11));
var model = new Model(data);
var view = new View(data);
var listener = new Listener(model, view);