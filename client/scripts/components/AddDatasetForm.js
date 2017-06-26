import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ColorPalette from './ColorPalette';

import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import Formsy from 'formsy-react';
import { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup,
    FormsySelect, FormsyText, FormsyTime, FormsyToggle } from 'formsy-material-ui/lib';

var AddDatasetForm = React.createClass({
  getInitialState() {
    return {
      canSubmit: false,
    };
  },

  enableButton: function() {
    console.log('setting as valid');
    this.setState({
      canSubmit: true,
    });
  },

  disableButton : function() {
    console.log('setting as invalid');
    this.setState({
      canSubmit: false,
    });
  },

  submitDataset : function(data) {
    // stringify removes undefined attributes (for optional metadata params)
    this.props.addDataset(JSON.parse(JSON.stringify(data)));
  },

  notifyFormError : function(data) {
    // stringify removes undefined attributes (for optional metadata params)
    console.log('Invalid form submission!');
    console.log(data);
  },

  render : function() {
    var errorMessages = {
      wordsError: "Please only use letters",
      numericError: "Please provide a number",
      urlError: "Please provide a valid URL",
    };
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(ColorPalette)}>
        <Paper className="single-sheet" zDepth={2}>
          <Formsy.Form
           onValid={this.enableButton}
           onInvalid={this.disableButton}
           onValidSubmit={this.submitDataset}
           onInvalidSubmit={this.notifyFormError}
          >
          <Tabs>
            <Tab label="Core Metadata" >
              <FormsyText
                name="sample_title"
                required
                hintText="Sample Title"
                floatingLabelText="Sample Title"
              />
              <FormsyText
              name="biosample_link"
              validations="isUrl"
              validationError={errorMessages.urlError}
              required
              hintText="http://www.example.com"
              floatingLabelText="URL"
              />
              <FormsyText
                name="investigation_type"
                required
                hintText="Investigation Type"
                floatingLabelText="Investigation Type"
              />
              <FormsyText
                name="library_source"
                validations="isWords"
                validationError={errorMessages.wordsError}
                required
                hintText="Library Source"
                floatingLabelText="Library Source"
              />
              <FormsyText
                name="env_package"
                validations="isWords"
                validationError={errorMessages.wordsError}
                required
                hintText="Env Package"
                floatingLabelText="Env Package"
              />
              <FormsyDate
                name="collection_date"
                floatingLabelText="Collection Date"
              />
             <FormsyText
               name="latitude"
               validations="isNumeric"
               validationError={errorMessages.numericError}
               required
               hintText="Latitude of sample?"
               floatingLabelText="Latitude"
             />
             <FormsyText
               name="longitude"
               validations="isNumeric"
               validationError={errorMessages.numericError}
               required
               hintText="Longitude of sample?"
               floatingLabelText="Longitude"
             />
               {/*<FormsyRadioGroup name="shipSpeed" defaultSelected="not_light">
                 <FormsyRadio
                   value="light"
                   label="prepare for light speed"
                 />
                 <FormsyRadio
                   value="not_light"
                   label="light speed too slow"
                 />
                 <FormsyRadio
                   value="ludicrous"
                   label="go to ludicrous speed"
                   disabled={true}
                 />
               </FormsyRadioGroup>*/}
              </Tab>
              <Tab label="Read Details" >
                {/*<FormsySelect
                  name="database"
                  required
                  floatingLabelText="Database?"
                  hintText="Database of sample?"
                  menuItems={this.selectFieldItems}
                >
                  <MenuItem value={'genbank'} primaryText="Genbank" />
                  <MenuItem value={'edi'} primaryText="EDI" />
                  <MenuItem value={'other'} primaryText="Other" />
                </FormsySelect>*/}
                <FormsyText
                  name="avg_read_length"
                  validations="isNumeric"
                  validationError={errorMessages.numericError}
                  required
                  hintText="Average Read Length"
                  floatingLabelText="Average Read Length"
                />
                <FormsyText
                  name="total_num_reads"
                  validations="isNumeric"
                  validationError={errorMessages.numericError}
                  required
                  hintText="Total Number of Reads"
                  floatingLabelText="Total Number of Reads"
                />
                <FormsyText
                  name="total_num_bases"
                  validations="isNumeric"
                  validationError={errorMessages.numericError}
                  required
                  hintText="Total Number of Bases"
                  floatingLabelText="Total Number of Bases"
                />
                <FormsyText
                  name="download_size"
                  validations="isNumeric"
                  validationError={errorMessages.numericError}
                  required
                  hintText="Download Size (in MB)"
                  floatingLabelText="Download Size (in MB)"
                />
                <FormsyText
                  name="avg_percent_gc"
                  validations="isNumeric"
                  validationError={errorMessages.numericError}
                  required
                  hintText="Average Percent GC"
                  floatingLabelText="Average Percent GC"
                />
              </Tab>
              <Tab label="More Info" >
              <FormsyText
                className="block-field"
                name="description"
                validations="isWords"
                validationError={errorMessages.wordsError}
                hintText="Anything to add?"
                floatingLabelText="Description"
                multiLine={true}
                rows={4}
                required
              />
            </Tab>
            </Tabs>
            <RaisedButton
              className="submit-button"
              type="submit"
              label="Submit Dataset"
              disabled={!this.state.canSubmit}
            />
          </Formsy.Form>
        </Paper>
      </MuiThemeProvider>
    )
  }
});

export default AddDatasetForm;
