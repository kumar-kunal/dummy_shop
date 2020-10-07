// Clean the object remove all empty and null values
const cleanObject = (obj) => {
	Object.entries(obj).forEach(([key, val]) => {
		if (val && val.constructor === Object) {
			cleanObject(obj[key]);
			if (!Object.values(val).length) {
				delete obj[key];
			}
		} else if (val === null || val === "") {
			delete obj[key];
		}
	})
}

// Safe get
const safeGet = (obj, key, defaultValue) => {
	if (!obj || !key) {
		return defaultValue;
	}
	let data = key.split(".").reduce(function (o, x) {
		return (typeof o == "undefined" || o === null) ? o : o[x];
	}, obj);
	return data ? data : defaultValue;
}

module.exports = {
	logging: require('./logging'),
	errorHandler: require('./errorHandler'),
	safeGet: safeGet,
	cleanObject: cleanObject
};
