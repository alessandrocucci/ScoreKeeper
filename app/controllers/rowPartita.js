var moment = require('alloy/moment');
var partite = Alloy.Collections.partita;
var id;

// $model represents the current model accessible to this
// controller from the markup's model-view binding. $model
// will be null if there is no binding in place.

if ($model) {
	id = $model.id;
	$.nomePartita.color = '#000';
	
}


//open game
function openGame() {
	var GameName = partite.get(id).toJSON();
	Ti.App.Properties.setString('GameName', GameName.item);
	Alloy.createController("indexGame").getView().open();
}

function deleteTask(e) {
	// prevent bubbling up to the row
	e.cancelBubble = true;

	
	var partita = partite.get(id);

	// destroy the model from persistence, which will in turn remove
	// it from the collection, and model-view binding will automatically
	// reflect this in the tableview
	partita.destroy();
}