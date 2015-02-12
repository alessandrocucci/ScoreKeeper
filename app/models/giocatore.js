var moment = require('alloy/moment');

exports.definition = {
	config: {
		"columns": {
			"id": "INTEGER PRIMARY KEY AUTOINCREMENT",
			"name":"text",
			"points":"integer",
			"game":"text"
		},
		"adapter": {
			"type": "sql",
			"collection_name": "giocatore"
		}
	},

	extendModel : function(Model) {
		_.extend(Model.prototype, {
			validate : function(attrs) {
				for (var key in attrs) {
					var value = attrs[key];
					if (value) {
						if (key === "name") {
							if (value.length <= 0) {
								return 'Error: No item!';
							}
						}
					}
				}
			}
		});

		return Model;
	},

	extendCollection : function(Collection) {
		_.extend(Collection.prototype, {
			comparator: function(giocatore) {
				return giocatore.get('done');
			}
		});

		return Collection;
	}
};