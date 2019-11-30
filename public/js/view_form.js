import { html, render } from 'https://unpkg.com/lit-html@1.0.0/lit-html.js';

class ViewForm extends HTMLElement {
    constructor() {
        super();
        this.render = this.render.bind(this);
        this.createView = this.createView.bind(this);
        this.generateDefaultConfig = this.generateDefaultConfig.bind(this);
        this.addToView = this.addToView.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.window = fin.Window.getCurrentSync();
        this.saveSnapshot = this.saveSnapshot.bind(this);
        this.applySnapshot = this.applySnapshot.bind(this);
        this.launchGenerator = this.launchGenerator.bind(this);

        this.viewList = [];

        //this could be done better.
        fin.Application.getCurrentSync().on('window-initialized', this.render);
        fin.Application.getCurrentSync().on('window-closed', this.render);
        this.render();
    }

    async render() {
        this.url1Default = '';
        this.url2Default = '';
        this.url3Default = '';
        this.urlToAdd = '';

        //Hard coded code here, caution:
        const app = fin.Application.getCurrentSync();
        const wins = await app.getChildWindows();

        this.selectedWindow = wins[0].identity.name;
        
    
        const vForm = html`<input type="number" id="NextWindowName" style="visibility: hidden">
        <div>
            <fieldset>
				<label for="Posts">Select Post</label>
            	<select id='Posts' onChange='launchPostWindows(this)'>
            	</select>
                <legend>Create a new View</legend>
                <button @click=${this.createView}>Create</button> <br>
                                <legend>Layout</legend>
                <select id='layout'>
	                <option value="grid">Grid</option>
	                <option value="tabbed">Tabbed</option>
	                <option value="fixed">Fixed</option>
				</select>
                <input
                    type="text"
                    id="url1"
                    .value=${this.url1Default}
                    size="50"
                    style="visibility:hidden"
                    @input=${this.handleInput}
                /> <!-- br -->
                <input
                    type="text"
                    id="url2"
                    .value=${this.url2Default}
                    size="50"
                    style="visibility:hidden"
                    @input=${this.handleInput}
                /> <!-- br -->
                <input
                    type="text"
                    id="url3"
                    .value=${this.url3Default}
                    size="50"
                    style="visibility:hidden"
                    @input=${this.handleInput}
                />
            </fieldset>
            <fieldset>
                <legend>Add view to window</legend>
                <button @click=${this.addToView}>Add</button> <br>
               <input
                    type="text"
                    id="url-to-add"
                    size="50"
                    .value=${this.urlToAdd}
                     @input=${this.handleInput}
                /> <br>
                <select id="selected-window">
                    ${wins.map((win) => html`<option value="${win.identity.name}">${win.identity.name}</option>`)}
                </select>
             </fieldset>
          <fieldset>
             <legend>SnapShots</legend>
              <button @click=${this.saveSnapshot}>Save Snapshot</button> <br>
              <button @click=${this.applySnapshot}>Apply Snapshot</button> <br>
          </fieldset>
          <fieldset>
             <legend>Layout Generator</legend>
              <button @click=${this.launchGenerator}>Launch Layout Generator</button> <br>
          </fieldset>
        </div>
            <div style="margin-bottom: 20px">
      <label for="Workspace">Tile Set Name:</label><br />
      <input id="Workspace" /><br />
      <button type="button" onclick="saveWindows()">Save Tiles</button><br /><br />
      <label for="WorkspaceList">Tile Sets:</label><br />
      <select id="WorkspacesList"></select><br />
      <button type="button" onclick="recallWindows()">Recall Tiles</button><br />
      <!--button type="button" onclick="clearWorkspaces()">Clear All</button-->
    </div>`;
        render(vForm, this);
        // render(postsOptions, this);
    }

    async addToView() {
        const urlToAdd = this.querySelector('#url-to-add').value;
        const selectedWindow = this.querySelector('#selected-window').value;
        const { identity: { uuid } } = fin.Application.getCurrentSync();
        const target = { uuid, name: selectedWindow };
        fin.Layout.createView({
            name: `component_${Date.now() + Math.floor(Math.random() * 10000)}`,
            url: urlToAdd
        }, target);
    }

    async createView() {
        try {
            fin.Layout.createWindow({
                layoutConfig: this.generateDefaultConfig()
            });
        } catch (err) {
            console.error(err);
        }
    }

    handleInput(e) {
        this[e.target.id] = e.target.value;
    }

    async saveSnapshot() {
        this.snapshot = await fin.Layout.getSnapshot();
    }

    async applySnapshot() {
        if (this.snapshot) {
            fin.Layout.applySnapshot(this.snapshot);
        }
    }

