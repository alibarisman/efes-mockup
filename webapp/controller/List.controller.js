sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.sap.ae-mockup.controller.List", {
		onInit: function () {
			this._Router = this.getOwnerComponent().getRouter();
			this._Router.getRoute("List").attachMatched(this._onRouteMatched, this);
		},
		
		_onRouteMatched: function (oEvent) {
			// var oContextCatalog = oEvent.getSource()._getPropertiesToPropagate().oBindingContexts.mockCatalog;
			// var path = oContextCatalog.getPath();
			// var catalogId = oContextCatalog.getProperty(path).inputItemNumber;

			// this._Router.navTo("RouteCatalogDetail", {
			// 	catalogId : catalogId
			// });
		},

		onListItemPress: function (oEvent) {
			var context = oEvent.getSource().getBindingContext("mock");
			var path = context.sPath;
			var scNo = context.getProperty(path).SCNo;
			this._Router.navTo("Detail", {
				SCNo : scNo
			});
		}

	});
});