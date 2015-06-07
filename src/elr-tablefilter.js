(function($) {
    window.elrTableFilter = function(params) {
        var self = {};
        var spec = params || {};
        var tableClass = spec.tableClass || 'elr-searchable-table';
        var searchInput = spec.searchInput || 'elr-search-table';
        var $table = $('.' + tableClass);
        var $fullRows = $table.find('tbody tr');
        var $inputs = $table.find('th').find('.' + searchInput);

        var getFilterValues = function($inputs) {
            var filterValues = [];

            $.each($inputs, function(k,v) {
                var $that = $(v);

                if ( $.trim($that.val()).length ) {
                    filterValues.push(v);
                }

                return filterValues;
            });

            return filterValues;
        };

        var getRows = function($fullRows, filterValues) {
            $.each(filterValues, function(k,v) {
                var $that = $(v);
                var input = $.trim($that.val()).toLowerCase();
                var columnNum = $that.closest('th').index();

                if ( filterValues.length === 1 ) {
                    $rows = $fullRows.has('td:eq(' + columnNum + '):containsNC(' + input + ')');
                } else if ( k === 0 ) {
                    $rows = $fullRows.has('td:eq(' + columnNum + '):containsNC(' + input + ')');
                } else {
                    $rows = $rows.has('td:eq(' + columnNum + '):containsNC(' + input + ')');
                }

                return $rows;
            });

            return $rows;
        };

        var filterRows = function($fullRows, filterValues) {
            var $rows;

            if ( filterValues.length === 0 ) {
                $rows = $fullRows;
            } else {
                $rows = getRows($fullRows, filterValues);
            }

            return $rows;
        };

        var renderTable = function($table, $filteredRows) {
            var $tableBody = $table.find('tbody').empty();

            $.each($filteredRows, function(k,v) {
                $tableBody.append(v);
            });
        };

        $table.on('keyup', 'input.' + searchInput, function() {
            var filterValues = getFilterValues($inputs);
            var $filteredRows = filterRows($fullRows, filterValues);
            
            renderTable($table, $filteredRows);
        });

        return self;
    };
})(jQuery);