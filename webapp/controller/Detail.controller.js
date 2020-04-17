sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function (Controller, History, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("com.sap.ae-mockup.controller.Detail", {

		onInit: function () {
			this._Router = this.getOwnerComponent().getRouter();
			this._Router.getRoute("Detail").attachMatched(this._onRouteMatched, this);
		},

		_onRouteMatched: function (oEvent) {
			debugger;
			var scNo = oEvent.getParameters().arguments.SCNo;
			this.bindSCDetails(scNo);
		},
		
		bindSCDetails : function(scNo) {
			var mock = this.getView().getModel("mock").getData().items;
			var scDetails = mock.filter(mock => (mock.SCNo === scNo))[0];
			this.getView().getModel("scDetails").setData(scDetails);
		},

		onBack: function () {
			var sPreviousHash = History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getOwnerComponent().getRouter().navTo("List", null, true);
			}
		},
		
		onAddRecord: function(oEvent) {
			if (!this._oDialogAddRecord) {
				this._oDialogAddRecord = sap.ui.xmlfragment("com.sap.ae-mockup.view.AddRecord", this);
			}
			
			this.getView().addDependent(this._oDialogAddRecord);
			
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialogAddRecord);
			this._oDialogAddRecord.open();
		},
		
		onCloseAddRecord: function(oEvent) {
			this._oDialogAddRecord.close();
		},
		
		handleSupplierPress: function (oEvent) {
			if (!this._oDialogSupplier) {
				this._oDialogSupplier = sap.ui.xmlfragment("com.sap.ae-mockup.view.Supplier", this.getView().getController());
			}

			this.getView().addDependent(this._oDialogSupplier);

			// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialogSupplier);

			this._oDialogSupplier.open();
		},
		
		handleCloseSupplier: function (oEvent) {
			this._oDialogSupplier.close();
		},
		
		onSave: function (oEvent) {
			MessageBox.success("Aktivite başarıyla kaydedildi.");
		}

	});

});