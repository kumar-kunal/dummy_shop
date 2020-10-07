const Response = require("../responses/response");
const StatusCodes = require("../facades/response");
const MessageTypes = require("../responses/types");
const Exceptions = require("../exceptions/Handler");
const {error} = require('../utils/logging')

// const { reqHasKey } = require('../hooks/helper')

/**
 * Base controller class which inherits all util methods
 * to use in the derived classes
 */
class BaseController {

	constructor() {
		// Method to send success response
		this.success = Response.success;
		// Method to send error response
		this.errors = Response.errors;
		// Status code
		this.status = StatusCodes;
		// Success status message
		this.messageTypes = MessageTypes;
		// Exception messages
		this.exceptions = Exceptions;
	}

	reqHasKey = (...data) => reqHasKey(...data)

	unexpectedError = (req, res, e) => {

		error(e);

		if (e.response) {
			const {status, data} = e.response;
			return this.errors(req, res, status, data.message);
		}

		if (e.code === 401) {
			return this.errors(req, res, this.status.HTTP_UNAUTHORIZED, e.message);
		}

		if (e.code === 'ECONNREFUSED') {
			const {address, port} = e;
			return this.errors(req, res, this.status.HTTP_SERVICE_UNAVAILABLE,
				`Unable to establish connection with ${address}:${port}`);
		}

		if (e.number === 544) {
			return this.errors(req, res, this.status.HTTP_BAD_REQUEST,
				this.messageTypes.errorMessages.explicitValueNotAllowed);
		}

		this.errors(req, res, this.status.HTTP_INTERNAL_SERVER_ERROR, this.exceptions.internalServerErr(req, e));
	};

}

module.exports = BaseController;
