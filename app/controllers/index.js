// open the window
$.Win.open();

var inputField = $.inputField;
inputField.softKeyboardOnFocus = Ti.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS;
        inputField.addEventListener('click',function(e)
        {
            inputField.setSoftKeyboardOnFocus(Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS);
            inputField.focus();
        });

var partite = Alloy.Collections.partita;
partite && partite.fetch();

function aggiungiPartita(){
	

    // Create a new model 
    var partita = Alloy.createModel('Partita', {
        item: $.inputField.value
    });

    // add new model to the global collection
    partite.add(partita);

    // save the model to persistent storage
    partita.save();

    // reload 
    partite.fetch();
    $.inputField.blur();
    $.inputField.addEventListener('focus',function(e){
    	$.inputField.value = '';
	});
}

function closeKeyboard(e) {
    e.source.blur();
}

function transformFunction(model) {
	var transform = model.toJSON();
	transform.item = transform.item;
	return transform;
}
