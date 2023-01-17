sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.Filter} Filter
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator
     */
    function (Controller,Filter,FilterOperator) {
        "use strict";

        return Controller.extend("logali.employees.controller.MainView", {
            onAfterRendering: function () {
                var oJSONModel = new sap.ui.model.json.JSONModel();
                var oView = this.getView();
                var i18nBundle = oView.getModel("i18n").getResourceBundle();

                // var oJSON = {
                //     employeeId: "12345",
                //     countryKey: "UK",
                //     listCountry: [
                //         {
                //             key: 'US',
                //             text: i18nBundle.getText("countryUS")
                //         },
                //         {
                //             key: 'UK',
                //             text: i18nBundle.getText("countryUK")
                //         },
                //         {
                //             key: 'ES',
                //             text: i18nBundle.getText("countryES")
                //         }

                //     ]
                // };

                // oJSONModel.setData(oJSON);
                oJSONModel.loadData("./localService/mockdata/Employees.json", false);
                oJSONModel.attachRequestCompleted(function (oEventModel){
                    console.log(JSON.stringify(oJSONModel.getData()));
                });
                oView.setModel(oJSONModel);

            },

            onFilter: function () {
                var oJSON = this.getView().getModel().getData();
                var filters = [];

                if (oJSON.EmployeeId !== "") {
                    filters.push(new Filter("EmployeeID", FilterOperator.EQ, oJSON.EmployeeId));
                } else {
                    
                }

                if (oJSON.CountryKey !== "") {
                    filters.push(new Filter("Country", FilterOperator.EQ, oJSON.CountryKey));
                } else {
                    
                }

                var oList = this.getView().byId("tableEmployee");
                var oBinding = oList.getBinding("items");

                oBinding.filter(filters);
            },

            onClearFilter: function(){
                var oModel = this.getView().getModel();
                oModel.setProperty("/EmployeeId", "");
                oModel.setProperty("/CountryKey", "");

            },

            showPostalCode: function(oEvent) {
                var itemPress = oEvent.getSource();
                var oContext = itemPress.getBindingContext();
                var objectContext = oContext.getObject();

                sap.m.MessageToast.show(objectContext.PostalCode);

            },

            onValidate: function () {
                var inputEmployee = this.byId("inputEmployee");
                var valueEmployee = inputEmployee.getValue();

                if (valueEmployee.length === 6) {
                    // inputEmployee.setDescription("Ok");
                    this.byId("labelCountry").setVisible(true);
                    this.byId("slCountry").setVisible(true);

                } else {
                    //inputEmployee.setDescription("Not Ok");
                    this.byId("labelCountry").setVisible(false);
                    this.byId("slCountry").setVisible(false);
                };
            }
        });
    });
