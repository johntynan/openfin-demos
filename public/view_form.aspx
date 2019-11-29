<DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
  <%@ Page Language="C#" %>
  <%@ Register tagprefix="SharePoint" namespace="Microsoft.SharePoint.WebControls" assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
  <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml">
  
  <head runat="server">
  <meta name="WebPartPageExpansion" content="full" />
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Control Panel</title>
  <meta http-equiv="X-UA-Compatible" content="IE=10" />
  <SharePoint:CssRegistration Name="default" runat="server"/>
  </head>
  
  <body>
  <script>
  async function launchPostWindows(sel) {
    let locationSelector = document.querySelector('#Posts');
    let selectedLocation = locationSelector.options[locationSelector.selectedIndex];
    let selectedText = selectedLocation.innerText;
    let selectedValue = selectedLocation.value;
    let selectedLatLon = selectedLocation.dataset.location;
    console.log(selectedLatLon);
    
    mapURL = 'https://www.google.com/maps?ll=' + sel.options[sel.selectedIndex].dataset.location + '&z=10'
    console.log(mapURL);
    url = mapURL,
    document.getElementById('NextWindowName').stepUp(1);
    windowName = 'Map - ' + document.getElementById('NextWindowName').text
    document.getElementById("url1").value = url; 
    
    wikiURL = 'https://en.wikipedia.org/wiki/' + sel.options[sel.selectedIndex].text
    console.log(wikiURL);
    url = wikiURL,
    document.getElementById('NextWindowName').stepUp(1);
    windowName = 'Wikipedia - ' + document.getElementById('NextWindowName').value
    document.getElementById("url2").value = url; 

    listURL = 'https://yoursubdomain.sharepoint.com/yorusite/Lists/yourlist/AllItems.aspx?FilterField1=LinkTitle&FilterValue1=%20' + sel.options[sel.selectedIndex].text + '&FilterType1=Computed&isDLG=1'
    console.log(listURL);
    url = listURL,
    document.getElementById('NextWindowName').stepUp(1);
    windowName = 'SharePoint - ' + document.getElementById('NextWindowName').value
    document.getElementById("url3").value = url;

  };
  
      async function clearWorkspaces() {
        delete localStorage.workspaces;
        updateWorkspaceList();
      }
  
      async function updateWorkspaceList() {
        let workspaces = JSON.parse(localStorage.workspaces || '{}');
  
        let workspacesList = document.getElementById("WorkspacesList");
        workspacesList.innerHTML = "";
  
        Object.keys(workspaces).forEach(workspace => {
          let workspaceOption = document.createElement("option");
          workspaceOption.innerText = workspace;
          workspacesList.appendChild(workspaceOption);
        });
      }
  
      async function saveWindows() {
        let workspaces = JSON.parse(localStorage.workspaces || '{}');
  
        let workspaceInput = document.getElementById("Workspace");
        let workspaceName = workspaceInput.value;
  
        if (workspaceName) {
        this.snapshot = await fin.Layout.getSnapshot();
  
          // workspaces[workspaceName] = await layouts.workspaces.generate();
          workspaces[workspaceName] = await fin.Layout.getSnapshot()
          localStorage.workspaces = JSON.stringify(workspaces);
          updateWorkspaceList();
        }
      }
  
      async function recallWindows() {
        let workspaces = JSON.parse(localStorage.workspaces || '{}');
  
        let selectedWorkspace = document.getElementById("WorkspacesList");
        let workspaceName = selectedWorkspace.value;
  
        if (workspaceName) {
          // await layouts.workspaces.restore(workspaces[workspaceName]);
          fin.Layout.applySnapshot(workspaces[workspaceName]);
        }
      }
  
      updateWorkspaceList();
  
      layouts.workspaces.setRestoreHandler(layouts.restoreHelpers.standardRestoreHandler);
      layouts.workspaces.ready();
  
  </script>
  <form id="form1" runat="server">
  </form>
      <div>
          <view-form>
          <div>
              <fieldset>
                  <legend>Create a new View</legend>
                  <button>Create</button> <br>
                  <input type="text" id="url1" size="50"> <br>
                  <input type="text" id="url2" size="50"> <br>
                  <input type="text" id="url3" size="50">
                  <legend>Layout</legend>
                  <select id="layout">
                  <option value="grid">Grid</option>
                  <option value="tabbed">Tabbed</option>
                  <option value="fixed">Fixed</option>
              </select>
              </fieldset>
              <fieldset>
                  <legend>Add view to window</legend>
                  <button>Add</button> <br>
                 <input type="text" id="url-to-add" size="50"> <br>
                  <select id="selected-window">
                      <!----><option value="window_A"><!---->window_A<!----></option><!----><option value="child-window-1574263408721"><!---->child-window-1574263408721<!----></option><!----><option value="child-window-1574263520625"><!---->child-window-1574263520625<!----></option><!---->
                  </select>
               </fieldset>
            <fieldset>
               <legend>SnapShots</legend>
                <button>Save Snapshot</button> <br>
                <button>Apply Snapshot</button> <br>
            </fieldset>
            <fieldset>
               <legend>Layout Generator</legend>
                <button>Launch Layout Generator</button> <br>
            </fieldset>
          </div><!----></view-form>
          <script type="module" src="js/view_form.js"></script>
      </div>
      <style>
          div.wrapper_title {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              font-size: 3vw;
              opacity: 0.3;
              color: white;
          }
  
          div.container {
              -webkit-app-region: drag;
              background: #000000;
          }
  
          div.button {
              float: right;
              position: relative;
              padding: 2px 0px;
              -webkit-app-region: no-drag;
          }
  
          div.button:hover {
              cursor: pointer;
          }
  
          div.buttonsWrapper {
              height: 28px
          }
      </style>
  
  
  
  </body>
  </html>