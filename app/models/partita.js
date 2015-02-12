var moment = require('alloy/moment');

exports.definition = {
	config: {
		"columns": {
			"item":"text"
		},
		"adapter": {
			"type": "sql",
			"collection_name": "partita"
		}
	},

	extendModel : function(Model) {
		_.extend(Model.prototype, {
			validate : function(attrs) {
				for (var key in attrs) {
					var value = attrs[key];
					if (value) {
						if (key === "item") {
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
			comparator: function(partita) {
				return partita.get('done');
			}
		});

		return Collection;
	}
};