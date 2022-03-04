import { Component, h } from '@stencil/core';

import { readCSV } from '../../import/import';
import state from '../../import/store';

const csvFilePath = 'data/Buchungen.csv';
const selectedFields = ['Date', 'PayeePayerName', 'EntryText', 'Purpose', 'Category', 'Value'];

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {
  private importCsv = async () => {
    // let parsedData = await readCSV(csvFilePath);
    state.results = null;
    state.results = await readCSV(csvFilePath);
    console.log(`BF PARSED DATA`, state.results.data);
    // console.log(`BF PARSED HEADERS`, parsedData.meta.fields.join(', '));
  };

  render() {
    return (
      <div class="app-home">
        {/* <p>
          Welcome to the Stencil App Starter. You can use this starter to build entire apps all with web components using Stencil! Check out our docs on{' '}
          <a href="https://stenciljs.com">stenciljs.com</a> to get started.
        </p> */}

        {/* <stencil-route-link url="/profile/stencil">
          <button>Profile page</button>
        </stencil-route-link> */}
        <button onClick={this.importCsv}>Import</button>
        {/* <button onClick={() => state.clicks++}>{state.clicks}</button> */}
        {/* <ul>{state.results && state.results.meta.fields.filter(f => selectedFields.includes(f)).map(field => <li>{field}</li>)}</ul> */}

        <table>
          <thead>
            <tr>{state.results && state.results.meta.fields.filter(f => selectedFields.includes(f)).map(field => <th>{field}</th>)}</tr>
          </thead>
          <tbody>
            {state.results &&
              state.results.data.map(record => (
                <tr>
                  {state.results.meta.fields
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
