import React, { Component } from 'react';

class documentForm extends Component {
  render() {
    return (
      <div>
        <form className="mui-form">
          <legend>Title</legend>
          <div className="mui-textfield">
            <input type="text">
              <label>Title</label>
            </input>
          </div>
          <div className="mui-textfield">
            <input type="text">
              <label>Input 2</label> </input>
          </div>
          <div className="mui-textfield">
            <textarea></textarea>
            <label>Textarea</label>
          </div>
          <button type="submit" class="mui-btn mui-btn--raised">Submit</button>
        </form>

      </div >
    );
  }
}

export default documentForm;

