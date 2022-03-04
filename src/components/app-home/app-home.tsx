import { Component, h } from '@stencil/core';

import { readCSV } from '../../import/import';
import state from '../../import/store';
import stageState from '../../stage/store';

const csvFilePath = 'data/Buchungen.csv';
const selectedFields = ['Date', 'PayeePayerName', 'EntryText', 'Purpose', 'Category', 'Value'];

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {
  private importCsv = async () => {
    state.results = null;
    state.results = await readCSV(csvFilePath);
  };

  render() {
    return (
      <div class="app-home">
        {/* <stencil-route-link url="/profile/stencil">
          <button>Profile page</button>
        </stencil-route-link> */}
        <button onClick={this.importCsv}>Import</button>
        {/* <ul>{stageState.fields.filter(f => selectedFields.includes(f)).map(field => <li>{field}</li>)}</ul> */}

        <table>
          <thead>
            <tr>
              {stageState.fields
                .filter(f => selectedFields.includes(f))
                .map(field => (
                  <th>{field}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {stageState.data.map(record => (
              <tr>
                {stageState.fields
                  .filter(f => selectedFields.includes(f))
                  .map(field => (
                    <td>{record[field]}</td>
                  ))}
              </tr>
            ))}
            <tr></tr>
          </tbody>
        </table>
      </div>
    );
  }
}
