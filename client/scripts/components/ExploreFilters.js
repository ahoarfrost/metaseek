import React from 'react';

// Material Design imports
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ColorPalette from './ColorPalette';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AverageReadLengthInputs from './AverageReadLengthInputs';
import Select from 'react-select';
import Collapsible from 'react-collapsible';

import RangeSlider from './RangeSlider';

var ExploreFilters = React.createClass({
  getInitialState : function() {
    return {
      "filterStates": {
        "investigation_type":{
          "value":"All"
        },
        "env_package":{
          "value":"All"
        },
        "library_source":{
          "value":"All"
        },
        "study_type":{
          "value":"All"
        },
        "latitudeMin":{
          "value":-90
        },
        "latitudeMax":{
          "value":90
        },
        "longitudeMin":{
          "value":-180
        },
        "longitudeMax":{
          "value":180
        },
        "avgRdLgthMin":{
          "value":0
        },
        "avgRdLgthMax":{
          "value":30000
        },
        "investigationTypes":[]
    },
    "multSelectStates" :{
      "investigationTypes":''
    }
  }
},

  handleFilterChange : function(filterName, field, filterType, event, index, value) {
    var newRule = {
      "field":field,
      "type":filterType,
      "value":value
    };
    this.state.filterStates[filterName] = newRule;
    this.setState(this.state);
    this.props.updateFilterParams(this.state.filterStates);
  },

  handleMultipleFilterChange : function(filterName, field, filterType, values) {
    //get string to array list
    const newValue = this.state.multSelectStates[filterName].split(',')
    //if length is zero
    var newRule = {
      "field":field,
      "type":filterType,
      "value":newValue
    };
    this.state.filterStates[filterName] = newRule;
    this.setState(this.state);
    this.props.updateFilterParams(this.state.filterStates);
  },

  handleMultSelectChange : function(filterName, value) {
    this.state.multSelectStates[filterName] = value
    this.setState(this.state);
  },

/*
  handleMinText : function(event, value) {
    var newRule = {
      "field":"avg_read_length_maxrun",
      "type":4,
      "value":value
    };
    this.state.filterStates["avgRdLgthMin"] = newRule;
    this.setState(this.state);
  },
*/
  renderMenuItem : function(value, index) {
    return (
      <MenuItem key={index} value={value} primaryText={value} />
    )
  },

  getMultOptions : function(summarydata) {
    var search = [{ value: 'search', label: 'Type to search items...', disabled:{true} }]
    var objects = Object.keys(summarydata).map(function(key,index) {return({value:key, label:key}) });
    return (
      search.concat(objects)
    )
  },


  render : function() {
    /* define multiple select options */
    const investigation_options = this.getMultOptions(this.props.summaryData.investigation_type_summary);

    return (
      <div>
        <MuiThemeProvider muiTheme={getMuiTheme(ColorPalette)}>
          <div>
            {/* Ok, so...let's explain this change handler:
              onChange={this.handleFilterChange.bind(this,"library_source","library_source",5)}
              Javascript functions called in an event handler like this are often
              called with the simpler onChange={this.handleFilterChange}
              This will call the function with the standard arguments and scope
              using bind allows us to call it in the same scope (by saying ".bind(this")
              but then pass in additional arguments indicating the field and the filter type:
              "library_source","library_source",5
              These arguments are passed in first, prior to the standard function params.
               */}
               {/*
            <h4>Investigation Type</h4>
            <SelectField multiple={true} value={this.state.filterStates.investigationTypes} onChange={this.handleMultipleFilterChange}>
              {Object.keys(this.props.summaryData.investigation_type_summary)
                     .map(this.renderMultipleMenuItem)}
            </SelectField> */}
            <Collapsible trigger="General Sample Info">
              <h4>Investigation Type</h4>
              <SelectField value={this.state.filterStates.investigation_type.value} onChange={this.handleFilterChange.bind(this,"investigation_type","investigation_type",5)}>
                <MenuItem value={"All"} primaryText="All" />
                {Object.keys(this.props.summaryData.investigation_type_summary)
                       .map(this.renderMenuItem)}
              </SelectField>

              <h4>Environmental Package</h4>
              <SelectField value={this.state.filterStates.env_package.value} onChange={this.handleFilterChange.bind(this,"env_package","env_package",5)}>
                <MenuItem value={"All"} primaryText="All" />
                {Object.keys(this.props.summaryData.env_package_summary)
                       .map(this.renderMenuItem)}
              </SelectField>

              <h4>Library Source</h4>
              <SelectField value={this.state.filterStates.library_source.value} onChange={this.handleFilterChange.bind(this,"library_source","library_source",5)}>
                <MenuItem value={"All"} primaryText="All" />
                {Object.keys(this.props.summaryData.library_source_summary)
                       .map(this.renderMenuItem)}
              </SelectField>

              <h4>Study Type</h4>
              <SelectField value={this.state.filterStates.study_type.value} onChange={this.handleFilterChange.bind(this,"study_type","study_type",5)}>
                <MenuItem value={"All"} primaryText="All" />
                {Object.keys(this.props.summaryData.study_type_summary)
                       .map(this.renderMenuItem)}
              </SelectField>
            </Collapsible>


            <h4>Investigation Type</h4>
            <Select name="investigation_type" placeholder="Select Investigation Type(s)" multi={true} simpleValue={true} value={this.state.multSelectStates.investigationTypes}  options={investigation_options} onChange={this.handleMultSelectChange.bind(this,"investigationTypes")} onClose={this.handleMultipleFilterChange.bind(this,"investigationTypes", "investigation_type", 8, this.state.multSelectStates.investigationTypes)}/>

            <h4>Latitude</h4>
            <RangeSlider field="meta_latitude" filterMin="latitudeMin" filterMax="latitudeMax"
              filterTypeMin={4} filterTypeMax={3} min={-90} max={90}
              minValue={this.state.filterStates.latitudeMin.value} maxValue={this.state.filterStates.latitudeMax.value}
              handleFilterChange={this.handleFilterChange}
            />
            <h4>Longitude</h4>
            <RangeSlider field="meta_longitude" filterMin="longitudeMin" filterMax="longitudeMax"
              filterTypeMin={4} filterTypeMax={3} min={-180} max={180}
              minValue={this.state.filterStates.longitudeMin.value} maxValue={this.state.filterStates.longitudeMax.value}
              handleFilterChange={this.handleFilterChange}
            />
          <h4>Average Read Length</h4>
          {/*
            <div className='range-slider-with-text-left'>
              <TextField
                 style={{height:'60px'}} inputStyle={{fontSize:'70%'}}
                 floatingLabelText="min"
                 defaultValue={this.state.filterStates.avgRdLgthMin.value}
                 onChange={this.handleMinText}
               />
            </div>
            <div className='range-slider-with-text-center'>*/}
              <RangeSlider field="avg_read_length_maxrun" filterMin="avgRdLgthMin" filterMax="avgRdLgthMax"
                filterTypeMin={4} filterTypeMax={3} min={0} max={30000}
                minValue={this.state.filterStates.avgRdLgthMin.value} maxValue={this.state.filterStates.avgRdLgthMax.value}
                handleFilterChange={this.handleFilterChange}
                step={this.state.filterStates.avgRdLgthMax.value/100}
              />
            {/* </div>
            <div className='range-slider-with-text-right'>
              <TextField
                 defaultValue={this.state.filterStates.avgRdLgthMax.value}
                 floatingLabelText="max"
                 style={{height:'60px'}} inputStyle={{fontSize:'70%'}}
               />
            </div> */}

          </div>
        </MuiThemeProvider>
      </div>
    )
  }
});

export default ExploreFilters;
