import { Component, h } from '@stencil/core';

import { readCSV } from '../../import/import';
import importState from '../../import/store';
import stageState from '../../stage/store';
import groupsStore from '../../groups/store';
import { cluster2 } from '../../groups/cluster2';

const csvFilePath = 'data/Buchungen.csv';
const selectedFields = ['Date', 'PayeePayerName', 'EntryText', 'Purpose', 'Category', 'Value'];
const sortProp = 'PayeePayerName';
const valueProp = 'Value';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {
  private importCsv = async () => {
    importState.results = null;
    importState.results = await readCSV(csvFilePath);
  };
  private clusterData = async () => {
    const cluster = cluster2(stageState.data, sortProp);
    // const cluster = cluster2(stageState.data.map(i => i[sortProp]));
    // console.log(`BF CLUSTER`, cluster.groups(2));

    groupsStore.data = cluster.similarGroups(0.5);
    console.log(`BF CLUSTERS`, groupsStore.data);

    // Cumulate data
    const groups = groupsStore.data.map(group => {
      return group.reduce(
        (all, item) => {
          if (!item) {
            return all;
          }

          all.name = item[sortProp];
          if (item[valueProp]) {
            all.value += item[valueProp];
          }
          return all;
        },
        {
          value: 0,
        },
      );
    });
    console.log(`BF CLUSTER GROUPS`, groups);
    groupsStore.groups = groups;
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
          <sl-tab-panel name="groups">
            {groupsStore.groups.length === 0 ? (
              <span>Keine Gruppen vorhanden.</span>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Gruppe</th>
                    <th>Betrag</th>
                  </tr>
                </thead>
                <tbody>
                  {groupsStore.groups.map(group => (
                    <tr>
                      <td>{group.name.substring(0, 63)}</td>
                      <td>{group.value}</td>
                    </tr>
                  ))}
                  <tr></tr>
                </tbody>
              </table>
            )}
          </sl-tab-panel>
        </sl-tab-group>
      </div>
    );
  }
}
