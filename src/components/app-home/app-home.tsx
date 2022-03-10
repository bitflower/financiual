import { Component, Fragment, h, State } from '@stencil/core';

import { readCSV } from '../../import/import';
import importState from '../../import/store';
import stageState from '../../stage/store';
import groupsStore from '../../groups/store';

import { buildGroups, cluster } from './cluster.worker';

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
  private sliderRef: HTMLInputElement;

  private ratio = 0.5;

  @State()
  private groupState: 'empty' | 'loading' | 'done' = 'empty';

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private importCsv = async () => {
    this.groupState = 'empty';
    importState.results = null;
    importState.results = await readCSV(csvFilePath);
  };

  private clusterData = async () => {
    this.groupState = 'loading';
    await cluster(stageState.data, sortProp);
    this.buildGroups(this.ratio);
    this.groupState = 'done';
  };

  private buildGroups = async (ratio: number) => {
    const { data, groups } = await buildGroups(ratio, sortProp, valueProp);
    console.log(`BF CLUSTERED`, { data, groups });

    groupsStore.data = data;
    groupsStore.groups = groups.sort((a, b) => (a[sortProp] > b.name ? 1 : a.name < b.name ? -1 : 0));
  };

  private onSliderInput = (e: Event) => {
    this.ratio = parseInt(this.sliderRef.value) / 100;
    this.buildGroups(this.ratio);
  };

  render() {
    return (
      <div class="app-home">
        {/* <stencil-route-link url="/profile/stencil">
          <button>Profile page</button>
        </stencil-route-link> */}
        <button onClick={this.importCsv}>Importieren</button>
        <button onClick={this.clusterData}>Gruppieren</button>

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
            {this.groupState === 'empty' ? (
              <span>Keine Gruppen vorhanden.</span>
            ) : this.groupState === 'loading' ? (
              <span>Gruppen werden gebildet. Bitte warten ...</span>
            ) : (
              <Fragment>
                <div class="slidecontainer">
                  <label>Ähnlichkeitsfaktor: {this.ratio.toFixed(2)}</label>
                  <input ref={el => (this.sliderRef = el)} type="range" min="1" max="100" value="50" class="slider" id="myRange" onInput={this.onSliderInput} />
                </div>
                <sl-split-panel>
                  <div slot="start">
                    <table>
                      <thead>
                        <tr>
                          <th>Gruppe</th>
                          <th>Betrag</th>
                          <th>Einträge</th>
                        </tr>
                      </thead>
                      <tbody>
                        {groupsStore.groups.map(group => (
                          <tr>
                            <td>
                              <span>{group.name.substring(0, 63)}</span>{' '}
                              <sl-tag size="small" pill variant="primary">
                                {group.items.length}
                              </sl-tag>
                            </td>
                            <td>{group.value}</td>
                            <td>
                              <sl-tooltip>
                                <div slot="content">
                                  <p>
                                    In dieser Gruppe befinden sich <strong>{group.items.length}</strong> Einträge
                                  </p>
                                  <ul>
                                    {group.items.map(item => (
                                      <li>{item[sortProp]}</li>
                                    ))}
                                  </ul>
                                </div>
                                <span>{group.items.length}</span>
                              </sl-tooltip>
                            </td>
                          </tr>
                        ))}
                        <tr></tr>
                      </tbody>
                    </table>
                  </div>
                  <div slot="end">End</div>
                </sl-split-panel>
              </Fragment>
            )}
          </sl-tab-panel>
        </sl-tab-group>
      </div>
    );
  }
}
