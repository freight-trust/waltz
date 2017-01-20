/*
 * Waltz - Enterprise Architecture
 * Copyright (C) 2016  Khartec Ltd.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import {initialiseData} from "../../../common";

const bindings = {
    selected: '<',
    editDisabled: '<',
    onSelect: '<',
    onKeypress: '<'
};


const template = require('./rating-picker.html');


const initialState = {
    pickerStyle: {},
    onSelect: (rating) => 'No onSelect handler defined for rating-picker: ' + rating,
    options: [
        { value: 'G', label: 'Good', clazz: 'rating-G' },
        { value: 'A', label: 'Adequate', clazz: 'rating-A' },
        { value: 'R', label: 'Poor', clazz: 'rating-R' }
    ]
};


function controller() {
    const vm = initialiseData(this, initialState);

    vm.$onChanges = (c) => {
        if (c.disabled) {
            vm.pickerStyle = vm.disabled
                ? { opacity: 0.4 }
                : [];
        }
    }

}


controller.$inject = [];


const component = {
    bindings,
    template,
    controller
};


export default component;