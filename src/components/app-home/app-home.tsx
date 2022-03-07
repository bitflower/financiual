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
        <button onClick={this.importCsv}>Importieren</button>
        <button onClick={this.clusterData}>Gruppieren</button>
        {/* <ul>{stageState.fields.filter(f => selectedFields.includes(f)).map(field => <li>{field}</li>)}</ul> */}

        <sl-tab-group>
          <sl-tab slot="nav" panel="import">
            Rohdaten
          </sl-tab>
          <sl-tab slot="nav" panel="groups">
            Gruppen
          </sl-tab>

          <sl-tab-panel name="import">
            {stageState.data.length === 0 ? (
              <span>Keine Daten importiert.</span>
            ) : (
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
            )}
          </sl-tab-panel>
          <sl-tab-panel name="groups">Hier werden die Gruppen dargestellt.</sl-tab-panel>
        </sl-tab-group>
      </div>
    );
  }
}
