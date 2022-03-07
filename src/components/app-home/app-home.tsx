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
  private clusterData = async () => {
    // state.results = null;
    // state.results = await readCSV(csvFilePath);
  };

  render() {
    return (
      <div class="app-home">
        {/* <stencil-route-link url="/profile/stencil">
          <button>Profile page</button>
        </stencil-route-link> */}
        <button onClick={this.importCsv}>Import</button>
        <button onClick={this.clusterData}>Cluster</button>
        {/* <ul>{stageState.fields.filter(f => selectedFields.includes(f)).map(field => <li>{field}</li>)}</ul> */}

        <sl-tab-group>
          <sl-tab slot="nav" panel="general">
            General
          </sl-tab>
          <sl-tab slot="nav" panel="custom">
            Custom
          </sl-tab>
          <sl-tab slot="nav" panel="advanced">
            Advanced
          </sl-tab>
          <sl-tab slot="nav" panel="disabled" disabled>
            Disabled
          </sl-tab>

          <sl-tab-panel name="general">This is the general tab panel.</sl-tab-panel>
          <sl-tab-panel name="custom">This is the custom tab panel.</sl-tab-panel>
          <sl-tab-panel name="advanced">This is the advanced tab panel.</sl-tab-panel>
          <sl-tab-panel name="disabled">This is a disabled tab panel.</sl-tab-panel>
        </sl-tab-group>

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
