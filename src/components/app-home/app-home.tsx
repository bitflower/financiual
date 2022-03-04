import { Component, h } from '@stencil/core';

import { readCSV } from '../../import/import';

const csvFilePath = 'data/Buchungen.csv';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {
  private importCsv = async () => {
    let parsedData = await readCSV(csvFilePath);
    console.log(`BF PARSED`, parsedData);
  };

  render() {
    return (
      <div class="app-home">
        <p>
          Welcome to the Stencil App Starter. You can use this starter to build entire apps all with web components using Stencil! Check out our docs on{' '}
          <a href="https://stenciljs.com">stenciljs.com</a> to get started.
        </p>

        <stencil-route-link url="/profile/stencil">
          <button>Profile page</button>
        </stencil-route-link>
        <button onClick={this.importCsv}>Import</button>
      </div>
    );
  }
}