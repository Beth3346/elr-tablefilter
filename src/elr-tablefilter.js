import elrUtlities from 'elr-utility-lib';
const $ = require('jquery');

let elr = elrUtlities();

$.extend($.expr[':'], {
    containsNC: function(elem, i, match) {
        return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || '').toLowerCase()) >= 0;
    }
});

const elrTableFilter = function({
    tableClass = 'elr-searchable-table',
    searchInput = 'elr-search-table'
} = {}) {
    // const self = {};
    const $table = $(`.${tableClass}`);

    const getFilterValues = function($inputs) {
        let filterValues = [];

        elr.each($inputs, function(k, v) {
            if (elr.trim($(v).val())) {
                filterValues.push(v);
            }

            return filterValues;
        });

        return filterValues;
    };

    const getRows = function($fullRows, filterValues) {
        let $newRows;

        const filter = function(k, v, $newRows, $fullRows) {
            const $that = $(v);
            const input = elr.trim($that.val()).toLowerCase();
            const columnNum = $that.closest('th').index();

            if (filterValues.length === 1) {
                return $fullRows.has(`td:eq(${columnNum}):containsNC(${input})`);
            } else if (k === 0) {
                return $fullRows.has(`td:eq(${columnNum}):containsNC(${input})`);
            } else {
                return $newRows.has(`td:eq(${columnNum}):containsNC(${input})`);
            }
        };

        elr.each(filterValues, function(k, v) {
            $newRows = filter(k, v, $newRows, $fullRows);

            return $newRows;
        });

        return $newRows;
    };

    const filterRows = function($fullRows, filterValues) {
        if (filterValues.length === 0) {
            return $fullRows;
        }

        return getRows($fullRows, filterValues);
    };

    const renderTable = function($table, $filteredRows) {
        const $tableBody = $table.find('tbody').empty();

        elr.each($filteredRows, function(k,v) {
            $tableBody.append(v);
        });
    };

    $table.each(function() {
        const $that = $(this);
        const $fullRows = $that.find('tbody tr');
        const $inputs = $that.find('th').find(`.${searchInput}`);

        $that.on('keyup', `input.${searchInput}`, function() {
            const filterValues = getFilterValues($inputs);
            const $filteredRows = filterRows($fullRows, filterValues);

            renderTable($that, $filteredRows);
        });
    });

    // return self;
};

export default elrTableFilter;