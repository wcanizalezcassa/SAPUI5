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
                
                var oView = this.getView();
                var oJSONModelEmpl = new sap.ui.model.json.JSONModel();
             //   var i18nBundle = oView.getModel("i18n").getResourceBundle();
                oJSONModelEmpl.loadData("./localService/mockdata/Employees.json", false);
            //    oJSONModel.attachRequestCompleted(function (oEventModel){
            //        console.log(JSON.stringify(oJSONModel.getData()));
             //   });
                oView.setModel(oJSONModelEmpl, "jsonEmployees");

                var oJSONModelCountries = new sap.ui.model.json.JSONModel();
                oJSONModelCountries.loadData("./localService/mockdata/Countries.json", false);
                oView.setModel(oJSONModelCountries, "jsonCountries");

                var oJSONModelConfig = new sap.ui.model.json.JSONModel({
                    visibleID: true,
                    visibleName: true,
                    visibleCountry:true,
                    visibleCity: false,
                    visibleBtnShowCity: true,
                    visibleBtnHideCity:false

                });
                oView.setModel(oJSONModelConfig, "jsonConfig");

            },

            onFilter: function () {
                var oJSONCountries = this.getView().getModel("jsonCountries").getData();
                var filters = [];

                if (oJSONCountries.EmployeeId !== "") {
                    filters.push(new Filter("EmployeeID", FilterOperator.EQ, oJSONCountries.EmployeeId));
                } else {
                    
                }

                if (oJSONCountries.CountryKey !== "") {
                    filters.push(new Filter("Country", FilterOperator.EQ, oJSONCountries.CountryKey));
                } else {
                    
                }

                var oList = this.getView().byId("tableEmployee");
                var oBinding = oList.getBinding("items");

                oBinding.filter(filters);
            },

            onClearFilter: function(){
                var oModel = this.getView().getModel("jsonCountries");
                oModel.setProperty("/EmployeeId", "");
                oModel.setProperty("/CountryKey", "");

            },

            showPostalCode: function(oEvent) {
                var itemPress = oEvent.getSource();
                var oContext = itemPress.getBindingContext("jsonEmployees");
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
            }, 

            onShowCity : function (){
                var oJSONModelConfig = this.getView().getModel("jsonConfig");
                oJSONModelConfig.setProperty("/visibleCity",true);
                oJSONModelConfig.setProperty("/visibleBtnShowCity",false);
                oJSONModelConfig.setProperty("/visibleBtnHideCity",true);
            },
            onHideCity : function(){
                var oJSONModelConfig = this.getView().getModel("jsonConfig");
                oJSONModelConfig.setProperty("/visibleCity",false);
                oJSONModelConfig.setProperty("/visibleBtnShowCity",true);
                oJSONModelConfig.setProperty("/visibleBtnHideCity",false);
            }
        });
    });
