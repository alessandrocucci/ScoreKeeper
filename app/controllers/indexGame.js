$.playerWin.open();

var playerField = $.playerField;
playerField.softKeyboardOnFocus = Ti.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS;
        playerField.addEventListener('click',function(e)
        {
            playerField.setSoftKeyboardOnFocus(Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS);
            playerField.focus();
        });

var GameName = Ti.App.Properties.getString('GameName');

$.playerWin.title = GameName;

var giocatori = Alloy.Collections.giocatore;
var table = giocatori.config.adapter.collection_name;
giocatori && giocatori.fetch({query:'SELECT * from ' + table + ' where game="' + GameName + '" ORDER BY points DESC'});

function back() {
	Alloy.createController("index").getView().open();
}

function aggiungiGiocatore(){
	

    // Create a new model 
    var giocatore = Alloy.createModel('Giocatore', {
        name: $.playerField.value,
        points: 0,
        game: GameName
    });

    // add new model to the global collection
    giocatori.add(giocatore);

    // save the model to persistent storage
    giocatore.save();

    // reload 
    giocatori.fetch({query:'SELECT * from ' + table + ' where game="' + GameName + '" ORDER BY points DESC'});
    $.playerField.blur();
    $.playerField.addEventListener('focus',function(e){
    	$.playerField.value = '';
	});
}

function closeKeyboard(e) {
    e.source.blur();
}

function transformFunction(model) {
	var transform = model.toJSON();
	transform.name = transform.name;
	return transform;
}

$.playerWin.addEventListener('androidback' , function(e){
    Alloy.createController("index").getView().open();
});