    async launchGenerator() {
        const configGen = {
            defaultWidth: 1800,
            defaultHeight: 800,
            saveWindowState: false,
            layoutConfig: {
                content: [{
                    type: 'stack',
                    content: [{
                        type: 'component',
                        componentName: 'view',
                        componentState: {
                            name: 'config-gen',
                            url: location.href.replace('view-form', 'config-gen')
                        }
                    }]
                }]
            }
        };

        try {
            fin.Layout.createWindow(configGen);
        } catch (err) {
            console.error(err);
        }
    }

    generateDefaultConfig() {
        const { identity: { uuid } } = fin.Application.getCurrentSync();
        const selectedLayout = this.querySelector('#layout').value;

        const grid = {
            settings: {
                showPopoutIcon: false,
                showMaximiseIcon: false,
                showCloseIcon: false,
                constrainDragToContainer: false
            },
            content: [{
                type: 'row',
                content: [{
                    type: 'stack',
                    content: [{
                        type: 'component',
                        componentName: 'view',
                        componentState: {
                            name: `component_${Date.now() + Math.floor(Math.random() * 10000)}`,
                            url: this.querySelector('#url1').value
                        }
                    }]
                }, {
                    type: 'column',
                    content: [{
                        type: 'component',
                        componentName: 'view',
                        componentState: {
                            name: `component_${Date.now() + Math.floor(Math.random() * 10000)}`,
                            url: this.querySelector('#url2').value
                        }
                    }, {
                        type: 'component',
                        componentName: 'view',
                        componentState: {
                            name: `component_${Date.now() + Math.floor(Math.random() * 10000)}`,
                            url: this.querySelector('#url3').value
                        }
                    }]
                }]
            }]
        };

        const tabbed = {
            settings: {
                showPopoutIcon: false,
                showMaximiseIcon: false,
                showCloseIcon: false,
                constrainDragToContainer: false
            },
            content: [{
                type: 'stack',
                content: [{
                    type: 'component',
                    componentName: 'view',
                    componentState: {
                        name: `component_${Date.now() + Math.floor(Math.random() * 10000)}`,
                        url: this.querySelector('#url1').value
                    }
                }, {
                    type: 'component',
                    componentName: 'view',
                    componentState: {
                        name: `component_${Date.now() + Math.floor(Math.random() * 10000)}`,
                        url: this.querySelector('#url2').value
                    }
                }, {
                    type: 'component',
                    componentName: 'view',
                    componentState: {

                        name: `component_${Date.now() + Math.floor(Math.random() * 10000)}`,
                        url: this.querySelector('#url3').value
                    }
                }]
            }]
        };

        const fixed = {
            settings: {
                showPopoutIcon: false,
                showMaximiseIcon: false,
                showCloseIcon: false,
                constrainDragToContainer: false,
                reorderEnabled: false,
                selectionEnabled: false
            },
            dimensions: {
                borderWidth: 0,
                headerHeight: 0
            },
            content: [{
                type: 'row',
                content: [{
                    type: 'stack',
                    content: [{
                        type: 'component',
                        componentName: 'view',
                        componentState: {
                            name: `component_${Date.now() + Math.floor(Math.random() * 10000)}`,
                            url: this.querySelector('#url1').value
                        }
                    }]
                }, {
                    type: 'column',
                    content: [{
                        type: 'component',
                        componentName: 'view',
                        componentState: {
                            name: `component_${Date.now() + Math.floor(Math.random() * 10000)}`,
                            url: this.querySelector('#url2').value
                        }
                    }, {
                        type: 'component',
                        componentName: 'view',
                        componentState: {
                            name: `component_${Date.now() + Math.floor(Math.random() * 10000)}`,
                            url: this.querySelector('#url3').value
                        }
                    }]
                }]
            }]
        };

        switch (selectedLayout) {
            case 'grid':
                return grid;
                break;
            case 'tabbed':
                return tabbed;
                break;
            case 'fixed':
                return fixed;
                break;
            default:
                break;
        }
    }
}

customElements.define('view-form', ViewForm);

$.ajax({
    url: "https://yoursubdomain.sharepoint.com/yoursite/_api/web/lists/GetByTitle('Posts')/items",
    type: "GET",
    headers: {
        "accept": "application/json;odata=verbose",
    },
    success: function(data){
      // console.log(data);
        $.each(data.d.results, function(index, item){
        	console.log(item);
            $('#Posts').append("<option value='"+ item.Title + "' data-location='" + item.LatLong + "' data-PopulationId='" + item.PopulationId + "' " + "data-PostID='" + item.ID + "' >" + item.Title + "</option>");
        });

    },
    error: function(error){
        alert(JSON.stringify(error));
    }
});