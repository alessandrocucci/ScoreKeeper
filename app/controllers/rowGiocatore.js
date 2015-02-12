var moment = require('alloy/moment');
var giocatori = Alloy.Collections.giocatore;
var id;
var GameName = Ti.App.Properties.getString('GameName');
var table = giocatori.config.adapter.collection_name;

// $model represents the current model accessible to this
// controller from the markup's model-view binding. $model
// will be null if there is no binding in place.

if ($model) {
	id = $model.id;
	$.nomeGiocatore.color = '#000';
	$.puntiGiocatore.color ='#000';
	
}

function deleteTask(e) {
	e.cancelBubble = true;
	var giocatore = giocatori.get(id);
	giocatore.destroy();
}

function aggiungi(e) {
	e.cancelBubble = true;
	var points = giocatori.get(id).toJSON().points + 1;
	var giocatore = giocatori.get(id);
	giocatore.save({points:points});
	giocatori.fetch({query:'SELECT * from ' + table + ' where game="' + GameName + '" ORDER BY points DESC'});
}

function togli(e) {
	e.cancelBubble = true;
	var points = giocatori.get(id).toJSON().points - 1;
	if (points < 0) points = 0;
	var giocatore = giocatori.get(id);
	giocatore.save({points:points});
	giocatori.fetch({query:'SELECT * from ' + table + ' where game="' + GameName + '" ORDER BY points DESC'});
}

