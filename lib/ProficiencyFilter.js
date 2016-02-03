System.register([], function(exports_1) {
    var FILTER_TITLE, PROFICIENCY_TEMPLATE, PROFICIENCY_NONE, PROFICIENCY_ABOVE40, PROFICIENCY_ABOVE60, PROFICIENCY_ABOVE80, PROFICIENCY_NAMES, PROFICIENCY_VALUES, ProficiencyFilter;
    return {
        setters:[],
        execute: function() {
            FILTER_TITLE = '<div style="text-align: center; background: lightgray; width: 100%; display: block; border-bottom: 1px solid grey;">' +
                '<b>TITLE_NAME</b>' +
                '</div>';
            PROFICIENCY_TEMPLATE = '<label style="padding-left: 4px;">' +
                '<input type="radio" name="RANDOM"/>' +
                'PROFICIENCY_NAME' +
                '</label>';
            PROFICIENCY_NONE = 'none';
            PROFICIENCY_ABOVE40 = 'above40';
            PROFICIENCY_ABOVE60 = 'above60';
            PROFICIENCY_ABOVE80 = 'above80';
            PROFICIENCY_NAMES = ['No Filter', 'Above 40%', 'Above 60%', 'Above 80%'];
            PROFICIENCY_VALUES = [PROFICIENCY_NONE, PROFICIENCY_ABOVE40, PROFICIENCY_ABOVE60, PROFICIENCY_ABOVE80];
            ProficiencyFilter = (function () {
                function ProficiencyFilter() {
                }
                ProficiencyFilter.prototype.init = function (params) {
                    this.filterChangedCallback = params.filterChangedCallback;
                    this.selected = PROFICIENCY_NONE;
                    this.valueGetter = params.valueGetter;
                };
                ProficiencyFilter.prototype.getGui = function () {
                    var eGui = document.createElement('div');
                    var eInstructions = document.createElement('div');
                    eInstructions.innerHTML = FILTER_TITLE.replace('TITLE_NAME', 'Custom Proficiency Filter');
                    eGui.appendChild(eInstructions);
                    var random = '' + Math.random();
                    var that = this;
                    PROFICIENCY_NAMES.forEach(function (name, index) {
                        var eFilter = document.createElement('div');
                        var html = PROFICIENCY_TEMPLATE.replace('PROFICIENCY_NAME', name).replace('RANDOM', random);
                        eFilter.innerHTML = html;
                        var eRadio = eFilter.querySelector('input');
                        if (index === 0) {
                            eRadio.checked = true;
                        }
                        eGui.appendChild(eFilter);
                        eRadio.addEventListener('click', function () {
                            that.selected = PROFICIENCY_VALUES[index];
                            that.filterChangedCallback();
                        });
                    });
                    return eGui;
                };
                ProficiencyFilter.prototype.doesFilterPass = function (params) {
                    var value = this.valueGetter(params);
                    var valueAsNumber = parseFloat(value);
                    switch (this.selected) {
                        case PROFICIENCY_ABOVE40: return valueAsNumber >= 40;
                        case PROFICIENCY_ABOVE60: return valueAsNumber >= 60;
                        case PROFICIENCY_ABOVE80: return valueAsNumber >= 80;
                        default: return true;
                    }
                };
                ProficiencyFilter.prototype.isFilterActive = function () {
                    return this.selected !== PROFICIENCY_NONE;
                };
                return ProficiencyFilter;
            })();
            exports_1("default", ProficiencyFilter);
        }
    }
});
//# sourceMappingURL=proficiencyFilter.js.map