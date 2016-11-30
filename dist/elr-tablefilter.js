'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _elrUtilities = require('elr-utilities');

var _elrUtilities2 = _interopRequireDefault(_elrUtilities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $ = require('jquery');

var elr = (0, _elrUtilities2.default)();

$.extend($.expr[':'], {
    containsNC: function containsNC(elem, i, match) {
        return (elem.textContent || elem.innerText || '').toLowerCase().indexOf((match[3] || '').toLowerCase()) >= 0;
    }
});

var elrTableFilter = function elrTableFilter() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$tableClass = _ref.tableClass,
        tableClass = _ref$tableClass === undefined ? 'elr-searchable-table' : _ref$tableClass,
        _ref$searchInput = _ref.searchInput,
        searchInput = _ref$searchInput === undefined ? 'elr-search-table' : _ref$searchInput;

    // const self = {};
    var $table = $('.' + tableClass);

    var getFilterValues = function getFilterValues($inputs) {
        var filterValues = [];

        elr.each($inputs, function (k, v) {
            if (elr.trim($(v).val())) {
                filterValues.push(v);
            }

            return filterValues;
        });

        return filterValues;
    };

    var getRows = function getRows($fullRows, filterValues) {
        var $newRows = void 0;

        var filter = function filter(k, v, $newRows, $fullRows) {
            var $that = $(v);
            var input = elr.trim($that.val()).toLowerCase();
            var columnNum = $that.closest('th').index();

            if (filterValues.length === 1) {
                return $fullRows.has('td:eq(' + columnNum + '):containsNC(' + input + ')');
            } else if (k === 0) {
                return $fullRows.has('td:eq(' + columnNum + '):containsNC(' + input + ')');
            } else {
                return $newRows.has('td:eq(' + columnNum + '):containsNC(' + input + ')');
            }
        };

        elr.each(filterValues, function (k, v) {
            $newRows = filter(k, v, $newRows, $fullRows);

            return $newRows;
        });

        return $newRows;
    };

    var filterRows = function filterRows($fullRows, filterValues) {
        if (filterValues.length === 0) {
            return $fullRows;
        }

        return getRows($fullRows, filterValues);
    };

    var renderTable = function renderTable($table, $filteredRows) {
        var $tableBody = $table.find('tbody').empty();

        elr.each($filteredRows, function (k, v) {
            $tableBody.append(v);
        });
    };

    $table.each(function () {
        var $that = $(this);
        var $fullRows = $that.find('tbody tr');
        var $inputs = $that.find('th').find('.' + searchInput);

        $that.on('keyup', 'input.' + searchInput, function () {
            var filterValues = getFilterValues($inputs);
            var $filteredRows = filterRows($fullRows, filterValues);

            renderTable($that, $filteredRows);
        });
    });

    // return self;
};

exports.default = elrTableFilter;