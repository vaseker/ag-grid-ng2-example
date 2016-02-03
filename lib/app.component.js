System.register(['angular2/core', 'ag-grid-ng2/main', './proficiencyFilter', './skillFilter', './refData'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, main_1, proficiencyFilter_1, skillFilter_1, refData_1;
    var AppComponent;
    function skillsCellRenderer(params) {
        var data = params.data;
        var skills = [];
        refData_1.default.IT_SKILLS.forEach(function (skill) {
            if (data && data.skills && data.skills[skill]) {
                skills.push('<img src="/images/skills/' + skill + '.png" width="16px" title="' + skill + '" />');
            }
        });
        return skills.join(' ');
    }
    function countryCellRenderer(params) {
        var flag = "<img border='0' width='15' height='10' style='margin-bottom: 2px' src='../images/flags/" + refData_1.default.COUNTRY_CODES[params.value] + ".png'>";
        return flag + " " + params.value;
    }
    function createRandomPhoneNumber() {
        var result = '+';
        for (var i = 0; i < 12; i++) {
            result += Math.round(Math.random() * 10);
            if (i === 2 || i === 5 || i === 8) {
                result += ' ';
            }
        }
        return result;
    }
    function percentCellRenderer(params) {
        var value = params.value;
        var eDivPercentBar = document.createElement('div');
        eDivPercentBar.className = 'div-percent-bar';
        eDivPercentBar.style.width = value + '%';
        if (value < 20) {
            eDivPercentBar.style.backgroundColor = 'red';
        }
        else if (value < 60) {
            eDivPercentBar.style.backgroundColor = '#ff9900';
        }
        else {
            eDivPercentBar.style.backgroundColor = '#00A000';
        }
        var eValue = document.createElement('div');
        eValue.className = 'div-percent-value';
        eValue.innerHTML = value + '%';
        var eOuterDiv = document.createElement('div');
        eOuterDiv.className = 'div-outer-div';
        eOuterDiv.appendChild(eValue);
        eOuterDiv.appendChild(eDivPercentBar);
        return eOuterDiv;
    }
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (main_1_1) {
                main_1 = main_1_1;
            },
            function (proficiencyFilter_1_1) {
                proficiencyFilter_1 = proficiencyFilter_1_1;
            },
            function (skillFilter_1_1) {
                skillFilter_1 = skillFilter_1_1;
            },
            function (refData_1_1) {
                refData_1 = refData_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    // we pass an empty gridOptions in, so we can grab the api out
                    this.gridOptions = {};
                    this.createRowData();
                    this.createColumnDefs();
                    this.showGrid = true;
                }
                AppComponent.prototype.createRowData = function () {
                    var rowData = [];
                    for (var i = 0; i < 10000; i++) {
                        var countryData = refData_1.default.countries[i % refData_1.default.countries.length];
                        rowData.push({
                            name: refData_1.default.firstNames[i % refData_1.default.firstNames.length] + ' ' + refData_1.default.lastNames[i % refData_1.default.lastNames.length],
                            skills: {
                                android: Math.random() < 0.4,
                                html5: Math.random() < 0.4,
                                mac: Math.random() < 0.4,
                                windows: Math.random() < 0.4,
                                css: Math.random() < 0.4
                            },
                            address: refData_1.default.addresses[i % refData_1.default.addresses.length],
                            years: Math.round(Math.random() * 100),
                            proficiency: Math.round(Math.random() * 100),
                            country: countryData.country,
                            continent: countryData.continent,
                            language: countryData.language,
                            mobile: createRandomPhoneNumber(),
                            landline: createRandomPhoneNumber()
                        });
                    }
                    this.rowData = rowData;
                };
                AppComponent.prototype.createColumnDefs = function () {
                    this.columnDefs = [
                        { headerName: '#', width: 30, checkboxSelection: true, suppressSorting: true,
                            suppressMenu: true, pinned: true },
                        {
                            headerName: 'Employee',
                            children: [
                                { headerName: "Name", field: "name",
                                    width: 150, pinned: true },
                                { headerName: "Country", field: "country", width: 150,
                                    cellRenderer: countryCellRenderer, pinned: true,
                                    filterParams: { cellRenderer: countryCellRenderer, cellHeight: 20 } },
                            ]
                        },
                        {
                            headerName: 'IT Skills',
                            children: [
                                { headerName: "Skills", width: 125, suppressSorting: true, cellRenderer: skillsCellRenderer, filter: skillFilter_1.default },
                                { headerName: "Proficiency", field: "proficiency", width: 120, cellRenderer: percentCellRenderer, filter: proficiencyFilter_1.default },
                            ]
                        },
                        {
                            headerName: 'Contact',
                            children: [
                                { headerName: "Mobile", field: "mobile", width: 150, filter: 'text' },
                                { headerName: "Land-line", field: "landline", width: 150, filter: 'text' },
                                { headerName: "Address", field: "address", width: 500, filter: 'text' }
                            ]
                        }
                    ];
                };
                AppComponent.prototype.calculateRowCount = function () {
                    if (this.gridOptions.api && this.rowData) {
                        var model = this.gridOptions.api.getModel();
                        var totalRows = this.rowData.length;
                        var processedRows = model.getVirtualRowCount();
                        this.rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
                    }
                };
                AppComponent.prototype.onModelUpdated = function () {
                    console.log('onModelUpdated');
                    this.calculateRowCount();
                };
                AppComponent.prototype.onReady = function () {
                    console.log('onReady');
                    this.calculateRowCount();
                };
                AppComponent.prototype.onCellClicked = function ($event) {
                    console.log('onCellClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
                };
                AppComponent.prototype.onCellValueChanged = function ($event) {
                    console.log('onCellValueChanged: ' + $event.oldValue + ' to ' + $event.newValue);
                };
                AppComponent.prototype.onCellDoubleClicked = function ($event) {
                    console.log('onCellDoubleClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
                };
                AppComponent.prototype.onCellContextMenu = function ($event) {
                    console.log('onCellContextMenu: ' + $event.rowIndex + ' ' + $event.colDef.field);
                };
                AppComponent.prototype.onCellFocused = function ($event) {
                    console.log('onCellFocused: (' + $event.rowIndex + ',' + $event.colIndex + ')');
                };
                AppComponent.prototype.onRowSelected = function ($event) {
                    console.log('onRowSelected: ' + $event.node.data.name);
                };
                AppComponent.prototype.onSelectionChanged = function () {
                    console.log('selectionChanged');
                };
                AppComponent.prototype.onBeforeFilterChanged = function () {
                    console.log('beforeFilterChanged');
                };
                AppComponent.prototype.onAfterFilterChanged = function () {
                    console.log('afterFilterChanged');
                };
                AppComponent.prototype.onFilterModified = function () {
                    console.log('onFilterModified');
                };
                AppComponent.prototype.onBeforeSortChanged = function () {
                    console.log('onBeforeSortChanged');
                };
                AppComponent.prototype.onAfterSortChanged = function () {
                    console.log('onAfterSortChanged');
                };
                AppComponent.prototype.onVirtualRowRemoved = function ($event) {
                    // because this event gets fired LOTS of times, we don't print it to the
                    // console. if you want to see it, just uncomment out this line
                    // console.log('onVirtualRowRemoved: ' + $event.rowIndex);
                };
                AppComponent.prototype.onRowClicked = function ($event) {
                    console.log('onRowClicked: ' + $event.node.data.name);
                };
                AppComponent.prototype.onQuickFilterChanged = function ($event) {
                    this.gridOptions.api.setQuickFilter($event.target.value);
                };
                // here we use one generic event to handle all the column type events.
                // the method just prints the event name
                AppComponent.prototype.onColumnEvent = function ($event) {
                    console.log('onColumnEvent: ' + $event);
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/app.component.html',
                        directives: [main_1.AgGridNg2],
                        styles: ['.toolbar button {margin: 2px; padding: 0px;}'],
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map