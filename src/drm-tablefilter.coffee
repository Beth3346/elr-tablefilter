###############################################################################
# Filter Tabular Data
###############################################################################
"use strict"

# adds case insensitive contains to jQuery

$.extend $.expr[":"], {
    "containsNC": (elem, i, match, array) ->
        (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0
}

class @DrmTableFilter
    constructor: (@tableClass = 'drm-searchable-table') ->
        self = @
        self.table = $ ".#{@tableClass}"
        self.searchInput = 'drm-search-table'
        # cache full table
        self.fullRows = @table.find 'tbody tr'

        self.table.on 'keyup', "input.#{@searchInput}", self.renderTable

    filterRows: =>
        self = @
        # check other inputs
        inputs = self.table.find('th').find ".#{self.searchInput}"
        filterValues = []

        # get all input values and add them to filterValues array
        $.each inputs, (key, value) ->
            that = $ value

            if $.trim(that.val()).length isnt 0 then filterValues.push value
        
        # get filtered rows
        if filterValues.length is 0
            rows = self.fullRows
        else
            $.each filterValues, (key, value) ->
                that = $ value
                input = $.trim(that.val()).toLowerCase()
                columnNum = that.closest('th').index()

                if filterValues.length is 1
                    rows = self.fullRows.has "td:eq(#{columnNum}):containsNC(#{input})"
                else if key is 0
                    rows = self.fullRows.has "td:eq(#{columnNum}):containsNC(#{input})"
                else
                    rows = rows.has "td:eq(#{columnNum}):containsNC(#{input})"
                rows
        rows

    renderTable: =>
        filteredRows = @filterRows()
        tableBody = @table.find('tbody').empty()

        $.each filteredRows, (key, value) ->
            tableBody.append value

new DrmTableFilter()