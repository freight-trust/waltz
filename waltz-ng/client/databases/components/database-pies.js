import {environmentColorScale, variableScale} from "../../common/colors";
import {toKeyCounts, notEmpty} from "../../common";
import {endOfLifeStatusNames} from "../../common/services/display_names";


const bindings = {
    databases: '<'
};


const template = require('./database-pies.html');


const PIE_SIZE = 70;


function prepareStats(databases = []) {

    const environment = toKeyCounts(databases, d => d.environment);
    const vendor = toKeyCounts(databases, d => d.dbmsVendor);
    const endOfLifeStatus = toKeyCounts(databases, d => d.endOfLifeStatus);

    return {
        environment,
        vendor,
        endOfLifeStatus
    };
}


function controller($scope) {

    const vm = this;

    vm.pieConfig = {
        environment: {
            size: PIE_SIZE,
            colorProvider: (d) => environmentColorScale(d.data.key)
        },
        vendor: {
            size: PIE_SIZE,
            colorProvider: (d) => variableScale(d.data.key)
        },
        endOfLifeStatus: {
            size: PIE_SIZE,
            colorProvider: (d) => variableScale(d.data.key),
            labelProvider: (d) => endOfLifeStatusNames[d.key] || "Unknown"
        }
    };

    const recalcPieData = (databases = []) => {
        if (notEmpty(databases)) {
            vm.pieData = prepareStats(databases);
        }
    };


    vm.$onChanges = () => {
        if(vm.databases) {
            recalcPieData(vm.databases);
        }
    };

}

controller.$inject = [ '$scope' ];


const component = {
    bindings,
    template,
    controller
};


export default component;
